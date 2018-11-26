/**
 * name: 代理列表
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class ListView extends PureComponent {

  columns = [
    {
      title: '用户编号',
      dataIndex: 'userNum',
      width: 150,
    },
    {
      title: '专属邀请码',
      dataIndex: 'advertiserName',
      width: 150,
    },
    {
      title: '代理等级',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '直接分佣比例',
      dataIndex: 'wechat',
      width: 150,
    },
    {
      title: '间接分佣比例',
      dataIndex: 'goodsNum',
      width: 150,
    },
    {
      title: '成为代理时间',
      dataIndex: 'joinTime',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a >查看下级</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }}>查看奖励</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户编号">
              {getFieldDecorator('userNum')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="代理等级">
              {getFieldDecorator('mobile', {
                initialValue: 'all',
              })(
                <Select>
                  <Option value="all">全部</Option>
                  <Option value="qingtong">青铜</Option>
                  <Option value="baiyin">白银</Option>
                  <Option value="zhuanshi">砖石</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );

  }

  render() {
    return (
      <PageHeaderWrapper title="代理列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
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

export default ListView;
