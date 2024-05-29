import { XMarkIcon } from '@heroicons/react/24/solid';

function Previews({ previews, deletePreviews, errors = [] }: { previews: string[]; deletePreviews: (eventValue: number) => void; errors: string[] }) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-200 w-full rounded-md p-4">
      <h2 className="font-bold text-2xl">사진 추가하기</h2>
      <label htmlFor="photo" className=" bg-neutral-100 text-center border-neutral-300 border-2 w-32 px-4 py-2 rounded-xl ">
        <div className="text-lg">사진 선택</div>
      </label>
      <span className=" text-neutral-400">* 사진은 최대 10장까지 첨부할 수 있습니다.</span>
      <div className="grid grid-cols-5">
        {previews.map((el, idx) => (
          <div key={idx} className=" w-32 h-32 bg-center bg-cover rounded-md flex items-center justify-center relative">
            <div className=" w-24 h-24 bg-current bg-cover rounded-md" style={{ backgroundImage: `url(${el})` }}></div>
            <XMarkIcon
              onClick={() => {
                deletePreviews(idx);
              }}
              className="size-5  absolute top-0 right-0 cursor-pointer"
            />
          </div>
        ))}
      </div>
      {errors.map((error, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}

export default Previews;
