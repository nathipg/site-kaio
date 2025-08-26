import { memo } from 'react';

import styles from './ExperienceCard.module.scss';

const ExperienceCard = ({
  title,
  subtitle,
  period,
  description,
  achievements,
  image,
}) => {
  return (
    <div className={styles.ExperienceCard}>
      {image && (
        <div className={styles.ImageContainer}>
          <img src={image} alt={title} />
        </div>
      )}
      <div className={styles.Content}>
        <h3>{title}</h3>
        {subtitle && <h4>{subtitle}</h4>}
        {period && <p className={styles.Period}>{period}</p>}
        {description && <p className={styles.Description}>{description}</p>}
        {achievements && (
          <div className={styles.Achievements}>
            <strong>Principais resultados:</strong>
            <p>{achievements}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceCardMemo = memo(ExperienceCard);

export { ExperienceCardMemo as ExperienceCard };
