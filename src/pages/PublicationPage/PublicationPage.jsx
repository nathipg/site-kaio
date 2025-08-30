import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';

import { ArrowLeftLongIcon, Button, GrowlFns } from '@/components';
import { REQUEST_STATUS } from '@/constants';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './PublicationPage.module.scss';

const PublicationPage = () => {
  const { t } = useTranslation();
  
  const dispatch = useDispatch();

  const [ searchParams ] = useSearchParams();

  const publicationId = searchParams.get('id') || null;

  const publication = useSelector(PublicationSlice.selectors.selectPublicationById(publicationId));
  const loadPublicationsError = useSelector(PublicationSlice.selectors.selectLoadPublicationsError);
  const loadPublicationsStatus = useSelector(PublicationSlice.selectors.selectLoadPublicationsStatus);

  const isPublicationLoading = useMemo(() => {
    if([ REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING ].includes(loadPublicationsStatus)) {
      return true;
    }

    return false;
  }, [ loadPublicationsStatus ]);

  const content = useMemo(() => {
    if(!publication) {
      return null;
    }
    return utils.getPublicationContentByUserLanguages(publication);
  }, [ publication ]);

  const title = useMemo(() => {
    if(!publication) {
      return null;
    }
    return utils.getPublicationTitleByUserLanguages(publication);
  }, [ publication ]);

  const onCloseLoadPublicationsErrorGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearLoadPublicationsError());
  }, [ dispatch ]);

  useEffect(() => {
    if(REQUEST_STATUS.IDLE == loadPublicationsStatus) {
      dispatch(PublicationSlice.actions.loadPublishedPublications());
    }
  }, [ dispatch, loadPublicationsStatus ]);

  return (
    <div className={styles.PublicationPage}>
      {
        publication ? (
          <>
            <div className={styles.header}>
              <h2>{title}</h2>
              <p className={styles.date}>{utils.getDateFormatted(new Date(publication.createdAt), { weekday: 'long' })}</p>
            </div>

            <div
              className={styles.PublicationCardContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <Link className={styles.btnBack} to={{ pathname: '/publications' }}>
              <Button>
                <ArrowLeftLongIcon />
                {t('Back')}
              </Button>
            </Link>
          </>
        ) : <p>{t(isPublicationLoading ? 'Loading...' : 'Publication not found')}</p>
      }

      {GrowlFns.renderErrorGrowl({
        message: loadPublicationsError,
        onCloseGrowl: onCloseLoadPublicationsErrorGrowl,
      })}
    </div>
  );
};

const PublicationPageMemo = memo(PublicationPage);

export { PublicationPageMemo as PublicationPage };
