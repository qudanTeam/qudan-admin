/**
 * name: 店铺列表
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class ListView extends PureComponent {

  columns = [
    {
      title: '店铺名称',
      dataIndex: 'userNum',
      width: 150,
    },
    {
      title: '用户编号',
      dataIndex: 'advertiserName',
      width: 150,
    },
    {
      title: '推广产品数量',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '店铺商品收益',
      dataIndex: 'wechat',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      render: (text, record) => (
        <Fragment>
          <a >查看推广产品</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }

  render() {
    return (
      <PageHeaderWrapper title="店铺列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              size="small"
              data={{}}
              columns={this.columns}
              onChange={this.handleTableChange}
              
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListView;
