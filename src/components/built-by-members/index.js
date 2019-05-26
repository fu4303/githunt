import React from 'react';
import PropTypes from 'prop-types';
// import {UncontrolledTooltip} from 'reactstrap';
import ReactTooltip from 'react-tooltip'


import './styles.scss';

class BuiltByMembers extends React.Component {
  state = {
    readyForTooltipImgLoading: false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log('Error in BuiltByMembers:')
    console.error(error, info);
  }

  render() {
    return <span style={{ display: 'inline-block' }} onMouseEnter={() => this.setState({ readyForTooltipImgLoading: true })}>
      {this.props.members.map(m => {
        let targetID = `tooltip:${this.props.repository.author}/${this.props.repository.name}@${m.username}`;
        return (
          <span key={m.username} className="built-by-member-item">
            <a href={`https://github.com/${m.username}`} data-tip="" data-for={targetID}
              className="d-inline-block built-by-member-avatar" rel="noopener noreferrer" target="_blank">
              <img alt={m.username} className="mini" src={`https://avatars.githubusercontent.com/${m.username}?s=40&v=4`} />
            </a>
            <ReactTooltip className="built-by-member-popup"
              id={targetID} place="top" type="dark" effect="solid"
              delayHide={200}
              delayShow={200}
              delayUpdate={200}
              getContent={(T) => {
                if (!this.state.readyForTooltipImgLoading) { return null }
                return <>
                  <img alt={m.username} src={`https://avatars.githubusercontent.com/${m.username}?s=200&v=4`} />
                  <span className="username">{m.username}</span>
                </>
              }}>
            </ReactTooltip>
          </span>
        )
      })}
    </span>
  }
}

BuiltByMembers.propTypes = {
  members: PropTypes.array.isRequired,
  repository: PropTypes.object.isRequired
};

export default BuiltByMembers;
