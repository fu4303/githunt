import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { reveal as Menu } from "react-burger-menu";
import { setColorTheme } from 'redux/preference/actions';
import {registerToggleSideBarHandler} from 'components/sidebar/sidebar-toggle-bus';
import './styles.scss';

const SideBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    registerToggleSideBarHandler(() => {
      setIsOpen(!isOpen)
    });
  });

  const syncSideBarState = (state) => {
    setIsOpen(state.isOpen)
  }

  const setThemeHandler = event => {
    let selected = event.target.value;
    props.setColorTheme(selected);
    console.debug('theme set to', selected);
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
        Color Theme: <select value={props.theme} onChange={setThemeHandler}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </span>

      <span className="menu-item">
        Not Occupy New Tab
      </span>
    </Menu>
  );
};

const mapStateToProps = store => {
  return {
    theme: store.preference.theme,
  };
};

const mapDispatchToProps = {
  setColorTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
