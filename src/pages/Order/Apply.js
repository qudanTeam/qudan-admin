/**
 * name: 产品申请列表
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

@connect(({applys, loading }) => ({
  applys,
  loading: loading.models.applys,
  loadingProfile: loading.effects['applys/fetchProfile'],
}))
@Form.create()
class ApplyView extends PureComponent {

  state = {
    productID: 0,
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
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.handleShowProfile(record.id)}>查看详情</a>
        </Fragment>
      ),
    },
  ]

  originCardProfileColumns = [
    {
      title: '用户编号',
      dataIndex: 'user_invite_code',
      width: 170,
    },
    {
      title: '姓名',
      dataIndex: 'user_realname',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'user_mobile',
      width: 150,
    },
    {
      title: '身份证号码',
      dataIndex: 'user_id_no',
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
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
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

  originProfileColumns = [
    {
      title: '用户编号',
      dataIndex: 'user_invite_code',
      width: 170,
    },
    {
      title: '姓名',
      dataIndex: 'user_realname',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'user_mobile',
      width: 150,
    },
    {
      title: '身份证号码',
      dataIndex: 'user_id_no',
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
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
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
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
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
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)
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
  ]

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
      this.setState({
        profileFormValues: values,
      });

      dispatch({
        type: 'applys/fetchProfile',
        payload: values,
      });
    });
  }

  handleShowProfile = (id) => e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      productID: id,
    });
    this.toggleProfileDrawer();

    this.props.dispatch({
      type: 'applys/fetchProfile',
      payload: {
        id,
        page: 1,
        pageSize: 15,
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

  toggleProfileDrawer = () => {
    this.setState({
      profileVisible: !this.state.profileVisible,
    });
  }

  renderDetailsDrawer = () => {

    const { applys: { profile = {} }, loadingProfile } = this.props;
    // const { data = [] } = profile
    const title = (
      <div>
        <span style={{marginLeft: '14px' }}>订单详情</span>
      </div>
    );
    
    let cols = this.profileColumns;
    let pixX = 1650;
    if (+profile.productType === 1) {
      cols = this.cardProfileColumns;
      pixX = 2400;
    }
    
    return (
      <Drawer 
        title={title}
        width={720}
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
            <FormItem label="用户编号">
              {getFieldDecorator('user_invite_code')(
                <Input placeholder="用户编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户手机号">
              {getFieldDecorator('user_mobile')(
                <Input placeholder="用户手机号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="代理用户编号">
              {getFieldDecorator('user_recommend_invite_code')(
                <Input placeholder="代理用户编号" />
              )}
            </FormItem>
          </Col>
          
        </Row>
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={16} sm={24}>
            <FormItem label="用户身份证号">
              {getFieldDecorator('user_id_no')(
                <Input placeholder="身份证号" />
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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ApplyView;
