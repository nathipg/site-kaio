import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants } from '@/components/Button';
import { FloppyDiskIcon } from '@/components/Icons';

const SaveButton = (props) => {
  const { onClick } = props;

  const { t } = useTranslation();

  return (
    <Button
      category={ButtonConstants.ButtonCategories.SUCCESS}
      icon={<FloppyDiskIcon />}
      onClick={onClick}
    >
      {t('Save')}
    </Button>
  );
};

const SaveButtonMemo = memo(SaveButton);

export { SaveButtonMemo as SaveButton };
