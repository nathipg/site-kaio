import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button, ButtonConstants } from '@/components/Button';
import { SaveButton } from '@/components/Buttons';
import { RemoveExerciseConfirmDialog } from '@/components/Dialogs';
import { FieldWithLabel, Input } from '@/components/Forms';
import { PenToSquareIcon, XIcon } from '@/components/Icons';
import { Video } from '@/components/Video';
import { ExerciseSlice } from '@/store/slices';

import styles from './ExerciseItem.module.scss';

const ExerciseItem = (props) => {
  const { item } = props;

  const { t } = useTranslation();

  const removeExerciseDialogFnsRef = useRef(null);

  const dispatch = useDispatch();

  const [ editMode, setEditMode ] = useState(false);
  const [ title, setTitle ] = useState(item.title);
  const [ url, setUrl ] = useState(item.videoUrl);

  const onSaveEdit = useCallback(() => {
    if(!title.trim()) {
      dispatch(ExerciseSlice.actions.setSaveExerciseError(t('Please, insert an exercise title')));
      return;
    }

    setEditMode(false);

    dispatch(ExerciseSlice.actions.saveExercise({
      ...item,
      title,
      videoUrl: url,
    }));
  }, [ dispatch, item, t, title, url ]);

  const onCancelEdit = useCallback(() => {
    setTitle(item.title);
    setUrl(item.videoUrl);
    setEditMode(false);
    dispatch(ExerciseSlice.actions.clearSaveExerciseError());
  }, [ dispatch, item.title, item.videoUrl ]);

  const renderItem = useCallback(() => {
    return (
      <>
        <div className={styles.ExerciseItemHeader}>
          <span>{title}</span>

          <div className={styles.ExerciseItemButtonsContainer}>
            <Button
              category={ButtonConstants.ButtonCategories.PRIMARY}
              icon={<PenToSquareIcon />}
              onClick={() => setEditMode(true)}
            >
              {t('Edit')}
            </Button>

            <Button
              category={ButtonConstants.ButtonCategories.DANGER}
              icon={<XIcon />}
              onClick={() => removeExerciseDialogFnsRef.current?.show()}
            >
              {t('Remove')}
            </Button>
          </div>
        </div>

        <Video
          url={url}
        />
      </>
    );
  }, [ t, title, url ]);

  const renderEditableItem = useCallback(() => {
    return (
      <>
        <div className={styles.FieldSet}>
          <FieldWithLabel
            label={t('Title')}
            field={(
              <Input
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            )}
          />

          <FieldWithLabel
            label={t('YouTube URL')}
            field={(
              <Input
                type="url"
                name="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            )}
          />
        </div>

        <div className={styles.ExerciseItemButtonsContainer}>
          <SaveButton onClick={onSaveEdit} />

          <Button
            category={ButtonConstants.ButtonCategories.DANGER}
            icon={<XIcon />}
            onClick={onCancelEdit}
          >
            {t('Cancel')}
          </Button>
        </div>
      </>
    );
  }, [ onCancelEdit, onSaveEdit, t, title, url ]);

  return (
    <div className={styles.ExerciseItem}>
      {editMode ? renderEditableItem() : renderItem()}
      {
        <RemoveExerciseConfirmDialog
          exercise={item}
          dialogFnsRef={removeExerciseDialogFnsRef}
        />
      }
    </div>
  );
};

const ExerciseItemMemo = memo(ExerciseItem);

export { ExerciseItemMemo as ExerciseItem };
