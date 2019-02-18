/**
 * name: apply
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input, Modal, Select, Divider, Tag, Drawer, Skeleton, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';
import config from '@/config';
import DescriptionList from '@/components/DescriptionList';

const { Option } = Select;
const FormItem = Form.Item;
const { Description } = DescriptionList;


// 发货的表单
const ShipForm = Form.create()(props => {
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
      title="发货"
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

        <Form.Item {...formItemLayout} label="POS机机具编号">
          {getFieldDecorator('pos_no', {
            initialValue: data.pos_no,
            rules: [{ required: true, max: 100, message: '请填写POS机机具编号' }],
          })(
            <Input placeholder="POS机机具编号" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="快递名称">
          {getFieldDecorator('express_name', {
            initialValue: data.express_name,
            rules: [{ required: true, max: 100, message: '请填写快递名称' }],
          })(
            <Input placeholder="快递名称" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="快递编号">
          {getFieldDecorator('express_no', {
            initialValue: data.express_no,
            rules: [{ required: true, max: 100, message: '请填写快递编号' }],
          })(
            <Input placeholder="快递编号" />
          )}
        </Form.Item>
      
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

@connect(({applys, loading }) => ({
  applys,
  loading: loading.models.applys,
  loadingProfile: loading.effects['applys/fetchProfile'],
}))
@Form.create()
class ApplyView extends PureComponent {

  state = {
    paeID: 0,
    shipVisible: false,
    productID: 0,
    productType: 0,
    preLoading: false,
    formValues: {},
    profileFormValues: {},
    profileVisible: false,
  }

  originColumns = [
    {
      title: '产品名称',
      dataIndex: 'product_name',
      // width: 150,
    },
    {
      title: '申请总数',
      dataIndex: 'total',
      // width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'modify_time',
      render: (val) => {
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
      },
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.handleShowProfile(record.id, record.product_type)}>查看详情</a>
        </Fragment>
      ),
    },
  ]

  originCardProfileColumns = [
    {
      title: '订单编号',
      dataIndex: 'apply_id_code',
      width: 170,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      width: 150,
      render: val => {
        return <span>{config.OrderStatus[val]}</span>
      }
    },
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 170,
      render: (val, record) => {
        return <span>{val || record.user_invite_code}</span>
      }
    },
    {
      title: '申请人姓名',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '申请人手机号',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '申请人身份证号码',
      dataIndex: 'id_no',
      width: 200,
    },
    {
      title: '提交卡种',
      dataIndex: 'unknown',
      key: 'cark_kind',
      width: 150,
    },
    {
      title: '提交时间',
      dataIndex: 'unknown',
      key: 'card_time',
      width: 200,
      render: (val) => {
        if (!val) {
          return '-';
        }
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '申请卡种',
      dataIndex: 'unknown',
      key: 'accept_cark_kind',
      width: 150,
      
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      width: 200,
      render: (val) => {
        if (!val) {
          return '-';
        }
        return (<span>{moment(val).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '修改时间',
      dataIndex: 'modify_time',
      width: 200,
      render: (val) => {
        if (!val) {
          return '-';
        }
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '官方申请状态',
      dataIndex: 'official_status',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ApplyOfficalStatus[+val]}</Tag>)
      }
    },
    {
      title: '系统最新查询时间',
      dataIndex: 'last_official_query',
      width: 200,
      render: (val) => {
        if (!val) {
          return '-';
        }
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },
    {
      title: '系统定义申请状态',
      dataIndex: 'status',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ApplyStatus[+val]}</Tag>)
      }
    },
    {
      title: '未通过理由',
      dataIndex: 'reject_reason',
      width: 150,
    },
    // {
    //   title: '工资状态',
    //   dataIndex: 'salary_status',
    //   width: 150,
    // },
    {
      title: '所属代理用户编号',
      dataIndex: 'user_recommend_invite_code',
    },
  ]

  get originProfileColumns() {
    let originProfileColumns = [];
    
    if (+this.state.productType === 3) {
      originProfileColumns = [
        {
          title: '订单编号',
          dataIndex: 'apply_id_code',
          width: 170,
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          width: 150,
          render: val => {
            return <span>{config.OrderStatus[val]}</span>
          }
        },
        {
          title: '是否有邀请人',
          key: 'has_invite_user',
          width: 100,
          render: (val, record) => {
            if (record.user_recommend_invite_code) {
              return <span>是</span>
            }

            return <span>否</span>
            // return (<span>{+val === 1 ? '是' : '否'}</span>);
          }
        },
        {
          title: '邀请人用户编号',
          dataIndex: 'user_recommend_invite_code',
          width: 170,
          render: (val) => {
            return (<span>{val || '--'}</span>);
          }
        },
        {
          title: '是否本平台用户',
          key: 'is_platform_user',
          width: 100,
          render: (val, record) => {
            if (record.user_invite_code) {
              return <span>是</span>;
            }

            return <span>否</span>;
          }
        },
        {
          title: '申请人用户编号',
          dataIndex: 'user_invite_code',
          width: 170,
        },
        {
          title: '申请人姓名',
          dataIndex: 'name',
          width: 150,
        },
        {
          title: '申请人手机号',
          dataIndex: 'mobile',
          width: 150,
        },
        {
          title: '商品状态',
          dataIndex: 'deliver_status',
          width: 150,
          render: val => {
            return <span>{config.DeliverStatus[+val] || '--'}</span>
          }
        },
        {
          title: '支付流水号',
          dataIndex: 'pay_no',
          width: 150,
        },
        {
          title: '实付金额',
          dataIndex: 'paid_amount',
          width: 150,
        },
        {
          title: '收件人姓名',
          dataIndex: 'recipient_name',
          width: 150,
        },
        {
          title: '收件人手机号',
          dataIndex: 'recipient_phone',
          width: 150,
        },
        {
          title: '收件人地址',
          dataIndex: 'recipient_address',
          width: 150,
          render: (val, record) => {
            return <span>{`${record.region} - ${val}`}</span>
          }
        },
        {
          title: '申请人支付宝账号',
          dataIndex: 'alipay_no',
          width: 150,
        },
        {
          title: 'POS机机具编号',
          dataIndex: 'pos_no',
          width: 150,
        },
        {
          title: '快递名称',
          dataIndex: 'express_delivery_name',
          width: 150,
        },
        {
          title: '快递单号',
          dataIndex: 'express_delivery_no',
          width: 150,
        },
        {
          title: '押金状态',
          dataIndex: 'deposit_state',
          width: 150,
          render: val => {
            return <span>{config.ApplyDepositState[+val] || '--'}</span>
          }
        },
        {
          title: '申请支付时间',
          dataIndex: 'paid_time',
          width: 150,
          render: val => {
            if (!val) {
              return <span>--</span>;
            }

            return (<span>{moment(val).utc(-8).format('YYYY-MM-DD HH:mm:ss')}</span>)
          }
        },
        {
          title: '操作',
          width: 200,
          fixed: 'right',
          render: (text, record) => (
            <Fragment>
              <a disabled={+record.deliver_status > 1} onClick={this.handleShipOne(record.pae_id)}>发货</a>
              <Divider type="vertical" />
              <a disabled={+record.deliver_status !== 2} onClick={this.handleSigning(record.pae_id)}>商品已签收</a>
            </Fragment>
          ),
        }
      ]
    } else {
      originProfileColumns = [
        {
          title: '订单编号',
          dataIndex: 'apply_id_code',
          width: 170,
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          width: 150,
          render: val => {
            return <span>{config.OrderStatus[val]}</span>
          }
        },
        {
          title: '用户编号',
          dataIndex: 'user_invite_code',
          width: 170,
        },
        {
          title: '申请人姓名',
          dataIndex: 'name',
          width: 150,
        },
        {
          title: '申请人手机号',
          dataIndex: 'mobile',
          width: 150,
        },
        {
          title: '申请人身份证号码',
          dataIndex: 'id_no',
          width: 200,
        },
        {
          title: '注册时间',
          dataIndex: 'user_register_time',
          width: 200,
          render: (val) => {
            if (!val) {
              return '-';
            }
            return (<span>{moment(val).utc(-8).format('YYYY-MM-DD HH:mm:ss')}</span>)
          }
        },
        {
          title: '放款时间',
          dataIndex: 'official_time',
          key: 'send_time',
          width: 200,
          render: (val) => {
            if (!val) {
              return '-';
            }
            return (<span>{moment(val).utc(-8).format('YYYY-MM-DD HH:mm:ss')}</span>)
          }
        },
        {
          title: '放款金额',
          dataIndex: 'official_limit',
          key: 'send_price',
          width: 200,
          render: (val) => {
            if (!val) {
              return '-';
            }
            return <span>{val}</span>
            // return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
          }
          
        },
        {
          title: '放款期限',
          dataIndex: 'official_expire',
          key: 'send_expires',
          width: 150,
        },
        {
          title: '所属代理用户编号',
          dataIndex: 'user_recommend_invite_code',
        },
      ];
    }


    return originProfileColumns;
  }

  get cardProfileColumns() {
    return this.originCardProfileColumns.map((val) => {
      if (!val.render) {
        val.render = (txt) => {
          return (<span>{txt || '--'}</span>)
        }
      }

      return val;
    })
  }

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

  get profileColumns() {
    return this.originProfileColumns.map(val => {
      if (!val.render) {
        val.render = (txt) => {
          return (<span>{txt || '--'}</span>)
        }
      }

      return val;
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...this.state.formValues,
    };

    dispatch({
      type: 'applys/fetch',
      payload: params,
    });
  }

  handleProfileTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      id: this.state.productID,
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...this.state.profileFormValues,
    };

    dispatch({
      type: 'applys/fetchProfile',
      payload: params,
    });
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
        type: 'applys/fetch',
        payload: values,
      });
    });
  }

  handleProfileSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        id: this.state.productID,
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
        profileFormValues: values,
      });

      dispatch({
        type: 'applys/fetchProfile',
        payload: values,
      });
    });
  }

  handleShowProfile = (id, productType) => e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      productID: id,
      productType,
    });

    this.toggleProfileDrawer();
    let isPos = false;

    if (+productType === 3) {
      isPos = true;
    }

    this.props.dispatch({
      type: 'applys/fetchProfile',
      payload: {
        id,
        page: 1,
        pageSize: 15,
        isPos,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      preLoading: true,
    });
    dispatch({
      type: 'applys/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      formValues: {},
    });
  }

  handleShipOne = (id) => (e) => {
    e.preventDefault();
    console.log(`======${id}=======`);
    this.setState({
      paeID: id,
    });

    this.toggleShipVisible();
  }

  toggleProfileDrawer = () => {
    this.setState({
      profileVisible: !this.state.profileVisible,
    });
  }

  toggleShipVisible = () => {
    this.setState({
      shipVisible: !this.state.shipVisible,
    });
  }

  handleShip = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.paeID;
    // console.log(values, '=====');
    dispatch({
      type: 'applys/shipPos',
      payload: values,
    }).then(() => {
      this.toggleShipVisible();
    });
  }

  handleSigning = (id) => () => {
    const { dispatch } = this.props;
    let values = {
      id,
    }

    dispatch({
      type: 'applys/signingPos',
      payload: values,
    });
  } 

  renderDetailsDrawer = () => {

    const { applys: { profile = {} }, loadingProfile } = this.props;
    // const { data = [] } = profile
    const title = (
      <div>
        <span style={{marginLeft: '14px' }}>申请详情</span>
      </div>
    );
    
    let cols = this.profileColumns;
    let pixX = 1850;
    if (+profile.productType === 1) {
      cols = this.cardProfileColumns;
      pixX = 2600;
    }

    if (profile.productType === 3) {
      pixX = 2650;
    }
    
    return (
      <Drawer 
        title={title}
        width={this.state.productType === 3 ? 720 : 920}
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
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderProfileQueryForm()}</div>
            <StandardTable
              loading={loadingProfile}
              size="small"
              data={profile}
              columns={cols}
              scroll={{ x: pixX }}
              onChange={this.handleProfileTableChange}
            />
          </div>
        </Card>

      </Drawer>
    )
  }

  renderProfileQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleProfileSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('user_invite_code')(
                <Input placeholder="用户编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('user_mobile')(
                <Input placeholder="用户手机号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('user_recommend_invite_code')(
                <Input placeholder="代理用户编号" />
              )}
            </FormItem>
          </Col>
          
        </Row>
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem>
              {getFieldDecorator('user_id_no')(
                <Input placeholder="身份证号" />
              )}
            </FormItem>
          </Col>

          <Col md={16} sm={24}>
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
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24} />
          <Col md={8} sm={24} />
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

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="产品名称">
              {getFieldDecorator('product_name')(
                <Input placeholder="产品名称" />
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
      applys: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="产品申请列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              loading={loading}
              size="small"
              data={data}
              columns={this.columns}
              onChange={this.handleTableChange}
            />
          </div>
          {this.renderDetailsDrawer()}
          <ShipForm 
            modalVisible={this.state.shipVisible}
            handleModalVisible={this.toggleShipVisible}
            handleSubmit={this.handleShip}
            data={{}}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ApplyView;
