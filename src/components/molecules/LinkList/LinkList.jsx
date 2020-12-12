// External imports
import React from 'react';
import { useQuery } from '@apollo/client';

// Intertal imports
import Link from '../../atoms/Link/Link';
import { FEED_QUERY } from '../../_utils/graphql/Queries.schema';

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map(link => (
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
