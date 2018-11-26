/**
 * name: 代理参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Divider, Col, Button, Input } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;

@Form.create()
class SettingsView extends PureComponent {

  columns = [
    {
      title: '代理级别名称',
      dataIndex: 'userNum',
      width: 150,
    },
    {
      title: '直接分佣比例',
      dataIndex: 'advertiserName',
      width: 150,
    },
    {
      title: '间接分佣比例',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '邀请注册人数',
      dataIndex: 'wechat',
      width: 150,
    },
    {
      title: '下级完成任务数量',
      dataIndex: 'goodsNum',
      width: 200,
    },
    {
      title: '分享次数',
      dataIndex: 'joinTime',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a >编辑</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }} onClick={this.deleteOne}>删除</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }


  render() {
    return (
      <PageHeaderWrapper title="代理参数设置">
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

export default SettingsView;
