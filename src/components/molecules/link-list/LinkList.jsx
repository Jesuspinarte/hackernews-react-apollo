// External imports
import React from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';

// Intertal imports
import Link from '../../atoms/link/Link';
import { FEED_QUERY } from '../../_utils/graphql/Queries.schema';
import { LINKS_PER_PAGE } from '../../_utils/constants/Common.constants';
import { getQueryVariables } from '../../_utils/common.utils';
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../../_utils/graphql/Subscriptions.schema';

const LinkList = () => {
  const history = useHistory();
  const isNewPage = history.location.pathname.includes('new');
  const pageIndexParams = history.location.pathname.split('/');
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION
  });

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
