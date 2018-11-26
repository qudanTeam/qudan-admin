/**
 * name: 工资结算审核
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Salary.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class SalaryView extends PureComponent {

  columns = [
    {
      title: '用户编号',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '订单编号',
      dataIndex: 'order_no',
      width: 150,
    },
    {
      title: '订单状态',
      dataIndex: 'order_status',
      width: 150,
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
      width: 250,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>审核通过/审核不通过</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }


  render() {
    return (
      <PageHeaderWrapper title="工资结算审核">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              size="small"
              data={{}}
              columns={this.columns}
              onChange={this.handleTableChange}
              // scroll={{ x: 1000 }}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SalaryView;
