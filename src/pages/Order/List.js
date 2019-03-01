/**
 * name: list
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input, Modal, Select, Divider, Tag, Drawer, Skeleton, DatePicker, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';
import config from '@/config';
import DescriptionList from '@/components/DescriptionList';

const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;



const UpdateForm = Form.create()(props => {
  const { 
    modalVisible, 
    form,
    handleSubmit, 
    data,
    loading,
    handleModalVisible } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 13 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const { getFieldDecorator, getFieldValue } = form;

  const okHandle = (e) => {
    if (typeof e !== 'undefined') {
      e.preventDefault();
    }
    
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // console.log(fieldsValue, 'values');
      form.resetFields();
      if (typeof handleSubmit === 'function') {
        handleSubmit(fieldsValue);
      }
    });
  };
  return (
    <Modal
      // wrapClassName="fullscreen-able"
      destroyOnClose
      title="编辑订单"
      centered
      visible={modalVisible}
      footer={null}
      // mask={false}
      // style={{height: '100vh'}}
      // width="100%"
      onCancel={() => handleModalVisible()}
    >
      <Skeleton
        active
        loading={loading}
        paragraph={{
          rows: 10,
        }}
      >
      <Form
        onSubmit={okHandle} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >

      {
        (data.product_type === 2 ) ? (
          <Form.Item {...formItemLayout} label="贷款额度">
            {getFieldDecorator('loan_money', {
              initialValue: data.loan_money,
              rules: [{ required: true, max: 100, message: '贷款额度' }],
            })(
              <Input placeholder="贷款额度" />
            )}
          </Form.Item>
        ) : null
      }

      {
        (data.product_type === 2 ) ? (
          <Form.Item {...formItemLayout} label="贷款期限">
            {getFieldDecorator('loan_expire', {
              initialValue: data.loan_expire,
              rules: [{ required: true, max: 100, message: '贷款期限' }],
            })(
              <Input placeholder="贷款期限" />
            )}
          </Form.Item>
        ) : null
      }

      {
        (data.product_type === 1) ? (
          <Form.Item {...formItemLayout} label="信用卡额度">
            {getFieldDecorator('card_money', {
              initialValue: data.card_money,
              rules: [{ required: true, max: 100, message: '信用卡额度' }],
            })(
              <Input placeholder="信用卡额度" />
            )}
          </Form.Item>
        ) : null
      }
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="form.submit" />
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
            <FormattedMessage id="form.cancel" />
          </Button>
        </FormItem>
      </Form>
      </Skeleton>
    </Modal>
  );
});


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
    updateVisible: false,
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
      title: '受益人编号',
      dataIndex: 'invite_code',
      width: 150,
      render: (val, record) => {
        return <span>{val || record.user_invite_code}</span>
      }
    },
    {
      title: '受益人名称',
      dataIndex: 'syr_realname',
      width: 150,
      render: (val, record) => {
        return (<span>{val || record.realname}</span>)
      }
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
      title: '受益人手机号',
      dataIndex: 'syr_register_mobile',
      // width: 150,
      render: (val, record) => {
        return (<span>{val || record.register_mobile}</span>)
      }
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      render: (val) => {
        return (<span>{moment(val).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '申请人编号',
      dataIndex: 'user_invite_code',
      render: (val) => {
        return (<span>{val || '--'}</span>);
      }
    },
    {
      title: '申请人姓名',
      dataIndex: 'realname',
      render: (val) => {
        return <span>{val || '--'}</span>
      }
    },
    {
      title: '申请人手机号',
      dataIndex: 'register_mobile',
      render: (val) => {
        return <span>{val}</span>;
      },
    },
    {
      title: '申请人身份证',
      dataIndex: 'sqr_id_no',
      render: (val) => {
        return <span>{val}</span>;
      },
    },
    {
      title: '支付人用户编号',
      dataIndex: 'pos_apply_invite_code',
    },
    {
      title: '支付流水号',
      dataIndex: 'pay_order_no',
    },
    {
      title: '支付金额',
      dataIndex: 'pay_price',
    },
    {
      title: '押金状态',
      dataIndex: 'deposit_status',
      render: val => {
        if (+val === 3) {
          return <span>已退还</span>;
        }

        return <span>未退还</span>;
      },
    },
    {
      title: '操作',
      width: 370,
      fixed: 'right',
      render: (text, record) => {
        const checkIsPassed = () => {

          if (+record.product_type === 3 && +record.deliver_status < 3) {
            return true;
          }

          if (+record.status > 1) {
            return true;
          } else if (+record.product_type === 3) {
            if (+record.deliver_status === 3 && +record.status > 1) {
              return true;
            }

            return false;
          }
        }

        const depositDisabled = () => {
          if (+record.status === 3) {
            return true;
          }

          if (+record.deposit_status === 3) {
            return true;
          }

          if (+record.deliver_status < 3) {
            return true;
          }

          return false;
        }

        // const checkIsUnPassed
        return (
        <Fragment>
          <a onClick={this.handleShowOne(record.id)}>查看</a>
          <Divider type="vertical" />
          <a onClick={this.prepareUpdate(record.id)}>编辑</a>
          <Divider type="vertical" />
          <a disabled={checkIsPassed()} onClick={this.handlePassOne(record)}>设为已通过</a>
          <Divider type="vertical" />
          <a disabled={checkIsPassed()} onClick={this.handleRefuseOne(record)} style={ checkIsPassed() ? null : { color: 'red'}} >设为未通过</a>
          {
            record.product_type === 3 ?
            (
              <>
                <Divider type="vertical" />
                <a disabled={depositDisabled()} onClick={this.handleReturnDeposit(record.pae_id)} style={ +record.status > 1 ? null : { color: 'red'}} >押金已退还</a>
              </>
            ) : null
          }
        </Fragment>
        );
      },
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

  toggleUpdateVisible = () => {
    this.setState({
      updateVisible: !this.state.updateVisible,
    });
  }

  handlePassOne = record => (e) => {
    const { id, product_type } = record;
    if (e) {
      e.preventDefault()
    }

    const { dispatch } = this.props;

    if (product_type === 3) {

      return this.props.dispatch({
        type: 'orders/passOne',
        payload: {
          id,
          loan_money: 0,
          loan_expire: '',
          card_money: 0,
        },
      });
    }

    Modal.confirm({
      title: '填写通过的资料',
      content: product_type === 2 ? (
        <>
        <Input placeholder="贷款额度" onChange={(e) => this.setState({loan_money: e.target.value})} />
        <br/>
        <Input placeholder="贷款期限" onChange={(e) => this.setState({loan_expire: e.target.value})} />
        </>
      ) : (<Input placeholder="信用卡办卡额度" onChange={(e) => this.setState({card_money: e.target.value})} />),
      okText: '确认',
      cancelText: '取消',
      // okButtonProps: {
      //   disabled: !this.state.currentMessage,
      // },
      onOk: () => {
        console.log(this.state, 'state');

        if (product_type === 2) {
          if (!this.state.loan_money || !this.state.loan_expire) {
            message.error('请填写通过详情');
            return Promise.reject('error');
          }
        } else {
          if (!this.state.card_money) {
            message.error('请填写通过详情');
            return Promise.reject('error');
          }
        }
      
        return this.props.dispatch({
          type: 'orders/passOne',
          payload: {
            id,
            loan_money: this.state.loan_money,
            loan_expire: this.state.loan_expire,
            card_money: this.state.card_money,
          },
        });
      },
    });

    // dispatch({
    //   type: 'orders/passOne',
    //   payload: {
    //     id,
    //   },
    // })
  }

  handleRefuseOne = record => (e) => {
    const { id, product_type } = record;
    if (e) {
      e.preventDefault()
    }
    const { dispatch } = this.props;

    if (product_type === 3) {
      Modal.confirm({
        title: '填写拒绝的理由',
        content: (<Input placeholder="拒绝理由" onChange={(e) => this.setState({reject_reason: e.target.value})} />),
        okText: '确认',
        cancelText: '取消',
        // okButtonProps: {
        //   disabled: !this.state.currentMessage,
        // },
        onOk: () => {
          
            if (!this.state.reject_reason) {
              message.error('请填写拒绝理由');
              return Promise.reject('error');
            }
        
          return this.props.dispatch({
            type: 'orders/refuseOne',
            payload: {
              id,
              reject_reason: this.state.reject_reason,
            },
          });
        },
      });

      return;
    }

    dispatch({
      type: 'orders/refuseOne',
      payload: {
        id,
      },
    })
  }

  handleReturnDeposit = id => (e) => {
    if (e) {
      e.preventDefault()
    }

    const { dispatch } = this.props;

    dispatch({
      type: 'orders/returnDeposit',
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

      if (values.filter_time && values.filter_time.length > 0) {
        values.start_time = values.filter_time[0].format('YYYY-MM-DD HH:mm:ss');
        values.end_time = values.filter_time[1].format('YYYY-MM-DD HH:mm:ss');
        delete values.filter_time;
      }

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

  prepareUpdate = (id) => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({
      updateID: id,
    });
    this.toggleUpdateVisible();

    dispatch({
      type: 'orders/fetchProfile',
      payload: {
        id,
      },
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    // console.log(values, '=====');
    dispatch({
      type: 'orders/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateVisible();
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
              <Description term="订单编号">{profile.apply_id_code || '--'}</Description>
              <Description term="订单状态">{config.OrderStatus[+profile.status] || '--'}</Description>
              <Description term="订单类型">{config.ProductType[+profile.product_type] || '--'}</Description>
              <Description term="商品名称">{profile.product_name || '--'}</Description>
              <Description term="受益人编号">{profile.invite_code || profile.user_invite_code}</Description>
              <Description term="受益人名称">{profile.syr_realname || profile.realname}</Description>
              {
                profile.product_type === 2 ? (
                  <Description term="实际贷款额度">{profile.loan_money || '--'}</Description>
                ) : null
              }

              {
                profile.product_type === 2 ? (
                  <Description term="贷款期限">{profile.loan_expire || '--'}</Description>
                ) : null
              }        
              {
                profile.product_type === 1 ? (
                  <Description term="信用卡放卡额度">{profile.card_money || '--'}</Description>
                ) : null
              }      
              
              
              {/* <Description term="已完成任务量">{+profile.finished_task_count}</Description>
              <Description term="已完成金额">{+profile.finished_task_price}</Description> */}
              <Description term="用户手机">{profile.mobile || '--'}</Description>
              <Description term="订单创建时间">{moment(profile.create_time).utc().zone(-8).format("YYYY-MM-DD HH:mm:ss") || '--'}</Description>
              
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
              {getFieldDecorator('invite_code')(<Input placeholder="用户编号" />)}
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
                  <Option value={3}>POS机</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="时间查询">
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
        <Row gutter={{ md: 0, lg: 24, xl: 48}}>
          <Col md={8} sm={24}></Col>
          <Col md={8} sm={24}></Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }} className={styles.submitButtons}>
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
      orders: { data, profile = {} },
      loading,
      loadingProfile,
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
              scroll={{ x: 2500 }}
              onChange={this.handleTableChange}
            />
          </div>
          {this.renderDetailsDrawer()}
          <UpdateForm
            modalVisible={this.state.updateVisible}
            handleModalVisible={this.toggleUpdateVisible}
            handleSubmit={this.handleUpdate}
            loading={loadingProfile}
            data={profile ? profile : {}}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderListView;
