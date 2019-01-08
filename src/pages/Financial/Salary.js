/**
 * name: salary
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Salary.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Tag, Modal, message, DatePicker } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import config from '@/config';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ salaries, loading }) => ({
  salaries,
  loading: loading.models.salaries,
}))
@Form.create()
class SalaryView extends PureComponent {

  state = {
    currentMessage: "",
  }

  columns = [
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 150,
    },
    {
      title: '金额',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'trade_type',
      width: 150,
      render: (val) => {
        return (<Tag>{config.TradeType[val]}</Tag>)
      }
    },
    {
      title: '订单编号',
      dataIndex: 'apply_id_code',
      width: 150,
      render: (val) => {
        if (!val) {
          return '--';
        }

        return val;
      }
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      width: 150,
      render: (val) => {
        let color = null;
        if (+val === 2) {
          color = config.colors.success;
        }

        if (+val === 3) {
          color = config.colors.failed;
        }
        return (<Tag color={color}>{config.TradeExecState[val]}</Tag>)
      },
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
      width: 250,
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      width: 250,
      render: (val) => {
        return (
          <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
        );
      }
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
      render: (val) => {
        if (!val) {
          return '--';
        }
        return (
          <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
        );
      }
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a disabled={+record.status > 1} onClick={this.handlePass(record.id)}>审核通过</a>
          <Divider type="vertical" />
          <a disabled={+record.status > 1} onClick={this.handleRefused(record.id)}>审核不通过</a>
        </Fragment>
      ),
    },
  ]

  handlePass = id => e => {
    e.preventDefault();

    this.props.dispatch({
      type: 'salaries/pass',
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
          type: 'salaries/refuse',
          payload: {
            id,
            msg: this.state.currentMessage,
          },
        });
      },
    });
  }

  handlePassed = () => {

  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'salaries/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...this.state.formValues,
      },
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });
      if (values.filter_time && values.filter_time.length > 0) {
        values.start_time = values.filter_time[0].format('YYYY-MM-DD HH:mm:ss');
        values.end_time = values.filter_time[1].format('YYYY-MM-DD HH:mm:ss');
        delete values.filter_time;
      }
    
      dispatch({
        type: 'salaries/fetch',
        payload: values,
      });
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'salaries/fetch',
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
            <FormItem label="用户编号">
              {getFieldDecorator('invite_code')(
                <Input placeholder="用户编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('trade_type', {
                initialValue: 0,
              })(
                <Select>
                  <Select.Option value={0}>全部</Select.Option>
                  <Select.Option value={2}>任务佣金</Select.Option>
                  <Select.Option value={3}>团队佣金</Select.Option>
                  <Select.Option value={5}>阶梯工资</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结算时间">
              {getFieldDecorator('filter_time', {
                initialValue: null,
              })(
                <DatePicker.RangePicker
                format="YYYY-MM-DD"
                /> 
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('apply_id_code')(
                <Input placeholder="订单编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('status', {
                initialValue: 0,
              })(
                <Select>
                  <Select.Option value={0}>全部</Select.Option>
                  <Select.Option value={1}>待审核</Select.Option>
                  <Select.Option value={2}>已审核</Select.Option>
                  <Select.Option value={3}>已拒绝</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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
    const { salaries } = this.props;
    const { data } = salaries;
    return (
      <PageHeaderWrapper title="工资结算审核">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
          <div className={styles.tableList}>
            <StandardTable
              size="small"
              data={data}
              scroll={{ x: 1600 }}
              columns={this.columns}
              onChange={this.handleTableChange}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SalaryView;
