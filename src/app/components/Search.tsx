'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { buildQuery } from '@/lib/buildQuery';
import { SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from '@/lib/constants';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      return;
    }

    setSearchText(searchParams.get(SEARCH_TERM_KEY) || '');
    setYearStart(searchParams.get(YEAR_START_KEY) || '');
    setYearEnd(searchParams.get(YEAR_END_KEY) || '');
  }, [searchParams]);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleYearStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearStart(event.target.value);
  };

  const handleYearEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearEnd(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedSearchText = searchText.trim();

    if (trimmedSearchText !== searchText) {
      setSearchText(trimmedSearchText);
    }

    if (!trimmedSearchText) {
      return;
    }

    router.push(
      buildQuery({
        q: trimmedSearchText,
        yearStart,
        yearEnd,
      })
    );
  };

  return (
    <form className="flex flex-col gap-4 md:flex-row w-full" onSubmit={handleSubmit}>
      <Input
        className="md:basis-2/5"
        placeholder="Search Term"
        id="searchText"
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        required
      />

      <div className="flex gap-4 basis-2/5">
        <Input
          className="basis-1/2"
          placeholder="Year Start"
          type="number"
          id="yearStart"
          max={new Date().getFullYear()}
          value={yearStart}
          onChange={handleYearStartChange}
        />

        <Input
          className="basis-1/2"
          placeholder="Year End"
          type="number"
          id="yearEnd"
          max={new Date().getFullYear()}
          min={yearStart}
          value={yearEnd}
          onChange={handleYearEndChange}
        />
      </div>

      <Button className="md:basis-1/5" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
