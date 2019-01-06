/**
 * name: list
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input, Modal, Select, Divider, Tag, Drawer, Skeleton } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';
import config from '@/config';
import DescriptionList from '@/components/DescriptionList';

const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;

@connect(({orders, loading }) => ({
  orders,
  loading: loading.models.orders,
  loadingProfile: loading.effects['orders/fetchProfile'],
}))
@Form.create()
class OrderListView extends PureComponent {

  state = {
    preLoading: false,
    formValues: {},
    profileVisible: false,
  }

  originColumns = [
    {
      title: '订单编号',
      dataIndex: 'apply_id_code',
      width: 150,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 150,
      render: (val) => {
        return (<Tag color="magenta">{config.OrderStatus[val]}</Tag>)
      }
    },
    {
      title: '订单类型',
      dataIndex: 'product_type',
      width: 150,
      render: (val) => {
        return (<Tag color="blue">{config.ProductType[val]}</Tag>)
      }
    },
    {
      title: '商品名称',
      dataIndex: 'product_name',
      width: 150,
    },
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 150,
    },
    {
      title: '用户名称',
      dataIndex: 'realname',
      width: 150,
    },
    // {
    //   title: '已完成任务量',
    //   dataIndex: 'finished_task_count',
    //   width: 150,
    // },
    // {
    //   title: '已完成金额',
    //   dataIndex: 'finished_task_price',
    //   width: 150,
    // },
    {
      title: '用户手机号',
      dataIndex: 'mobile',
      // width: 150,
    },
    {
      title: '操作',
      width: 240,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.handleShowOne(record.id)}>查看</a>
          <Divider type="vertical" />
          <a disabled={+record.status === 2} onClick={this.handlePassOne(record.id)}>设为已通过</a>
          <Divider type="vertical" />
          <a disabled={+record.status === 3} onClick={this.handleRefuseOne(record.id)} style={ +record.status === 3 ? null : { color: 'red'}} >设为未通过</a>
        </Fragment>
      ),
    },
  ]

  get columns() {
    const cols = this.originColumns.map((val) => {
      if (!val.render) {
        val.render = (txt) => {
          return (<span>{txt || '--'}</span>)
        }
      }

      return val;
    })
    return cols;
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...this.state.formValues,
    };

    dispatch({
      type: 'orders/fetch',
      payload: params,
    });
  }

  handlePassOne = id => (e) => {
    if (e) {
      e.preventDefault()
    }

    const { dispatch } = this.props;

    dispatch({
      type: 'orders/passOne',
      payload: {
        id,
      },
    })
  }

  handleRefuseOne = id => (e) => {
    if (e) {
      e.preventDefault()
    }

    const { dispatch } = this.props;

    dispatch({
      type: 'orders/refuseOne',
      payload: {
        id,
      },
    })
  }

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        page: 1,
        pageSize: 15,
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'orders/fetch',
        payload: values,
      });
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      preLoading: true,
    });
    dispatch({
      type: 'orders/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  handleShowOne = (id) => e => {
    if (e) {
      e.preventDefault();
    }

    this.toggleProfileDrawer();

    this.props.dispatch({
      type: 'orders/fetchProfile',
      payload: {
        id,
      },
    });
  }

  componentWillUnmount() {
    this.setState({
      formValues: {},
    });
  }

  toggleProfileDrawer = () => {
    this.setState({
      profileVisible: !this.state.profileVisible,
    });
  }

  renderDetailsDrawer = () => {

    const { orders: { profile }, loadingProfile } = this.props;
    
    const title = (
      <div>
        <span style={{marginLeft: '14px' }}>订单详情</span>
      </div>
    );

    return (
      <Drawer 
        title={title}
        width={520}
        placement="right"
        onClose={this.toggleProfileDrawer}
        visible={this.state.profileVisible}
        style={{
          height: 'calc(100% - 65px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <Card bordered={false}>
          <Skeleton loading={loadingProfile}>
            <DescriptionList col={2} size="large" title="基本信息" style={{ marginBottom: 32 }}>
              <Description term="订单编号">{profile.apply_id_code}</Description>
              <Description term="订单状态">{config.OrderStatus[+profile.status]}</Description>
              <Description term="订单类型">{config.ProductType[+profile.product_type]}</Description>
              <Description term="商品名称">{profile.product_name}</Description>
              <Description term="用户编号">{profile.user_id}</Description>
              <Description term="用户名称">{profile.realname}</Description>
              {/* <Description term="已完成任务量">{+profile.finished_task_count}</Description>
              <Description term="已完成金额">{+profile.finished_task_price}</Description> */}
              <Description term="用户手机">{profile.mobile}</Description>
              <Description term="订单创建时间">{moment(profile.create_time).format("YYYY-MM-DD HH:mm:ss")}</Description>
              
            </DescriptionList>
          </Skeleton>
          <Divider style={{ marginBottom: 32 }} />
        </Card>

      </Drawer>
    )
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('order_no')(
                <Input placeholder="订单编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('product_name')(
                <Input placeholder="商品名称" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户编号">
              {getFieldDecorator('user_id')(<Input placeholder="用户编号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 0, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('status', {
                initialValue: null,
              })(
                <Select>
                  <Option value={null}>所有</Option>
                  <Option value={1}>审核中</Option>
                  <Option value={2}>已通过</Option>
                  <Option value={3}>已拒绝</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单类型">
              {getFieldDecorator('product_type', {
                initialValue: null,
              })(
                <Select>
                  <Option value={null}>全部</Option>
                  <Option value={1}>信用卡</Option>
                  <Option value={2}>贷款</Option>
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
    const {
      orders: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="订单列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              loading={loading}
              size="small"
              data={data}
              columns={this.columns}
              scroll={{ x: 1600 }}
              onChange={this.handleTableChange}
            />
          </div>
          {this.renderDetailsDrawer()}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderListView;
