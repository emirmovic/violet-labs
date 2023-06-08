import { FC, useEffect, useState } from 'react';

// libs
import { IQuote } from '@violet-labs/domain';
// feature
import { API_URL } from '~/config';
import { Logger } from '~/utils';
// components
import { Quote } from '../Quote';
import { CharacterList } from '../CharacterList';

export const App: FC<unknown> = () => {
  const [quote, setQuote] = useState<IQuote>({
    quote: '',
    character: '',
  });

  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacter] = useState<Array<string>>(
    []
  );

  const changeCharacters = (characters: Array<string>) => {
    setSelectedCharacter(characters);
  };

  const fetchQuote = async (): Promise<void> => {
    try {
      const baseUrl = `${API_URL}/quote`;
      const url =
        selectedCharacters.length > 0
          ? `${baseUrl}?characters=${selectedCharacters.join(',')}`
          : `${baseUrl}?characters=${characters.join(',')}`;

      const res = await fetch(url);
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      Logger.error(err);
    }
  };
  const fetchCharacters = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/characters`);
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      Logger.error(err);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [selectedCharacters]);

  return (
    <>
      <div className="flex flex-col">
        <img src="/the-office.svg" className="w-80 mx-auto mb-8 text-white" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white mx-auto mb-2 font-bold py-2 px-4 rounded w-80"
          data-cy="randomQuoteButton"
          onClick={() => fetchQuote()}
        >
          Random Quote
        </button>
        <CharacterList data={characters} handleChange={changeCharacters} />
        <Quote data={quote} />
      </div>
    </>
  );
};
