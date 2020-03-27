import React from 'react';
import PropTypes from "prop-types";
import { spokenLanguages } from "lib/github";
import SelectSearch from "components/search-select";
import { ReactComponent as SpokenLanguageIcon } from "icons/spoken-language.svg";

function SpokenLanguageFilter(props) {
  return (
    <SelectSearch
      title="Select a spoken language"
      options={spokenLanguages}
      value={props.selectedLanguage}
      placeholder="Filter by spoken language"
      onChange={props.updateLanguage}
      IconComponent={state => <SpokenLanguageIcon width="15" height="15" className="mr-2" />}
    />
  );
}

SpokenLanguageFilter.propTypes = {
  updateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string
};

export default SpokenLanguageFilter;
