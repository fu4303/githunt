import React from 'react';
import PropTypes from "prop-types";
import { languages } from "lib/github";
import SelectSearch from "components/search-select";
import {ReactComponent as CodeIcon} from 'icons/code.svg';

function LanguageFilter(props) {
  return (
    <SelectSearch
      title="Select a language"
      options={languages}
      value={props.selectedLanguage}
      placeholder="Filter by language"
      onChange={props.updateLanguage}
      IconComponent={state => <CodeIcon width="16" height="16" className="mr-2" />}
    />
  );
}

LanguageFilter.propTypes = {
  updateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string
};

export default LanguageFilter;
