import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Button, ButtonConstants } from '@/components';

import styles from './PublicationCard.module.scss';

const PublicationCard = (props) => {
  const { content, publication } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.PublicationCard} key={publication.id}>
      <h2>{publication.title}</h2>

      <div
        className={styles.PublicationCardContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Link to={{ pathname: '/publication', search: `?id=${publication.id}` }}>
        <Button className={styles.btnReadMore} category={ButtonConstants.ButtonCategories.PRIMARY}>
          {t('Read more')}
        </Button>
      </Link>
    </div>
  );
};

const PublicationCardMemo = memo(PublicationCard);

export { PublicationCardMemo as PublicationCard };
