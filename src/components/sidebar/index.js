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
      <h4>Settings</h4>

      <span className="menu-item">
        Color Theme: Light/Dark
      </span>

      <span className="menu-item">
        Not Occupy New Tab
      </span>
    </Menu>
  );
};
