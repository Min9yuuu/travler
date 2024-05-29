import { getSessionId } from '@/lib/session';
import SearchForm from './_components/SearchForm';
import SearchList from './_components/SearchList';
import { getCachedInitialPost } from '../home/actions';

interface SearchProps {
  searchParams?: {
    travle?: string;
  };
}

export default async function Posts({ searchParams }: SearchProps) {
  const searchPostTake = 8;
  const userId = await getSessionId();
  const initialData = await getCachedInitialPost(searchPostTake);

  return (
    <>
      <div className="flex flex-col mb-16">
        <div className="bg-gray-100 px-2 pb-2 sticky top-2 ">
          <SearchForm />
        </div>
        <SearchList initialData={initialData} searchParams={searchParams} take={searchPostTake} userId={userId!} />
      </div>
    </>
  );
}
