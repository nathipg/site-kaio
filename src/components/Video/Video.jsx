import { memo, useMemo } from 'react';

import styles from './Video.module.scss';

const Video = (props) => {
  const { url } = props;

  const embedUrl = useMemo(() => {
    if(!url) {
      return '';
    }

    if(url.includes('embed')) {
      return url;
    }

    const urlObj = new URL(url);
    const videoID = urlObj.searchParams.get('v');

    return `https://www.youtube.com/embed/${videoID}`;
  }, [ url ]);

  return (
    <div className={styles.VideoContainer}>
      <iframe
        className={styles.Video}
        src={embedUrl}
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
