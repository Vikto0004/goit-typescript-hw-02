import { FormEvent, useState } from "react";
import css from "./SearchBar.module.css";

type Params = {
  handleSearch: (query: string) => void
}

export default function SearchBar({ handleSearch }: Params) {

  const [query, setQuery] = useState<string>("")
  
  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query)
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="search"
          autoFocus
          onChange={e => setQuery(e.target.value)}
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
