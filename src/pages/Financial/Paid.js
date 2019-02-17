/**
 * name: paid
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Paid.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Avatar, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';
import config from '@/config';
import Uploader from '@/components/Uploader';
import { formatMessage, FormattedMessage } from 'umi/locale';
import SelectUser from '@/components/Select/SelectUser';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;


@connect(({ financials, loading }) => ({
  financials,
  loading: loading.models.messages,
}))
@Form.create()
class PaidView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '订单编号',
      dataIndex: 'apply_id_code',
      width: 150,
    },
    {
      title: '支付流水号',
      dataIndex: 'pay_order_no',
      width: 150,
    },
    {
      title: '订单创建时间',
      dataIndex: 'apply_create_time',
      width: 150,
      render: val => {
        return (<span>{moment(val).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss')}</span>);
      },
    },
    {
      title: '支付时间',
      dataIndex: 'modify_time',
      width: 150,
      render: val => {
        return (<span>{moment(val).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss')}</span>);
      }
    },
    {
      title: '支付金额',
      dataIndex: 'pay_price',
      // width: 150,
    },
    {
      title: '支付用户编号',
      dataIndex: 'user_invite_code',
      // width: 150,
    },
    
  ]

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetchPosApply',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetchPosApply',
    });
  }


  render() {
    const { 
      financials: {
        posApply: data,
      },
      loading
    } = this.props;
    return (
      <PageHeaderWrapper title="支付列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
            </div>
            <StandardTable
              loading={loading}
              size="small"
              data={data}
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

export default PaidView;
