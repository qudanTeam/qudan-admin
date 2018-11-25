import React, { PureComponent } from "react";
import { Tooltip, Input } from "antd";

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export default class NumericInput extends PureComponent {

  static defaultProps = {
    decimalSupport: true,
    onChange: () => null,
    style: {},
  }

  onChange = (e) => {
    let { value } = e.target;
    if (!value) {
      value = 0;
    }
    value = String(value);
    
    // const reg = /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/;
    let reg = /^-?(0|[0-9][0-9]*)?$/;
    if (this.props.decimalSupport) {
      reg = /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/;
    }
    
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      if (value.lastIndexOf('.') === value.length - 1) {
        this.props.onChange(value);
        return;
      }
      this.props.onChange(+value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { onBlur, onChange } = this.props;
    let { value } = this.props;
    value = String(value);
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      if (value.lastIndexOf('.') === value.length - 1) {
        this.props.onChange(value);
        return;
      }
      onChange({ value: value.slice(0, -1) });
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    ) : this.props.placeholder || 'Input a number';
    const { decimalSupport, ...restProps } = this.props;
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...restProps}
          onChange={this.onChange}
          onBlur={this.onBlur}
          style={{
            width: 160,
            ...this.props.style,
          }}
          placeholder={this.props.placeholder || 'Input a number'}
          maxLength="25"
        />
      </Tooltip>
    );
  }
}