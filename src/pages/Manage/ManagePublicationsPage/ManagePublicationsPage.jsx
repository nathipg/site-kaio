import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonConstants, GrowlFns, PlusIcon, PublicationList, Quill } from '@/components';
import { PublicationSlice } from '@/store/slices';
import { utils } from '@/utils';

import styles from './ManagePublicationsPage.module.scss';

const ManagePublicationsPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const publications = useSelector(PublicationSlice.selectors.selectAllPublications);
  const loadPublicationsError = useSelector(PublicationSlice.selectors.selectLoadPublicationsError);
  const addPublicationError = useSelector(PublicationSlice.selectors.selectAddPublicationError);
  const savePublicationError = useSelector(PublicationSlice.selectors.selectSavePublicationError);
  const savePublicationMessage = useSelector(PublicationSlice.selectors.selectSavePublicationMessage);

  const onAddItem = useCallback(() => {
    const now = utils.getDateIsoFormat(new Date());

    dispatch(PublicationSlice.actions.addPublication({
      title: 'TEMP',
      content: {},
      isPublished: false,
      createdAt: now,
    }));
  }, [ dispatch ]);

  const onCloseLoadPublicationsErrorGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearLoadPublicationsError());
  }, [ dispatch ]);
  
  const onCloseAddPublicationErrorGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearAddPublicationError());
  }, [ dispatch ]);
  
  const onCloseSavePublicationErrorGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearSavePublicationError());
  }, [ dispatch ]);

  const onCloseSavePublicationMessageGrowl = useCallback(() => {
    dispatch(PublicationSlice.actions.clearSavePublicationMessage());
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(PublicationSlice.actions.loadPublications());
  }, [ dispatch ]);

  return (
    <div className={styles.ManagePublicationsPage}>
      <h1>{t('Manage Publications')}</h1>

      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PlusIcon />}
        onClick={onAddItem}
      >
        {t('Add Publication')}
      </Button>

      {publications ? (
        <PublicationList
          items={publications}
        />
      ) : <></>}

      {GrowlFns.renderSuccessGrowl({
        message: savePublicationMessage,
        onCloseGrowl: onCloseSavePublicationMessageGrowl,
      })}

      {GrowlFns.renderErrorGrowl({
        message: loadPublicationsError,
        onCloseGrowl: onCloseLoadPublicationsErrorGrowl,
      })}
      
      {GrowlFns.renderErrorGrowl({
        message: addPublicationError,
        onCloseGrowl: onCloseAddPublicationErrorGrowl,
      })}
      
      {GrowlFns.renderErrorGrowl({
        message: savePublicationError,
        onCloseGrowl: onCloseSavePublicationErrorGrowl,
      })}
    </div>
  );
};

const ManagePublicationsPageMemo = memo(ManagePublicationsPage);

export { ManagePublicationsPageMemo as ManagePublicationsPage };
