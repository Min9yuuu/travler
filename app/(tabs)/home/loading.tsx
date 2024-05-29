import { PhotoIcon } from '@heroicons/react/24/solid';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center p-5 gap-4">
        {[...Array(10)].map((_, idx) => (
          <div key={idx} className="border-2 border-neutral-700">
            <div className="flex items-center gap-2 p-3">
              <div className="w-10 h-10 overflow-hidden bg-neutral-400 rounded-full" />
              <div className="flex flex-col gap-1 justify-center *:rounded-md">
                <div className="w-20 h-5 bg-neutral-600" />
                <div className=" w-16 h-4 bg-neutral-600" />
              </div>
            </div>
            <div className="w-full aspect-square border-4 border-neutral-700 border-dashed text-neutral-700 flex justify-center items-center bg-neutral-600">
              <PhotoIcon className="h-28" />
            </div>
            <div className="flex flex-col gap-y-2 pt-5 px-3 *:rounded-md">
              <div className="w-28 h-7 bg-neutral-600" />
              <div className="w-full bg-neutral-600 h-5 mt-1" />
              <div className="w-full bg-neutral-600 h-5" />
            </div>
            <div className="flex justify-between items-center py-3 px-3 ">
              <div className="flex items-center justify-center gap-2.5 *:rounded-md">
                <div className="bg-neutral-600 w-8 h-8" />
                <div className="bg-neutral-600 w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-2.5 *:rounded-md">
                <div className="bg-neutral-600 w-8 h-8" />
                <div className="bg-neutral-600 w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-2.5 *:rounded-md">
                <div className="bg-neutral-600 w-8 h-8" />
                <div className="bg-neutral-600 w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
