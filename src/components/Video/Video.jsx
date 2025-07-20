import { memo } from 'react';

import styles from './Video.module.scss';

const Video = (props) => {
  const { url } = props;

  return (
    <div className={styles.VideoContainer}>
      <iframe
        className={styles.Video}
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const VideoMemo = memo(Video);

export { VideoMemo as Video };
