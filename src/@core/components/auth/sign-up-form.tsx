'use client';

import { useState } from 'react';
import Input from 'src/@core/components/ui/form/input';
import PasswordInput from 'src/@core/components/ui/form/password-input';
import Button from 'src/@core/components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from 'src/@core/components/ui/logo';
import { useSignUpMutation, SignUpInputType } from 'src/service/auth/use-signup';
import Link from 'src/@core/components/ui/link';
import Image from 'src/@core/components/ui/image';
import { useModalAction } from 'src/@core/components/common/modal/modal.context';
import Switch from 'src/@core/components/ui/switch';
import CloseButton from 'src/@core/components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';

interface SignUpFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

export default function SignUpForm({
  lang,
  isPopup = true,
  className,
}: SignUpFormProps) {
  const { t } = useTranslation(lang);
  const { mutate: signUp, isPending } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();
  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }
  function onSubmit({ name, email, password, remember_me }: SignUpInputType) {
    signUp({
      name,
      email,
      password,
      remember_me,
    });
    console.log(name, email, password, 'sign form values');
  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[500px] xl:w-[500px] 2xl:w-[600px]',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">

        <div className="w-full  py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
              {t('common:text-already-registered')}
              <button
                type="button"
                className="text-sm font-semibold ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                {t('common:text-sign-in-now')}
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={t('forms:label-name') as string}
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'forms:name-required',
                })}
                error={errors.name?.message}
                lang={lang}
              />
              <Input
                label={t('forms:label-email') as string}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
                lang={lang}
              />
              <PasswordInput
                label={t('forms:label-password')}
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
                <div
                  className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                  onClick={closeModal}
                >
                  <Link
                    href={`/${lang}${ROUTES.PRIVACY}`}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-privacy-and-policy')}
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isPending}
                  disabled={isPending}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
