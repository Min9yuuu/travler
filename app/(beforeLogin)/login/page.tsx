'use client';

import Input from '../_components/Input';
import SubmitBtn from '../../_components/SubmitBtn';
import { useFormState } from 'react-dom';
import loginAction from './actions';

export default function Login() {
  const [state, dispatch] = useFormState(loginAction, null);
  return (
    <>
      <div>
        <div className="flex flex-col my-4 gap-1 *:font-semibold">
          <h1 className=" text-3xl text-neutral-800">로그인</h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-2 *:font-medium w-full">
          <Input name="email" type="text" label="이메일" required errors={state?.fieldErrors?.email ?? []} />
          <Input name="password" type="password" label="비밀번호" required errors={state?.fieldErrors?.password ?? []} />
          <SubmitBtn text="로그인" />
        </form>
      </div>
    </>
  );
}
