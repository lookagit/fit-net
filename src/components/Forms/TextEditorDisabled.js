import React from 'react'
import RichTextEditor from 'react-rte';

class TextEditorDisabled extends React.Component {
  constructor(props) {
    super(props);
  }

  getValueForRTEditor = (value) => {
    const tmp = value || '';
    return RichTextEditor.createValueFromString(tmp, 'html');
  };

  render() {
    return (
      <RichTextEditor
        value={this.getValueForRTEditor(this.props.text)}
        rootStyle={{ border: 'none', background: 'none' }}
        editorStyle={{ color: 'white' }}
        readOnly
      />
    );
  }
}

export default TextEditorDisabled;
