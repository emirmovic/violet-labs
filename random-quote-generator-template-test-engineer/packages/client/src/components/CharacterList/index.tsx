import { FC, useEffect, useState } from 'react';

import { Pill } from '../Pill';

export const CharacterList: FC<{
  data: Array<string>;
  handleChange: (c: Array<string>) => void;
}> = ({ data, handleChange }) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  useEffect(() => {
    handleChange(selected);
  }, [selected]);

  const toggleSelected = (c: string) => {
    const index = selected.indexOf(c);
    setSelected(
      index > -1 ? selected.filter((_c) => _c !== c) : [...selected, c]
    );
  };

  return (
    <div className="flex flex-row justify-center mt-2">
      {data?.map((c) => (
        <Pill
          key={c}
          value={c}
          selected={selected.indexOf(c) !== -1}
          handleClick={toggleSelected}
        />
      ))}
    </div>
  );
};
