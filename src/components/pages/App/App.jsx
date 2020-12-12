// External imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Intertal imports
import CreateLink from '../../molecules/CreateLink/CreateLink';
import LinkList from '../../molecules/LinkList/LinkList';
import Header from '../../organisms/Header';

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/create" component={CreateLink} />
      </Switch>
    </div>
  </div>
);

export default App;
