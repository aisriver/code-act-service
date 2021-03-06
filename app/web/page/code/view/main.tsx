import React, { Component } from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ARTICLE_LIST } from '../store/constant';
import Layout from '../../../component/layout';
import Header from '../../../component/header';
import Route from '../router/route';
import Home from './home';
import Introduce from './introduce';
import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pathname } = this.props['location'];
    return (
      <Layout {...this.props}>
        <Header />
        <ul className="menu-tab">
          <li>
            <Link className={pathname === '/' ? 'active' : ''} to="/">
              编辑器
            </Link>
          </li>
          <li>
            <Link className={pathname === '/introduce' ? 'active' : ''} to="/introduce">
              文档
            </Link>
          </li>
          {/* <li>
            <Link className={pathname === '/generator' ? 'active' : ''} to="/generator">
              生成器
            </Link>
          </li> */}
        </ul>
        <Switch>
          {/* <Route path="/generator" component={Generator} /> */}
          <Route path="/introduce" component={Introduce} />
          <Route type={ARTICLE_LIST} path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default EASY_ENV_IS_DEV ? hot(withRouter(Main)) : withRouter(Main);
