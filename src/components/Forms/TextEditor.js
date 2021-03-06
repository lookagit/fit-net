import React from 'react';

var RichTextEditor;
if (!SERVER) { RichTextEditor = require('react-rte').default; }

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor ? RichTextEditor.createEmptyValue() : null,
    };
  }
  componentDidMount() {
    const { initVal } = this.props;
    if (initVal) {
      this.setState({
        value: RichTextEditor.createValueFromString(initVal, 'html')
      });
    }
  }
  onChangeRte = value => {
    const html = value.toString('html');
    this.setState({
      value,
    });
    this.props.getValue(html);
  }

  render() {
    if (RichTextEditor) {
      
      return (
        <RichTextEditor
          value={this.state.value}
          rootStyle={{ width: '100%' }}
          onChange={this.onChangeRte}
        />
      );
    }
    return (
      <div>
      </div>
    );
  }
}

export default TextEditor;
