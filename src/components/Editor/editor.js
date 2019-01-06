import React, { PureComponent } from 'react';
import 'braft-editor/dist/index.css';
import styles from './editor.less';
import BraftEditor from 'braft-editor';

class Editor extends PureComponent {

  // static getDerivedStateFromProps(props, state) {
  //   const { value: stateValue } = state;
  //   const { value } = props;
  //   if (!stateValue && value) {

  //     return {
  //       value,
  //     };
  //   }

  //   return null;
  // }

  // componentDidUpdate() {
  //   const { value } = this.state;
  //   const { value: nextValue } = this.props;
  //   if (value != nextValue) {

  //   }
  // }

  render() {
    // const { props } = this;
    // const { className, value, ...restProps } = props;
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link' ]
    const restProps = {
      ...this.props,
      controls,
      className: styles.editor,
    }
    
    return (
      <BraftEditor {...restProps} />
    )
  }
}

export default Editor;