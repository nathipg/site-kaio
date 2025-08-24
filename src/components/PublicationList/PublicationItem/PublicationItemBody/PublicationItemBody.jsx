import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Quill } from '@/components';

import styles from './PublicationItemBody.module.scss';

const PublicationItemBody = (props) => {
  const { item, selectedLanguage, editMode } = props;
  const { quillRef } = props;

  const { t } = useTranslation();

  const renderEditMode = useCallback(() => {
    
    return (
      <Quill
        quillRef={quillRef}
        value={item.content[selectedLanguage] || ''}
      />
    );
  }, [ item.content, quillRef, selectedLanguage ]);

  const renderViewMode = useCallback(() => {
    const content = item.content[selectedLanguage];
    if(!content) {
      return t('<empty>');
    }

    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }, [ item.content, selectedLanguage, t ]);

  return (
    <div className={styles.PublicationItemBody}>
      {editMode ? renderEditMode() : renderViewMode()}
    </div>
  );
};

const PublicationItemBodyMemo = memo(PublicationItemBody);

export { PublicationItemBodyMemo as PublicationItemBody };
