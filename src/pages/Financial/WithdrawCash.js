/**
 * name: withdraw_cash
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './WithdrawCash.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class WithdrawView extends PureComponent {

  columns = [
    {
      title: '用户编号',
      dataIndex: 'user_no',
      width: 150,
    },
    {
      title: '提现编号',
      dataIndex: 'withdraw_no',
      width: 150,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '打款信息',
      dataIndex: 'message',
      width: 150,
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      width: 150,
    },
    {
      title: '审核状态',
      dataIndex: 'review_state',
      width: 150,
    },
    {
      title: '发放状态',
      dataIndex: 'paid_state',
      width: 150,
    },
    {
      title: '申请时间',
      dataIndex: 'accept_time',
      width: 150,
    },
    {
      title: '审核时间',
      dataIndex: 'review_time',
      width: 150,
    },
    {
      title: '备注说明',
      dataIndex: 'note',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>审核通过/不通过</a>
          <Divider type="vertical" />
          <a>线下打款</a>
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
          <Col md={6} sm={24}>
            <FormItem>
              {getFieldDecorator('userNum')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem>
              {getFieldDecorator('mobile')(
                <Input placeholder="搜索: 手机号码" />  
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem>
              {getFieldDecorator('accept_state', {
                initialValue: 'all',
              })(
                <Select>
                  <Option value="all">全部</Option>
                  <Option value="pending">待审核</Option>
                  <Option value="passed">审核通过</Option>
                  <Option value="refused">审核不通过</Option>
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
      <PageHeaderWrapper title="提现审核">
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

export default WithdrawView;
