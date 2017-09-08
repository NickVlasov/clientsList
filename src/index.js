import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import promise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

import ClientIndex from './components/clients_index';
import ClientNew from './components/client_new';
import ClientShow from './components/client_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Link className="homePageLink" to="/"><h2>Приложение для учета клиентов</h2></Link>
        <Switch>
          <Route path="/client/new" component={ClientNew} />
          <Route path="/client/:id" component={ClientShow} />
          <Route path="/" component={ClientIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
