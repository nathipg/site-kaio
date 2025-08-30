import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Button, ButtonConstants } from '@/components';
import { utils } from '@/utils';

import styles from './PublicationCard.module.scss';

const PublicationCard = (props) => {
  const { publication } = props;
  const { t } = useTranslation();

  const content = utils.getPublicationContentByUserLanguages(publication);
  const title = utils.getPublicationTitleByUserLanguages(publication);

  return (
    <div className={styles.PublicationCard}>
      <h2>{title}</h2>

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
