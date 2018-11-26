/**
 * name: 素材管理
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Resource.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class ResourceView extends PureComponent {

  columns = [
    {
      title: '序号',
      dataIndex: 'no',
      width: 150,
    },
    {
      title: '产品名称',
      dataIndex: 'product_name',
      width: 150,
    },
    {
      title: '素材文案',
      dataIndex: 'description',
      width: 150,
    },
    {
      title: '发布时间',
      dataIndex: 'create_time',
      width: 150,
    },
    {
      title: '是否展示',
      dataIndex: 'is_show',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>编辑</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }}>删除</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }


  render() {
    return (
      <PageHeaderWrapper title="素材管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新增
              </Button>
            </div>
            <StandardTable
              size="small"
              data={{}}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1000 }}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResourceView;
