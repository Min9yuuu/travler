'use client';

import { useFormState } from 'react-dom';
import { signUpAction } from './actions';
import Input from '@/app/(beforeLogin)/_components/Input';
import SubmitBtn from '@/app/_components/SubmitBtn';

export default function SignUp() {
  const [state, dispatch] = useFormState(signUpAction, null);
  return (
    <>
      <div>
        <div className="flex flex-col my-5 gap-1 *:font-semibold">
          <h1 className=" text-3xl text-neutral-800">함께 공유해요!</h1>
          <h2 className=" text-2xl text-neutral-500">당신의 여행을 다른사람에게 공유해주세요</h2>
        </div>
        <form action={dispatch} className="flex flex-col gap-2 *:font-medium w-full">
          <Input name="username" type="text" label="유저이름" required errors={state?.fieldErrors.username} />
          <Input name="email" type="text" label="이메일" required errors={state?.fieldErrors.email} />
          <Input name="password" type="password" label="비밀번호" required errors={state?.fieldErrors.password} />
          <Input name="password_confirm" type="password" label="비밀번호 확인" required errors={state?.fieldErrors.password_confirm} />
          <SubmitBtn text="생성하기" />
        </form>
      </div>
    </>
  );
}
