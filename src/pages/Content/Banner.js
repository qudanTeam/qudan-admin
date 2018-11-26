/**
 * name: 轮播图管理
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './Banner.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class BannerView extends PureComponent {

  columns = [
    {
      title: '序号',
      dataIndex: 'no',
      width: 150,
    },
    {
      title: '轮播图名称',
      dataIndex: 'banner_name',
      width: 150,
    },
    {
      title: '轮播图链接',
      dataIndex: 'banner_link',
      width: 150,
    },
    {
      title: '轮播图图片',
      dataIndex: 'banner_image',
      width: 150,
    },
    {
      title: '轮播图位置',
      dataIndex: 'banner_position',
      width: 150,
    },
    {
      title: '是否显示',
      dataIndex: 'is_enable',
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
          <a>启用/停用</a>
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
      <PageHeaderWrapper title="轮播图管理">
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

export default BannerView;
