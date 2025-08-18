import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonConstants, PaperPlaneIcon, TextArea } from '@/components';

const SendWorkout = () => {
  const { t } = useTranslation();

  const [ comment, setComment ] = useState('');
  
  return (
    <>
      <TextArea
        value={comment}
        onChange={event => setComment(event.target.value)}
      />
    
      <Button
        category={ButtonConstants.ButtonCategories.SUCCESS}
        icon={<PaperPlaneIcon />}
        onClick={() => null}
      >
        {t('Send')}
      </Button>
    </>
  );
};

const SendWorkoutMemo = memo(SendWorkout);

export { SendWorkoutMemo as SendWorkout };
