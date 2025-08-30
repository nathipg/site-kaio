import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const RankingStarIcon = (props) => {
  return (
    <FontAwesomeIcon
      icon={faRankingStar}
      {...props}
    />
  );
};

const RankingStarIconMemo = memo(RankingStarIcon);

export { RankingStarIconMemo as RankingStarIcon };
