import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components/Button';
import { FieldWithLabel, Input } from '@/components/Forms';
import { FloppyDiskIcon, PenToSquareIcon, XIcon } from '@/components/Icons';
import { Video } from '@/components/Video';

import styles from './ExerciseItem.module.scss';

const ExerciseItem = (props) => {
  const { item } = props;

  const { t } = useTranslation();

  const [ editMode, setEditMode ] = useState(false);
  const [ title, setTitle ] = useState(item.title);
  const [ url, setUrl ] = useState(item.videoUrl);

  const onSaveEdit = useCallback(() => {
    setEditMode(false);

    console.log('TODO CODE TO ACTUALLY SAVE THE ITEM HERE');
  }, []);

  const onCancelEdit = useCallback(() => {
    setTitle(item.title);
    setUrl(item.videoUrl);
    setEditMode(false);
  }, [ item.title, item.videoUrl ]);

  const renderItem = useCallback(() => {
    return (
      <div>
        <div className={styles.ExerciseItemHeader}>
          <span>{title}</span>
          <Button
            category={ButtonConstants.ButtonCategories.PRIMARY}
            icon={<PenToSquareIcon />}
            onClick={() => setEditMode(true)}
          >
            {t('Edit')}
          </Button>
        </div>

        <Video
          url={url}
        />
      </div>
    );
  }, [ t, title, url ]);

  const renderEditableItem = useCallback(() => {
    return (
      <div className={styles.ExerciseEditableItem}>
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

        <Button
          category={ButtonConstants.ButtonCategories.SUCCESS}
          icon={<FloppyDiskIcon />}
          onClick={onSaveEdit}
        >
          {t('Save')}
        </Button>

        <Button
          category={ButtonConstants.ButtonCategories.DANGER}
          icon={<XIcon />}
          onClick={onCancelEdit}
        >
          {t('Cancel')}
        </Button>
      </div>
    );
  }, [ onCancelEdit, onSaveEdit, t, title, url ]);

  return editMode ? renderEditableItem() : renderItem();
};

const ExerciseItemMemo = memo(ExerciseItem);

export { ExerciseItemMemo as ExerciseItem };
