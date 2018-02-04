import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from './theme.css';

/* eslint-disable react/no-array-index-key */
export default function PullRequest({
  theme,
  date,
  time,
  url,
  number,
  title,
  author,
  reviewedByCurrentUser,
  currentUserReviewRequested,
  reviewsByAuthor,
}) {
  const reviewRequestStatus = () => {
    if (reviewedByCurrentUser) {
      return (
        <div className={theme.reviewStatusWrapper}>
          <div className={`${theme.reviewStatusIndicator} ${theme.reviewed}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 406.83 406.83"
              width="512"
              height="512"
              className={theme.reviewStatusIcon}
            >
              <path
                fill="#FFFFFF"
                d="M385.62 62.5l-239.4 239.4-125-125L0 198.1l146.22 146.23L406.84 83.72z"
              />
            </svg>
          </div>
          <span className={theme.statusSpan}>You have reviewed</span>
        </div>
      );
    }
    if (currentUserReviewRequested) {
      return (
        <div className={theme.reviewStatusWrapper}>
          <div
            className={`${theme.reviewStatusIndicator} ${theme.reviewRequested}`}
          >
            <svg className={theme.spinCircle}>
              <circle cx="50%" cy="50%" r="45px" />
            </svg>
            <span className={theme.reviewStatusSpan}>!</span>
          </div>
          <span className={theme.statusSpan}>Your review requested</span>
        </div>
      );
    }

    return (
      <div className={theme.reviewStatusWrapper}>
        <div className={`${theme.reviewStatusIndicator} ${theme.noRequest}`}>
          <svg
            className={theme.reviewStatusIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.11 31.11"
          >
            <path
              fill="#FFF"
              d="M31.1 1.4L29.7 0 15.56 14.14 1.4 0 0 1.4l14.14 14.16L0 29.7l1.4 1.4 14.16-14.13L29.7 31.1l1.4-1.4-14.13-14.14"
            />
          </svg>
        </div>
        <span className={theme.statusSpan}>Your review not requested</span>
      </div>
    );
  };

  const generateStateClass = state => {
    let reviewStatusClassName = '';
    switch (state) {
      case 'APPROVED':
        reviewStatusClassName = 'statusApproved';
        break;
      case 'CHANGES_REQUESTED':
        reviewStatusClassName = 'statusChangesRequested';
        break;
      case 'COMMENTED':
        reviewStatusClassName = 'statusCommented';
        break;
      case 'PENDING':
        reviewStatusClassName = 'statusPending';
        break;
      case 'DISMISSED':
        reviewStatusClassName = 'statusDismissed';
        break;
      default:
        reviewStatusClassName = '';
    }
    return reviewStatusClassName;
  };

  const prReviews = reviewsByAuthor.map(review => (
    <div className={theme.review} key={`${review.login}`}>
      <img
        className={theme.reviewAuthorAvatar}
        src={review.avatarUrl}
        alt="review author"
      />
      <span className={theme.reviewAuthorLogin}>{review.login}</span>
      {review.states.map((state, index) => {
        const stateClass = generateStateClass(state);
        return (
          <div
            className={`${theme.reviewState} ${theme[stateClass]}`}
            key={`${review.login}_state_${index}`}
          >
            {state.replace(/_/g, ' ')}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className={`${theme.pullRequest}`}>
      <div className={theme.header}>
        <a href={url} className={theme.link}>
          <h4 className={theme.title}>{title}</h4>
        </a>
      </div>
      <div className={theme.bodyWrapper}>
        <div className={theme.leftColumn}>
          <img
            className={theme.authorAvatar}
            src={author.avatarUrl}
            alt="pull request author"
          />
          <span className={theme.authorLogin}>{author.login}</span>
          <span className={theme.infoSpan}>#{number}</span>
          <span className={theme.infoSpan}>{date}</span>
          <span className={theme.infoSpan}>{time}</span>
        </div>
        <div className={theme.middleColumn}>{reviewRequestStatus()}</div>
        <div className={theme.rightColumn}>
          <h3 className={theme.reviewsTitle}>Reviews</h3>
          <div className={theme.reviewsContainer}>{prReviews}</div>
        </div>
      </div>
    </div>
  );
}

PullRequest.propTypes = {
  theme: PropTypes.shape(),
  date: PropTypes.string,
  time: PropTypes.string,
  url: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  currentUserReviewRequested: PropTypes.bool.isRequired,
  reviewedByCurrentUser: PropTypes.bool.isRequired,
  reviewsByAuthor: PropTypes.arrayOf(PropTypes.shape()),
};

PullRequest.defaultProps = {
  theme: defaultTheme,
  mergedAt: null,
  assignees: [],
  comments: [],
  reviewRequests: [],
  reviews: [],
  aggregatedReviews: {},
  date: null,
  time: null,
  reviewsByAuthor: [],
};
