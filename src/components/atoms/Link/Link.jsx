// External imports
import React from 'react';

// Intertal imports

const Link = ({ link }) => (
  <div>
    {link.description} ({link.url})
  </div>
);

export default Link;
