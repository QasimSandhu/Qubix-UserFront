'use client';

import React, { useCallback } from 'react';
import { mainReducer, State, initialState } from './main.reducer';
import { Item, getItem, inStock } from './main.utils';
import { useLocalStorage } from '@utils/use-local-storage';
interface CartProviderState extends State {
  addItem: (item: Item, quantity: number) => void;
  removeItem: (id: Item['id']) => void;
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => any | undefined;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
}
export const mainContext = React.createContext<CartProviderState | undefined>(
  undefined,
);

mainContext.displayName = 'mainContext';

export const useMain = () => {
  const context = React.useContext(mainContext);
  if (context === undefined) {
    throw new Error(`useMain must be used within a CartProvider`);
  }
  return context;
};

export function CartProvider(props: React.PropsWithChildren<any>) {
  const [savedCart, saveCart] = useLocalStorage(
    `booking`,
    JSON.stringify(initialState),
  );
  const [state, dispatch] = React.useReducer(
    mainReducer,
    JSON.parse(savedCart!),
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItem = (item: Item, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH', item, quantity });
  const removeItem = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM_OR', id });
  const clearItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });
  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id),
    [state.items],
  );
  const getItemData = useCallback(
    (id: Item['id']) => getItem(state.items, id),
    [state.items],
  );
  const isInStock = useCallback(
    (id: Item['id']) => inStock(state.items, id),
    [state.items],
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      clearItemFromCart,
      getItemData,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemData, isInCart, isInStock, state],
  );
  return <mainContext.Provider value={value} {...props} />;
}
