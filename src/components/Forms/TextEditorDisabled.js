import React from 'react';

var RichTextEditor;
if (!SERVER) { RichTextEditor = require('react-rte').default; }

class TextEditorDisabled extends React.Component {
  getValueForRTEditor = value => {
    const tmp = value || '';
    return RichTextEditor.createValueFromString(tmp, 'html');
  };

  render() {
    if (RichTextEditor) {
      return (
        <RichTextEditor
          value={this.getValueForRTEditor(this.props.text)}
          rootStyle={{ border: 'none', background: 'none' }}
          editorStyle={{ color: 'white' }}
          readOnly
        />
      );
    }
    return (
      <div>
      </div>
    );
  }
}

export default TextEditorDisabled;
