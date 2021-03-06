import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from './theme.css';

export default function CurrentUser({ avatarUrl, url, theme }) {
  return (
    <div className={theme.currentUser}>
      <a href={url} className={theme.link}>
        <img src={avatarUrl} alt="avatar" className={theme.image} />
      </a>
    </div>
  );
}

CurrentUser.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  theme: PropTypes.shape(),
};

CurrentUser.defaultProps = {
  theme: defaultTheme,
};
