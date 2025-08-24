import { memo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
  toolbar: [
    [ { 'header': [ 1, 2, false ] } ],
    [ 'bold', 'italic', 'underline','strike', { align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }, 'blockquote' ],
    [ { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' } ],
    [ 'link', 'image' ],
    [ 'clean' ],
  ],
};

const Quill = (props) => {
  const { value } = props;
  const { quillRef } = props;
  
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      modules={modules}
    />
  );
};

const QuillMemo = memo(Quill);

export { QuillMemo as Quill };
