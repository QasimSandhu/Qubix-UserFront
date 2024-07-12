'use client';

import cn from 'classnames';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { ImSpinner2 } from 'react-icons/im';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'border' | 'simple';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  const rootClassName = cn(
    'inline-block transition-colors ease-in-out',
    {
      'text-sm font-normal text-white shadow-[0_20px_30px_0_rgba(12,118,142,0.24)] rounded bg-blue-500 py-3.5 px-7':
        variant === 'primary',
      'border-2 border-[#86D169] rounded text-blue-500 text-sm font-medium bg-[#f8fdfe] py-1.5 px-8 rounded-full':
        variant === 'border',
      'text-[#242424] text-lg rounded relative overflow-hidden':
        variant === 'simple',
      'cursor-not-allowed hover:cursor-not-allowed bg-opacity-50 hover:bg-opacity-50':
        disabled,
    },
    className,
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      <>
        {children}
        {loading && (
          <ImSpinner2 className="w-5 h-5 animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 " />
        )}
      </>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
