import React from "react";
import { reveal as Menu } from "react-burger-menu";
import './styles.scss';

export default props => {
  return (
    <Menu right
          pageWrapId={ "page-wrap" }
          outerContainerId={ "root" }
          customBurgerIcon={false}
    {...props}>
      <p>SIDE BAR PLACEHOLDER</p>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/burgers">
        Burgers
      </a>

      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>

      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
};
