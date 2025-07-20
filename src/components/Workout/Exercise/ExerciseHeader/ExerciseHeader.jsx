import { memo } from 'react';

import { ExpandCollapseArrow } from '@/components';

const ExerciseHeader = (props) => {
  const { isExpanded, name } = props;
  const { onChangeExpandedState } = props;

  return (
    <div>
      <ExpandCollapseArrow
        isExpanded={isExpanded}
        onChangeExpandedState={onChangeExpandedState}
      />
    
      {name}
    </div>
  );
};

const ExerciseHeaderMemo = memo(ExerciseHeader);

export { ExerciseHeaderMemo as ExerciseHeader };
