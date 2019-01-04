import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { LoadingIcon } from '../IronSpin';
import request from '@/utils/request';
import debounce from 'lodash/debounce';

const { Option } = Select;

export default
class SelectProductLink extends PureComponent {

  state = {
    value: null,
    fetching: false,
    data: [],
  }

  constructor(props) {
    super(props);
    
    this.fetch = debounce(this.fetch, 600);
  }

  fetch = (value) => {
    const { ptype = 1 } = this.props;
    const { action = '/apis/products/links/search' } = this.props;
    this.setState({ data: [], fetching: true });
    request(`${action}?search=${value}&product_type=${ptype}`)
      .then(resp => {
        const { links } = resp;
        const data = links.map(p => ({
          text: `${p.category_name}/${p.product_name}`,
          value: p.link,
        }));
        this.setState({ data, fetching: false });
      });
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  handleBlur = () => {
    this.setState({
      value: '',
      data: [],
      fetching: false,
    });
  }
  
  render () {
    const { value, data, fetching } = this.state;
    const { value: valueProp } = this.props;

    return (<Select
      // mode="multiple"
      showArrow
      showSearch
      labelInValue
      value={value || valueProp}
      placeholder="输入商品名称搜索"
      notFoundContent={fetching ? <LoadingIcon spin /> : "没有数据哦～～"}
      filterOption={false}
      onFocus={() => this.fetch('')}
      onBlur={this.handleBlur}
      onSearch={this.fetch}
      // notFoundContent="没有数据哦～～"
      style={{ width: '100%' }}
      onChange={this.handleChange}
    >
      {data.map(d => <Option key={d.value}>{d.text}</Option>)}
    </Select>)
  }
}