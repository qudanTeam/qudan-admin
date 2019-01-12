/**
 * name: withdraw_cash
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './WithdrawCash.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Tag, message, Modal, DatePicker } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';
import config from '@/config';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ financials, loading }) => ({
  financials,
  loading: loading.effects['financials/fetchWithdraws'],
}))
@Form.create()
class WithdrawView extends PureComponent {

  state = {
    currentMessage: '',
  }

  columns = [
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 150,
    },
    {
      title: '提现编号',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '手机号码',
      dataIndex: 'register_mobile',
      width: 150,
    },
    {
      title: '打款信息',
      // dataIndex: 'message',
      key: 'message',
      width: 250,
      render:(_, record) => {
        return (
          <div>
          <p>提现支付宝: {record.tx_alipay_no}</p>
          <p>姓名: {record.tx_name}</p>
          </div>
        )
      }
    },
    {
      title: '提现金额',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 150,
      render: (val) => {
        return (
          <Tag>{config.TradeTypeState[val]}</Tag>
        );
      }
    },
    {
      title: '发放状态',
      dataIndex: 'send_status',
      width: 150,
      render: (val) => {
        return (
          <Tag>{config.TradeTypeSendState[val]}</Tag>
        );
      }
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      width: 250,
      render: (val) => {
        if (!val) {
          return '--';
        }
        return (<span>{moment(val).utc().zone(+8).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
      width: 250,
      render: (val) => {
        if (!val) {
          return '--';
        }
        return (<span>{moment(val).utc().zone(+8).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
      // width: 150,
    },
    {
      title: '操作',
      width: 250,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a disabled={+record.status > 1} onClick={this.handlePass(record.id)}>
          审核通过
          </a>
          <Divider type="vertical" />
          <a disabled={+record.status > 1} onClick={this.handleRefused(record.id)}>审核不通过</a>
          <Divider type="vertical" />
          <a disabled={+record.status === 3 || record.send_status === 2} onClick={this.handleFinished(record.id)}>打款</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }

  handlePass = id => e => {
    e.preventDefault();

    this.props.dispatch({
      type: 'financials/passWithdraw',
      payload: {
        id,
      },
    });
  }

  handleFinished = id => e => {
    e.preventDefault();

    this.props.dispatch({
      type: 'financials/finishedWithdraw',
      payload: {
        id,
      },
    });
  }

  handleRefused = id => (e) => {
    e.preventDefault();
    Modal.confirm({
      title: '您的理由是?',
      content: (
        <Input.TextArea placeholder="您的理由" rows={3} maxLength={1000} onChange={(e) => this.setState({currentMessage: e.target.value})} />
      ),
      okText: '确认',
      cancelText: '取消',
      // okButtonProps: {
      //   disabled: !this.state.currentMessage,
      // },
      onOk: () => {
        console.log(this.state, 'state');
        if (!this.state.currentMessage) {
          message.error('请填写您的理由');
          return Promise.reject('error');
        }


        return this.props.dispatch({
          type: 'financials/refuseWithdraw',
          payload: {
            id,
            msg: this.state.currentMessage,
          },
        });
      },
    });
  }

  handleSearch = (e) => {
    console.log('search');
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      if (values.filter_time && values.filter_time.length > 0) {
        values.start_time = values.filter_time[0].format('YYYY-MM-DD HH:mm:ss');
        values.end_time = values.filter_time[1].format('YYYY-MM-DD HH:mm:ss');
        delete values.filter_time;
      }

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'financials/fetchWithdraws',
        payload: {
          page: 1,
          pageSize: 15,
          ...values
        },
      });
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'financials/fetchWithdraws',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('invite_code')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('register_mobile')(
                <Input placeholder="搜索: 手机号码" />  
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('status', {
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

          
        </Row>
        <Row>
          
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('filter_time', {
                initialValue: null,
              })(
                <DatePicker.RangePicker
                format="YYYY-MM-DD"
                /> 
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}></Col>
          <Col md={8} sm={24}>
            <span style={{float:'right'}} className={styles.submitButtons}>
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
    const {
      financials: {
        withdraws
      },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="提现审核">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              size="small"
              loading={loading}
              data={withdraws}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 2100 }}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WithdrawView;
