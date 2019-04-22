import React, {useState, useEffect} from "react";
import { reveal as Menu } from "react-burger-menu";
import {registerToggleSideBarHandler} from 'components/sidebar/sidebar-toggle-bus';
import './styles.scss';

export default props => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    registerToggleSideBarHandler(() => {
      setIsOpen(!isOpen)
    });
  });

  const syncSideBarState = (state) => {
    setIsOpen(state.isOpen)
  }

  return (
    <Menu right isOpen={isOpen}
          onStateChange={syncSideBarState}
          pageWrapId={ "page-wrap" }
          outerContainerId={ "theme-wrap" }
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
