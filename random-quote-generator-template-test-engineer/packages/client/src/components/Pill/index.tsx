import { FC } from 'react';

export const Pill: FC<any> = ({myKey, value, selected, handleClick }) => {
  return (
    <button
      type="button"
      className={
        (selected ? 'bg-green-400 ' : 'bg-slate-400 ') +
        ' text-white rounded-full text-sm pl-2 pr-4 py-1.5 text-center inline-flex items-center mr-2 mb-2'
      }
      key={myKey}
      onClick={() => handleClick(value)}
      data-cy={value.toLowerCase() + "Button"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mr-2"
      >
        {selected ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      {value}
    </button>
  );
};
