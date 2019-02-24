import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon/Icon';

class NoContentPlaceholder extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.string,
  };

  static defaultProps = {
    title: 'Nothing here :(',
    icon: 'Alert',
  };

  render() {
    const { title, body, icon } = this.props;
    return (
      <div className="no-content">
        <Icon icon={icon} />
        <div className="no-content__content">
          <h1>{title}</h1>
          <div className="no-content__body">{body}</div>
        </div>
      </div>
    );
  }
}

export default NoContentPlaceholder;
