import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, GrowlFns, PublicationCard } from '@/components';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './PublicationsPage.module.scss';

const PublicationsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const publications = useSelector(PublicationSlice.selectors.selectAllPublications);
  const loadPublicationsError = useSelector(PublicationSlice.selectors.selectLoadPublicationsError);

  const onCloseLoadPublicationsErrorGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearLoadPublicationsError());
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(PublicationSlice.actions.loadPublishedPublications());
  }, [ dispatch ]);

  return (
    <div className={styles.PublicationsPage}>
      <h2 className={styles.header}>{t('Publications')}</h2>
      <div className={styles.publicationsGrid}>
        {publications.map((publication) => {
          const content = utils.getPublicationContentByUserLanguages(publication);

          return (
            <PublicationCard content={content} publication={publication} />
          );
        })}
      </div>

      {GrowlFns.renderErrorGrowl({
        message: loadPublicationsError,
        onCloseGrowl: onCloseLoadPublicationsErrorGrowl,
      })}
    </div>
  );
};

const PublicationsPageMemo = memo(PublicationsPage);

export { PublicationsPageMemo as PublicationsPage };
