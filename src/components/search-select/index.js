import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import ClickOutside from "react-click-outside";

import "./styles.scss";
import { isMobileDevice } from "lib/runtime";

class SelectSearch extends React.Component {
  constructor(props) {
    console.log("SelectSearch:constructor:", props);
    super(props);
    this.itemsMap = new Map(props.options.map(item => [item.value, item.name]));
    const filteredItems = [...props.options.map(item => item.value)];
    this.state = {
      value: props.value,
      filterText: "",
      filteredItems: filteredItems,
      focusedIndex: filteredItems.indexOf(props.value),
      showDropdown: false
    };
  }

  filterInputRef = React.createRef();

  focusFilterInput = () => {
    this.filterInputRef.current.focus();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filterText !== this.state.filterText) {
      const filteredItems = this.getFilteredItems();
      this.setState({
        filteredItems: filteredItems,
        focusedIndex: filteredItems.indexOf(this.state.value)
      });
    }

    setTimeout(() => {
      this.ensureFocusedVisible();
    }, 0);

    if (
      this.state.showDropdown &&
      !prevState.showDropdown &&
      !isMobileDevice()
    ) {
      this.focusFilterInput();
    }
  }

  ensureFocusedVisible() {
    if (!this.focusedItem) {
      return;
    }

    const domNode = ReactDOM.findDOMNode(this.focusedItem);
    if (!domNode) {
      return;
    }

    domNode.scrollIntoView({
      behavior: "auto",
      block: "nearest"
    });
  }

  getFilteredItems() {
    let availableItems;

    if (this.state.filterText) {
      availableItems = this.props.options.filter(item => {
        const itemText = item.name.toLowerCase();
        const selectedText = this.state.filterText.toLowerCase();

        return itemText.indexOf(selectedText) >= 0;
      });
    } else {
      availableItems = [...this.props.options];
    }

    return availableItems.map(item => item.value);
  }

  renderOptions() {
    return this.state.filteredItems.map((itemKey, counter) => {
      const displayName = this.itemsMap.get(itemKey);
      const isSelectedIndex = this.state.value === itemKey;
      const isFocused = this.state.focusedIndex === counter;

      return (
        <span
          className={classNames("select-menu-item", {
            "active-item": isSelectedIndex,
            "focused-item": isFocused
          })}
          ref={element => {
            if (isSelectedIndex) {
              this.activeItem = element;
            }
            if (isFocused) {
              this.focusedItem = element;
            }
          }}
          onClick={() => this.selectItem(counter)}
          key={counter}
        >
          <span className="select-menu-item-text">{displayName}</span>
        </span>
      );
    });
  }

  onKeyDown = e => {
    const { focusedIndex } = this.state;

    const isEnterKey = e.keyCode === 13;
    const isUpKey = e.keyCode === 38;
    const isDownKey = e.keyCode === 40;

    if (!isUpKey && !isDownKey && !isEnterKey) {
      return;
    }

    e.preventDefault();

    // arrow up/down button should select next/previous list element
    if (isUpKey && focusedIndex > 0) {
      this.setState(prevState => ({
        focusedIndex: prevState.focusedIndex - 1
      }));
    } else if (
      isDownKey &&
      focusedIndex < this.state.filteredItems.length - 1
    ) {
      this.setState(prevState => ({
        focusedIndex: prevState.focusedIndex + 1
      }));
    } else if (isEnterKey && this.state.filteredItems[focusedIndex]) {
      this.selectItem(focusedIndex);
    }
  };

  selectItem = index => {
    const selectedItem = this.state.filteredItems[index];
    if (selectedItem === undefined) {
      return;
    }

    this.setState({
      focusedIndex: index,
      value: selectedItem,
      filterText: "",
      showDropdown: false
    });

    this.props.onChange(selectedItem);
  };

  hideDropdown = () => {
    this.setState({
      showDropdown: false,
      filterText: ""
    });
  };

  filterTextChangeHandler = e => {
    this.setState({
      filterText: e.target.value,
      focusedIndex: -1
    });
  };

  getOptionDropdown() {
    return (
      <div className="search-select">
        <div className="select-menu-title">{this.props.title}</div>
        <div className="select-menu-filters">
          <div className="select-menu-text-filter">
            <input
              type="text"
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.filterInputRef}
              onChange={this.filterTextChangeHandler}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
        <div className="select-menu-list">{this.renderOptions()}</div>
      </div>
    );
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }));
  };

  DefaultIconComponent (state) {}

  render() {
    const IconComponent = this.props.IconComponent || this.DefaultIconComponent;

    return (
      <ClickOutside onClickOutside={this.hideDropdown}>
        <div className="select-search-wrap">
          <button
            onClick={this.toggleDropdown}
            className="btn btn-primary search-select-btn shadowed"
          >
            {IconComponent(this.state)}
            <span>{this.itemsMap.get(this.state.value)}</span>
          </button>
          {this.state.showDropdown && this.getOptionDropdown()}
        </div>
      </ClickOutside>
    );
  }
}

export default SelectSearch;
