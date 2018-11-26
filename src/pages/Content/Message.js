/**
 * name: 消息管理
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Message.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class MessageView extends PureComponent {

  columns = [
    {
      title: '用户',
      dataIndex: 'user',
      width: 150,
    },
    {
      title: '消息logo',
      dataIndex: 'logo',
      width: 150,
    },
    {
      title: '消息标题',
      dataIndex: 'title',
      width: 150,
    },
    {
      title: '消息内容',
      dataIndex: 'content',
      width: 150,
    },
    {
      title: '消息链接',
      dataIndex: 'link',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>推送</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }


  render() {
    return (
      <PageHeaderWrapper title="消息管理">
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
              scroll={{ x: 900 }}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MessageView;
