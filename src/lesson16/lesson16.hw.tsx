import { Suspense, useDeferredValue, useId, useState } from "react";
import { counties } from "./Data/counties";

interface ISearch {
  query: string;
}

export default function DefferredDemo() {
  // Trigger render only on urgent update.
  // React could count stop typeing or onLeave events as urgent update and
  // trigger render only in these cases. So when we have heavy render this hook allows us skip
  // unimportant changes so that make less useless renders and visually speed up application
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Countries:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}

function SearchResults(params: ISearch) {
  const { query } = params;
  const [qCountries, setCountries] = useState<string[]>([]);
  setTimeout(() => {
    setCountries(queryCountries(query));
  }, 1000);
  return (
    qCountries && (
      <ul>
        {qCountries.map((c) => (
          <li>{c}</li>
        ))}
      </ul>
    )
  );
}

function queryCountries(query: string): string[] {
  return counties.filter((c) =>
    c.toLowerCase().startsWith(query.toLowerCase()),
  );
}

export function UseIDDemo() {
  // useID is hook that return new id on each call
  // id start with ":" so it does not supports by CSS
  const id1 = useId();
  const id2 = useId();
  return (
    <ul>
      <li>
        <label htmlFor={id1}>useId hook demo</label>
        <input id={id1} type="checkbox" name="idDemo" />
      </li>
      <li>
        <label htmlFor={id2}>Another useId hook demo</label>
        <input id={id2} type="checkbox" name="idDemo" />
      </li>
      <li id={useId()}>
        <label>Add id inside Element</label>
        <input type="checkbox" name="idDemo" />
      </li>
    </ul>
  );
}
