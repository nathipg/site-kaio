import { memo } from 'react';

import { Button, ButtonConstants, XIcon } from '@/components';

const RemoveIconButton = (props) => {
  return (
    <Button
      category={ButtonConstants.ButtonCategories.DANGER}
      textOnly={true}
      {...props}
    >
      <XIcon />
    </Button>
  );
};

const RemoveIconButtonMemo = memo(RemoveIconButton);

export { RemoveIconButtonMemo as RemoveIconButton };
