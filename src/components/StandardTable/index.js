import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import LoadingIcon from '@/components/IronSpin/LoadingIcon';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    // if (nextProps.selectedRows.length === 0) {
    //   const needTotalList = initTotalList(nextProps.columns);
    //   return {
    //     selectedRowKeys: [],
    //     needTotalList,
    //   };
    // }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { needTotalList } = this.state;
    const {
      data: { list, pagination },
      rowKey,
      loading,
      ...rest
    } = this.props;

    let restLoading = {
      indicator: <LoadingIcon spin />,
      // tip: '拼命加载中',
      delay: 300,
      spinning: false,
    }

    if (typeof loading === 'boolean') {
      restLoading.spinning = loading;
    } else if (typeof loading === 'object') {
      restLoading = loading;
    }

    // let rowSelection = null;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.handleRowSelectChange,
    //   getCheckboxProps: record => ({
    //     disabled: record.disabled,
    //   }),
    // };

    return (
      <div className={styles.standardTable}>
        
        <Table
          rowKey={rowKey || 'key'}
          loading={restLoading}
          // rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
