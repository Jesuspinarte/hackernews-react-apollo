import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';

import { CREATE_LINK_MUTATION } from '../../_utils/graphql/Mutations.schema';
import { FEED_QUERY } from '../../_utils/graphql/Queries.schema';
import { LINKS_PER_PAGE } from '../../_utils/constants/Auth.constants';

const CreateLink = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });

  const [onSubmitForm] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links],
          },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
    onCompleted: () => history.push('/new/1'),
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitForm(useMutation, formState);
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={e =>
              setFormState({ ...formState, description: e.target.value })
            }
            type="text"
            placeholder="A description for the link"
            required
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={e => setFormState({ ...formState, url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
