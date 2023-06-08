import { FC } from 'react';
import { IQuote } from '@violet-labs/domain';

export const Quote: FC<{ data: IQuote }> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col md:h-80 mt-5 justify-center shadow-lg rounded bg-slate-700 p-10">
        <div className="md:text-xl text-white italic" data-cy="characterQuote">{data.quote}</div>
        <div className="text-gray-200 mt-2" data-cy="authorQuote">{data.character}</div>
      </div>
    </>
  );
};
