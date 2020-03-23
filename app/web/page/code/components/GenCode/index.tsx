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
}
export default forwardRef<CodeMirror, GenCodeProps>(({ value }, ref) => {
  return (
    <CodeMirror
      ref={ref}
      value={value}
      options={codeMirrorOptions}
      editorDidMount={editor => {
        editor.setSize('100%', 600);
      }}
    />
  );
});
