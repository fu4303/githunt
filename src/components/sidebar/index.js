import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { slide as Menu } from "react-burger-menu";
import {
  setColorTheme, setWhetherOccupyNewTab
} from 'redux/preference/actions';
import {registerToggleSideBarHandler} from 'components/sidebar/sidebar-toggle-bus';
import Toggle from 'react-toggle';
import {isRunningExtension} from 'lib/runtime';

import "react-toggle/style.css";
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

  const setONTHandler = event => {
    props.setWhetherOccupyNewTab(event.target.checked);
  }

  return (
    <Menu right isOpen={isOpen}
          onStateChange={syncSideBarState}
          pageWrapId={ "page-wrap" }
          outerContainerId={ "theme-wrap" }
          customBurgerIcon={false}
    {...props}>
      <h2>Settings</h2>

      <span className="">
        <label>
          <span>Color Theme&nbsp;</span>
          <select value={props.theme} onChange={setThemeHandler}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="dark-blue">Dark Blue</option>
          </select>
        </label>
      </span>

      {isRunningExtension && <span className="ont-option">
        <label>
          <span>Occupy New Tab&nbsp;</span>
          <Toggle defaultChecked={props.whether_occupy_newtab} onChange={setONTHandler} />
        </label>
      </span>}
    </Menu>
  );
};

const mapStateToProps = store => {
  return {
    theme: store.preference.theme,
    whether_occupy_newtab: store.preference.whether_occupy_newtab,
  };
};

const mapDispatchToProps = {
  setColorTheme,
  setWhetherOccupyNewTab
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
