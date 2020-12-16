// External imports
import React from 'react';
import { useMutation } from '@apollo/client';

// Intertal imports
import { timeDifferenceForDate } from '../../_utils/common.utils';
import { AUTH_TOKEN } from '../../_utils/constants/Auth.constants';
import { VOTE_MUTATION } from '../../_utils/graphql/Mutations.schema';
import { FEED_QUERY } from '../../_utils/graphql/Queries.schema';
import { LINKS_PER_PAGE } from '../../_utils/constants/Common.constants';

const Link = ({ link, index }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update(cache, { data: { vote } }) {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      const updatedLinks = feed.links.map(feedLink => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  // const take = LINKS_PER_PAGE;
  // const skip = 0;
  // const orderBy = { createdAt: 'desc' };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
