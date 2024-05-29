import { getSessionId } from '@/lib/session';
import { getUser } from '../page';
import AvatarForm from '../_components/AvatarForm';

export default async function UpdateAvatar() {
  const userId = await getSessionId();
  const user = await getUser(userId!);
  return (
    <>
      <AvatarForm id={userId!} avatar={user?.avatar!} />
    </>
  );
}
