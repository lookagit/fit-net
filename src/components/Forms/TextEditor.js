import React from 'react';
import RichTextEditor from 'react-rte';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
    };
  }
  onChangeRte = value => {
    const html = value.toString('html');
    this.setState({
      value,
    });
    this.props.getValue(html);
  }

  render() {
    return (
      <RichTextEditor
        value={this.state.value}
        rootStyle={{ width: '100%' }}
        onChange={this.onChangeRte}
      />
    );
  }
}

export default TextEditor;
