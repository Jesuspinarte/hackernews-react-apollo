import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_LINK_MUTATION } from '../../_utils/graphql/Mutations.schema';

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });

  const [onSubmitForm] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitForm(useMutation, formState);
          alert('Submit clicked!');
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
