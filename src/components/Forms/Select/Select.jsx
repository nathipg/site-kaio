import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Select = (props) => {
  const { renderItems = () => null, emptyItemText = 'Select item', value, ...otherProps } = props;

  const { t } = useTranslation();

  return (
    <select value={value || ''} {...otherProps}>
      <option value="">{t(emptyItemText)}</option>
      {renderItems()}
    </select>
  );
};

const SelectMemo = memo(Select);

export { SelectMemo as Select };
