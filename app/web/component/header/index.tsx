import React, { Component } from 'react';
import './index.css';
export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <h1>
            <a href="/" className="router-link-active">
              CODE ACT SERVICE
            </a>
          </h1>
        </div>
      </header>
    );
  }
}
