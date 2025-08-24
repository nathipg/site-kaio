import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpandCollapseArrow } from '@/components/ExpandCollapseArrow';
import { FieldWithLabel, Input } from '@/components/Forms';

import { PublicationItemStatus } from '../PublicationItemStatus';

import styles from './PublicationItemHeader.module.scss';

const PublicationItemHeader = (props) => {
  const { item, isExpanded, editMode } = props;
  const { onChangeExpandedState, onUpdateItemProperty } = props;

  const { t } = useTranslation();

  const renderTitle = useCallback(() => {
    if(!editMode) {
      return item.title;
    }

    return (
      <FieldWithLabel
        label={t('Title')}
        field={(
          <Input
            type="text"
            name="title"
            value={item.title}
            onChange={(event) => onUpdateItemProperty('title', event.target.value)}
          />
        )}
      />
    );
  }, [ editMode, item.title, onUpdateItemProperty, t ]);

  return (
    <div className={styles.PublicationItemHeader} onClick={editMode ? () => null : onChangeExpandedState}>
      <h2>
        <PublicationItemStatus item={item} />
        {renderTitle()}
      </h2>
      
      <ExpandCollapseArrow
        isExpanded={isExpanded}
      />
    </div>
  );
};

const PublicationItemHeaderMemo = memo(PublicationItemHeader);

export { PublicationItemHeaderMemo as PublicationItemHeader };
