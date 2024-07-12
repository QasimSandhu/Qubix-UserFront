'use client';

import Modal from 'src/@core/components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from 'src/@core/components/common/modal/modal.context';
const LoginForm = dynamic(() => import('src/@core/components/auth/login-form'));
const SignUpForm = dynamic(() => import('src/@core/components/auth/sign-up-form'));
const ForgetPasswordForm = dynamic(
  () => import('src/@core/components/auth/forget-password-form'),
);
export default function ManagedModal({ lang }: { lang: string }) {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();


  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm lang={lang} />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm lang={lang} />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm lang={lang} />}
    </Modal>
  );
}
