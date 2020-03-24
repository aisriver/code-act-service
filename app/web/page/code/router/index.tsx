import { Route } from 'react-router-dom';
import Home from '../view/home';
import Introduce from '../view/introduce';
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
      path: '/introduce',
      component: Introduce,
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
