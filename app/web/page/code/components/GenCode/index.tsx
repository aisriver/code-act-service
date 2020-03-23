import React, { forwardRef } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript'; // typescript
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css';

const codeMirrorOptions = {
  smartIndent: true,
  indentUnit: 2,
  lineNumbers: true,
  theme: 'ayu-dark',
};

export interface GenCodeProps {
  value: string;
  onChange?: (editor: object, data: object, value: string) => void;
}
export default forwardRef<CodeMirror, GenCodeProps>(({ value, onChange }, ref) => {
  return (
    <CodeMirror
      onChange={onChange}
      ref={ref}
      value={value}
      options={codeMirrorOptions}
      editorDidMount={editor => {
        editor.setSize('100%', 600);
      }}
    />
  );
});
