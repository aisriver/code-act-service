import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { asyncData, bootstrap } from '../../framework/app';
import createStore from './store';
import createRouter from './router';
import Main from './view/main';
import '../../asset/css/code.css';
import { CustomWindow } from '../../framework/request';

((window as unknown) as CustomWindow).requestConfig = {
  withCredentials: false,
  getToken() {
    const accessToken = '';
    return Promise.resolve(accessToken);
  },
};
((window as unknown) as CustomWindow).authConfig = {
  url: '',
  client_id: '',
  client_secret: '',
  password_min: 6,
  password_max: 20,
  company: 0,
};

class Entry extends Component {
  static async asyncData(context) {
    const router = createRouter();
    return asyncData(context, router);
  }

  render() {
    if (EASY_ENV_IS_BROWSER) {
      const store = createStore(window.__INITIAL_STATE__);
      const { url } = store.getState();
      return (
        <Provider store={store}>
          <BrowserRouter location={url}>
            <Main />
          </BrowserRouter>
        </Provider>
      );
    }
    const store = createStore(this.props);
    const { url } = store.getState();
    return (
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <Main />
        </StaticRouter>
      </Provider>
    );
  }
}

export default bootstrap(Entry);
