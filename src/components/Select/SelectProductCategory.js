import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { LoadingIcon } from '../IronSpin';
import request from '@/utils/request';
import debounce from 'lodash/debounce';

const { Option } = Select;

export default
class SelectProductCategory extends PureComponent {

  state = {
    value: null,
    fetching: false,
    data: [],
  }

  constructor(props) {
    super(props);
    
    this.fetchUser = debounce(this.fetchUser, 600);
  }

  fetchUser = (value) => {
    const { ptype = 1 } = this.props;
    const { action = '/apis/categories/search' } = this.props;
    this.setState({ data: [], fetching: true });
    request(`${action}?search=${value}&category_type=${ptype}`)
      .then(resp => {
        const { categories } = resp;
        const data = categories.map(p => ({
          text: p.name,
          value: p.id,
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
      placeholder="输入分类名搜索"
      notFoundContent={fetching ? <LoadingIcon spin /> : null}
      filterOption={false}
      onFocus={() => this.fetchUser('')}
      onBlur={this.handleBlur}
      onSearch={this.fetchUser}
      style={{ width: '100%' }}
      onChange={this.handleChange}
    >
      {data.map(d => <Option key={d.value}>{d.text}</Option>)}
    </Select>)
  }
}