import { Route } from 'react-router-dom';
import Home from '../view/home';
import Async from '../view/async';
import Detail from '../view/detail';
const NotFound = () => {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            <h1>404 : Not Found</h1>
          </div>
        );
      }}
    />
  );
};

export default function createRouter() {
  return [
    {
      path: '/detail/:id',
      component: Detail,
    },
    {
      path: '/async',
      component: Async,
    },
    {
      path: '/',
      component: Home,
    },
    {
      path: '*',
      component: Home,
    },
  ];
}
