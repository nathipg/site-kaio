import ImageResize from 'quill-image-resize-module-react';
import { memo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [ { 'header': [ 1, 2, false ] } ],
    [ 'bold', 'italic', 'underline','strike', { align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }, 'blockquote' ],
    [ { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' } ],
    [ 'link', 'image' ],
    [ 'clean' ],
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
  },
};

const QuillComponent = (props) => {
  const { value } = props;
  const { quillRef } = props;
  
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      modules={modules}
      formats={[ 'image', 'width', 'height' ]}
    />
  );
};

const QuillMemo = memo(QuillComponent);

export { QuillMemo as Quill };
