/**
 * name: salary
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Salary.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Tag, Modal, message } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import config from '@/config';

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
      title: '订单状态',
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
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a disabled={+record.status === 2} onClick={this.handlePass(record.id)}>审核通过</a>
          <Divider type="vertical" />
          <a disabled={+record.status === 3} onClick={this.handleRefused(record.id)}>审核不通过</a>
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

  handleTableChange = () => {

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


  render() {
    const { salaries } = this.props;
    const { data } = salaries;
    return (
      <PageHeaderWrapper title="工资结算审核">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              size="small"
              data={data}
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
