import { memo } from 'react';

const Image = (props) => {
  return (
    <img
      {...props}
    />
  );
};

const ImageMemo = memo(Image);

export { ImageMemo as Image };
