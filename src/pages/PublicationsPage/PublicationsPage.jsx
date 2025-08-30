import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Button, ButtonConstants, GrowlFns } from '@/components';
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
      {/* TODO turn this into a component */}
      {publications.map((publication) => {
        const content = utils.getPublicationContentByUserLanguages(publication);

        return (
          <div className={styles.PublicationCard} key={publication.id}>
            <h2>{publication.title}</h2>

            <div
              className={styles.PublicationCardContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <Link to={{ pathname: '/publication', search: `?id=${publication.id}` }}>
              <Button category={ButtonConstants.ButtonCategories.PRIMARY}>
                {t('Read more')}
              </Button>
            </Link>
          </div>
        );
      })}

      {GrowlFns.renderErrorGrowl({
        message: loadPublicationsError,
        onCloseGrowl: onCloseLoadPublicationsErrorGrowl,
      })}
    </div>
  );
};

const PublicationsPageMemo = memo(PublicationsPage);

export { PublicationsPageMemo as PublicationsPage };
