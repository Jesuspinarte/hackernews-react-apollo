import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import Link from '../../atoms/link/Link';
import { FEED_SEARCH_QUERY } from '../../_utils/graphql/Queries.schema';

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);

  return (
    <>
      <div>
        Search
        <form
          onSubmit={e => {
            e.preventDefault();
            executeSearch({
              variables: { filter: searchFilter },
            });
          }}
        >
          <input type="text" onChange={e => setSearchFilter(e.target.value)} />
          <button type="submit">OK</button>
        </form>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
