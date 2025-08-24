import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Select.module.scss';

const Select = (props) => {
  const { renderItems = () => null, emptyItemText = 'Select item', value, ...otherProps } = props;

  const { t } = useTranslation();

  return (
    <select
      value={value || ''}
      className={styles.Select}
      {...otherProps}
    >
      <option value="">{t(emptyItemText)}</option>
      {renderItems()}
    </select>
  );
};

const SelectMemo = memo(Select);

export { SelectMemo as Select };
