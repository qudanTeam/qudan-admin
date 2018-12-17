/**
 * name: 用户列表
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Users.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import DescriptionList from '@/components/DescriptionList';
import config from './_config';
import moment from 'moment';
import sysConfig from '@/config';

import { 
  Avatar, 
  Card, 
  Button, 
  Divider, 
  Form, 
  Row, 
  Col, 
  Icon, 
  Input, 
  Select, 
  Skeleton,
  Drawer,
} from 'antd';
import { connect } from 'dva';

const { UserType } = config;
const FormItem = Form.Item;
const Option = Select.Option;
const { Description } = DescriptionList;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ users, loading}) => ({
  users,
  loading: loading.models.users,
  loadingProfile: loading.effects['users/fetchProfile'],
}))
@Form.create()
class UsersView extends PureComponent {

  state = {
    expandForm: false,
    preLoading: false,
    profileVisible: false,
    realNameAuthVisible: false,
    createFormVisible: false,
  }

  /**
   * Table columns config
   */
  columns = [
    {
      title: '头像',
      dataIndex: 'userface',
      width: 75,
      fixed: 'left',
      render: (val) => {
        return <Avatar src={`${sysConfig.qiniu.host}/${val}`} />
      }
    },
    {
      title: '用户编号',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'register_mobile',
      width: 150,
    },
    {
      title: '微信号',
      dataIndex: 'wechat_name',
      width: 150,
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      width: 150,
    },
    {
      title: '用户类型',
      dataIndex: 'user_type',
      width: 150,
      // filters: [
      //   {
      //     text: UserType[0],
      //     value: 0,
      //   },
      //   {
      //     text: UserType[1],
      //     value: 1,
      //   },
      //   {
      //     text: UserType[2],
      //     value: 2,
      //   },
      //   {
      //     text: UserType[3],
      //     value: 3,
      //   },
      //   {
      //     text: UserType[4],
      //     value: 4,
      //   },
      // ],
      render(val) {
        return <span>{UserType[val]}</span>;
      },
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      width: 150,
    },
    {
      title: '身份证号码',
      dataIndex: 'id_no',
      width: 150,
    },
    {
      title: '支付宝账户',
      dataIndex: 'alipay_no',
      width: 150,
    },
    // {
    //   title: '实名认证资料',
    //   children: [
    //     {
    //       title: '真实姓名',
    //       dataIndex: 'realName',
    //     },
    //     {
    //       title: '身份证号码',
    //       dataIndex: 'idCardNO',
    //     },
    //     {
    //       title: '支付宝账户',
    //       dataIndex: 'alipayAccount',
    //     },
    //   ]
    // },
    {
      title: 'VIP等级',
      dataIndex: 'vipname',
      width: 150,
    },
    {
      title: '推荐人',
      dataIndex: 'recommend_username',
      width: 150,
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: 200,
      render: (val) => {
        return (<span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>)
      },
    },
    {
      title: '最近登录时间',
      dataIndex: 'last_login_time',
      width: 200,
      render: (val) => {
        return (<span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>)
      },
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.showProfile(record.id)}>查看</a>
          <Divider type="vertical" />
          <a onClick={this.toggleRealNameAuthDrawer} >实名审核</a>
          <Divider type="vertical" />
          <a href="">编辑</a>
        </Fragment>
      ),
    },
  ];

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    console.log('search');
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

      dispatch({
        type: 'users/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'users/fetch',
      payload: {},
    });
  };

  toggleCreateForm = () => {
    const { createFormVisible } = this.state;

    this.setState({
      createFormVisible: !createFormVisible,
    });
  }

  toggleProfileDrawer = () => {
    
    const { profileVisible } = this.state;

    this.setState({
      profileVisible: !profileVisible,
    });
  }

  toggleRealNameAuthDrawer = () => {
    const { realNameAuthVisible } = this.state;

    this.setState({
      realNameAuthVisible: !realNameAuthVisible,
    });
  }

  showProfile = (id) => (e) => {
    e.preventDefault();
    this.toggleProfileDrawer();
    const { dispatch } = this.props;

    dispatch({
      type: 'users/fetchProfile',
      payload: {
        id,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'users/fetch',
      payload: params,
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      preLoading: true,
    });
    dispatch({
      type: 'users/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户编号">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('register_mobile')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户编号">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('register_mobile')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号码">
              {getFieldDecorator('id_no')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="真实姓名">
              {getFieldDecorator('username')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="支付宝账号">
              {getFieldDecorator('alipay_no')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  /**
   * 个人信息
   */
  renderProfileDrawer = () => {

    const { users: { profile }, loadingProfile } = this.props;
    const { basicInfo, vipInfo = {} } = profile;

    const titleText = basicInfo.realname || basicInfo.wechat_name || basicInfo.username || basicInfo.register_mobile;

    const title = (
      <div>
        <Avatar src={`${sysConfig.qiniu.host}/${basicInfo.userface}`} />
        <span style={{marginLeft: '14px' }}>{`“${titleText}” 的个人信息`}</span>
      </div>
    );

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
          <Skeleton loading={loadingProfile}>
            <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
              <Description term="用户编号">{basicInfo.id}</Description>
              <Description term="手机号">{basicInfo.register_mobile}</Description>
              <Description term="微信号">{basicInfo.wechat_name}</Description>
              <Description term="余额">{basicInfo.balance}</Description>
              <Description term="用户类型">{UserType[basicInfo.user_type]}</Description>
              <Description term="推荐人编号">{basicInfo.recommend_invite_code}</Description>
            </DescriptionList>
          </Skeleton>
          <Divider style={{ marginBottom: 32 }} />
          <Skeleton loading={loadingProfile}>
            <DescriptionList size="large" title="VIP资料" style={{ marginBottom: 32 }}>
              <Description term="VIP类型">{vipInfo.vip_name}</Description>
              <Description term="开通时间">{moment(vipInfo.start_time).format("YYYY年MM月DD日")}</Description>
              <Description term="结束时间">{moment(vipInfo.end_time).format("YYYY年MM月DD日")}</Description>
              <Description term="已支付金额">{vipInfo.trade_price}</Description>
              <Description term="订单号">{vipInfo.trade_id}</Description>
              <Description term="加成金额">{vipInfo.addRate}</Description>
              <Description term="加成总金额">{vipInfo.total_vip_price}</Description>
            </DescriptionList>
          </Skeleton>
          <Divider style={{ marginBottom: 32 }} />
        </Card>

      </Drawer>
    )
  }

  /**
   * 实名认证
   */
  renderRealNameAuth = () => {
    return (
      <Drawer 
        title={'实名认证'}
        width={520}
        placement="right"
        // maskClosable={false}
        closable={false}
        onClose={this.toggleRealNameAuthDrawer}
        visible={this.state.realNameAuthVisible}
        style={{
          height: 'calc(100% - 65px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              不通过
            </Button>
            <Button onClick={this.onClose} type="primary">通过</Button>
          </div>
      </Drawer>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      users: { data },
      loading,
    } = this.props;
    
    return (
      <PageHeaderWrapper title="用户列表" loading={this.state.preLoading}>
        <Skeleton active loading={this.state.preLoading}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              loading={loading}
              size="small"
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1990 }}
            />
          </div>
        </Card>
        </Skeleton>
        {this.renderProfileDrawer()}
        {this.renderRealNameAuth()}
        
      </PageHeaderWrapper>
    );
  }
}

export default UsersView;