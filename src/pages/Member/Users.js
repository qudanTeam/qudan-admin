/**
 * name: list
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Users.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import DescriptionList from '@/components/DescriptionList';
import config from './_config';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
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
  Dropdown,
  Menu,
  Tag,
  Modal,
} from 'antd';
import { connect } from 'dva';
import { findUserType, isRealnameAuth, isFinanceAuth } from '@/utils/helpers';

const { UserType, VipLevel } = config;
const FormItem = Form.Item;
const Option = Select.Option;
const { Description } = DescriptionList;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


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
      title="编辑用户"
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
        <Form.Item {...formItemLayout} label="手机号">
          {getFieldDecorator('register_mobile', {
            initialValue: data.register_mobile,
            rules: [{ required: true, max: 100, message: '请填写手机号' }],
          })(
            <Input placeholder="手机号" />
          )}
        </Form.Item>

        {/* <Form.Item {...formItemLayout} label="账户余额">
          {getFieldDecorator('balance', {
            initialValue: data.balance,
            rules: [{ required: true, max: 100, message: '请填写账户余额' }],
          })(
            <Input placeholder="账户余额" />
          )}
        </Form.Item> */}

        <Form.Item {...formItemLayout} label="真实姓名">
          {getFieldDecorator('realname', {
            initialValue: data.realname,
            rules: [{ required: true, max: 100, message: '请填写真实姓名' }],
          })(
            <Input placeholder="真实姓名" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="身份证号码">
          {getFieldDecorator('id_no', {
            initialValue: data.id_no,
            rules: [{ required: true, max: 100, message: '请填写身份证号码' }],
          })(
            <Input placeholder="身份证号码" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="支付宝账户">
          {getFieldDecorator('alipay_no', {
            initialValue: data.alipay_no,
            rules: [{ required: true, max: 100, message: '请填写支付宝账户' }],
          })(
            <Input placeholder="支付宝账户" />
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



@connect(({ users, loading}) => ({
  users,
  loading: loading.models.users,
  loadingProfile: loading.effects['users/fetchProfile'],
  loadingChilds: loading.effects['users/fetchChilds'],
}))
@Form.create()
class UsersView extends PureComponent {

  state = {
    updateID: '',
    parentUserID: null,
    expandForm: false,
    preLoading: false,
    profileVisible: false,
    realNameAuthVisible: false,
    createFormVisible: false,
    updateVisible: false,
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
        // return <Avatar src={`${sysConfig.qiniu.host}/${val}`} />
        return <Avatar src={`${val}`} />;
      }
    },
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 150,
      render: (val) => {
        return (<span>{val || '--'}</span>)
      }
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
      render(val, record) {
        let color = 'magenta';
        // const utype = +val;
        if (+record.status === 3) {
          val = 4; // 实名认证
          color = 'gold';
        }

        if (+record.finance_status === 3) {
          val = 5; // 财务认证
          color = 'cyan';
        }

        return <Tag color={color}>{UserType[val]}</Tag>;
      },
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      width: 150,
      render: (val, record) => {
        return (<span>{isRealnameAuth(record) ? val : '--'}</span>);
      }
    },
    {
      title: '身份证号码',
      dataIndex: 'id_no',
      width: 150,
      render: (val, record) => {
        return (<span>{isRealnameAuth(record) ? val : '--'}</span>);
      }
    },
    {
      title: '支付宝账户',
      dataIndex: 'alipay_no',
      width: 150,
      render: (val, record) => {
        return (<span>{isFinanceAuth(record) ? val : '--'}</span>);
      }
    },
    {
      title: 'VIP等级',
      dataIndex: 'vip_level',
      width: 150,
      render: (val) => {
        return (<span>{VipLevel[+val]}</span>)
      },
    },
    {
      title: '推荐人',
      dataIndex: 'recommend_invite_code',
      width: 150,
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: 200,
      render: (val) => {
        return (<span>{moment(val).utc().zone(+8).format("YYYY-MM-DD HH:mm:ss")}</span>)
      },
    },
    {
      title: '最近登录时间',
      dataIndex: 'last_login_time',
      // width: 200,
      render: (val) => {
        return (<span>{moment(val).utc().zone(+8).format("YYYY-MM-DD HH:mm:ss")}</span>)
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
          <a style={{ color: (!!record.alipay_no ? '#13c2c2' : '#1cae6e')}} onClick={this.showRealnameAuth(record.id)} >
          <Tag color={!!record.realname ? "#faad14" : "#52c41a"} style={{ width: '10px', height: '10px', padding: 0}}></Tag>
          实名审核
          </a>
          <Divider type="vertical" />
          <a onClick={this.prepareUpdate(record.id)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  /**
   * 
   */
  agentsColumns = [
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      width: 150,
    },
    {
      title: '下级类型',
      width: 150,
      key: "child_type",
      dataIndex: 'user_id',
      render: (_, record) => {
        const { parent_user_id } = record;

        console.log(this.state.parentUserID, '=======');
        console.log(parent_user_id, '====++++===');

        if (+this.state.parentUserID === +parent_user_id) {
          return (
            <span>直接下级</span>
          )
        }

        return (
          <span>间接下级</span>
        );
      }
    },
    {
      title: '用户姓名',
      dataIndex: 'realname',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'register_mobile',
      width: 150,
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: 200,
      render: (val) => {
        return (<span>{moment(val).utc().zone(+8).format("YYYY-MM-DD HH:mm:ss")}</span>)
      },
    }
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

  toggleUpdateVisible = () => {
    const { updateVisible } = this.state; 

    this.setState({
      updateVisible: !updateVisible,
    });
  }

  toggleRealNameAuthDrawer = () => {
    const { realNameAuthVisible } = this.state;

    this.setState({
      realNameAuthVisible: !realNameAuthVisible,
    });
  }

  handleChildTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      pid: this.state.parentUserID,
      page: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'users/fetchChilds',
      payload: params,
    });
  }

  showProfile = (id) => (e) => {
    e.preventDefault();
    this.toggleProfileDrawer();

    this.setState({
      parentUserID: id,
    });

    const { dispatch } = this.props;

    dispatch({
      type: 'users/fetchChilds',
      payload: {
        pid: id,
        page: 1,
        pageSize: 15,
      },
    });

    dispatch({
      type: 'users/fetchProfile',
      payload: {
        id,
      },
    });

    
  }

  showRealnameAuth = (id) => (e) => {
    e.preventDefault();
    this.toggleRealNameAuthDrawer();
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetchProfile',
      payload: {
        id,
      },
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

  handlePassRealnameAuth = (id) => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'users/passRealnameAuth',
      payload: {
        id,
      },
    });
    this.toggleRealNameAuthDrawer();
  }

  handleRefuseRealnameAuth = (id) => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'users/refuseRealnameAuth',
      payload: {
        id,
      },
    });

    this.toggleRealNameAuthDrawer();
  }

  handlePassFinanceAuth = (id) => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'users/passFinanceAuth',
      payload: {
        id,
      },
    });
    this.toggleRealNameAuthDrawer();
  }

  handleRefuseFinanceAuth = (id) => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'users/refuseFinanceAuth',
      payload: {
        id,
      },
    });
    this.toggleRealNameAuthDrawer();
  }

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
              {getFieldDecorator('invite_code')(<Input placeholder="请输入" />)}
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
              {getFieldDecorator('invite_code')(<Input placeholder="请输入" />)}
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
              {getFieldDecorator('realname')(<Input placeholder="请输入"/>)}
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

    const { users: { profile, childs }, loadingProfile, loadingChilds } = this.props;
    const { basicInfo, vipInfo = {} } = profile;

    const titleText = basicInfo.realname || basicInfo.wechat_name || basicInfo.username || basicInfo.register_mobile;

    const title = (
      <div>
        <Avatar src={`${basicInfo.userface}`} />
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
              <Description term="用户编号">{basicInfo.invite_code || '--'}</Description>
              <Description term="手机号">{basicInfo.register_mobile || '--'}</Description>
              <Description term="微信号">{basicInfo.wechat_name || '--'}</Description>
              <Description term="余额">{basicInfo.balance || '--'}</Description>
              <Description term="用户类型">{UserType[findUserType(basicInfo)] || '--'}</Description>
              <Description term="推荐人编号">{basicInfo.recommend_invite_code || '--'}</Description>
            </DescriptionList>
          </Skeleton>
          <Divider style={{ marginBottom: 32 }} />
          <Skeleton loading={loadingProfile}>
          {
            vipInfo.vip_level ? (
              <DescriptionList size="large" title="VIP资料" style={{ marginBottom: 32 }}>
                <Description term="VIP类型">{VipLevel[vipInfo.vip_level]}</Description>
                <Description term="开通时间">{moment(vipInfo.start_time).utc().zone(+8).format("YYYY年MM月DD日")}</Description>
                <Description term="结束时间">{moment(vipInfo.end_time).utc().zone(+8).format("YYYY年MM月DD日")}</Description>
                <Description term="已支付金额">{vipInfo.trade_price}</Description>
                <Description term="订单号">{vipInfo.trade_id}</Description>
                <Description term="加成金额">{vipInfo.addRate}</Description>
                <Description term="加成总金额">{vipInfo.total_vip_price}</Description>
              </DescriptionList>
            ) : null
          }
            
          </Skeleton>
          {
            vipInfo.vip_level ? (
              <Divider style={{ marginBottom: 32 }} />
            ) : null
          }

          <Skeleton loading={loadingChilds}>
            <StandardTable
              size="small"
              data={childs}
              loading={loadingChilds}
              columns={this.agentsColumns}
              onChange={this.handleChildTableChange}
            />
          </Skeleton>
        </Card>

      </Drawer>
    )
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    console.log(values, '=====');
    dispatch({
      type: 'users/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateVisible();
    });
  }

  /**
   * 实名认证
   */
  renderRealNameAuth = () => {
    const { users: { profile }, loadingProfile } = this.props;
    const { basicInfo, vipInfo = {} } = profile;

    const isRealnameAuth = (info) => {
      return !!info.realname && !!info.id_no && !isRealnameAuthed(info);
    }

    const isFinanceAuth = (info) => {
      return !!info.alipay_no && !isFinanceAuthed(info);
    }

    const isRealnameAuthed = (info) => {
      return +info.status === 3;
    }

    const isFinanceAuthed = (info) => {
      return +info.finance_status === 3;
    }

    const refuseMenu = (
      <Menu>
        <Menu.Item disabled={!isRealnameAuth(basicInfo)}>
          <a onClick={this.handleRefuseRealnameAuth(basicInfo.id || 0)} disabled={!isRealnameAuth(basicInfo)}>实名认证</a>
        </Menu.Item>
        <Menu.Item disabled={!isFinanceAuth(basicInfo)}>
          <a onClick={this.handleRefuseFinanceAuth(basicInfo.id || 0)} disabled={!isFinanceAuth(basicInfo)}>财务认证</a>
        </Menu.Item>
      </Menu>
    );

    const passMenu = (
      <Menu>
        <Menu.Item disabled={!isRealnameAuth(basicInfo)}>
          <a onClick={this.handlePassRealnameAuth(basicInfo.id || 0)} disabled={!isRealnameAuth(basicInfo)}>实名认证</a>
        </Menu.Item>
        <Menu.Item disabled={!isFinanceAuth(basicInfo)}>
          <a onClick={this.handlePassFinanceAuth(basicInfo.id || 0)} disabled={!isFinanceAuth(basicInfo)}>财务认证</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Drawer 
        title={'实名认证'}
        width={520}
        placement="right"
        // maskClosable={false}
        closable
        onClose={this.toggleRealNameAuthDrawer}
        visible={this.state.realNameAuthVisible}
        style={{
          height: 'calc(100% - 65px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <Card bordered={false}>
          <Skeleton loading={loadingProfile}>
            <DescriptionList col={1} size="large" title="认证信息" style={{ marginBottom: 32 }}>
              <Description term="真实姓名">{basicInfo.realname || '--'} {isRealnameAuthed(basicInfo) ? <Tag color={sysConfig.colors.success}>已认证</Tag> : <Tag color={sysConfig.colors.failed}>未认证</Tag>}</Description>
              <Description term="身份证号码">{basicInfo.id_no || '--'} {isRealnameAuthed(basicInfo) ? <Tag color={sysConfig.colors.success}>已认证</Tag> : <Tag color={sysConfig.colors.failed}>未认证</Tag>}</Description>
              <Description term="支付宝账户">{basicInfo.alipay_no || '--'} {isFinanceAuthed(basicInfo) ? <Tag color={sysConfig.colors.success}>已认证</Tag> : <Tag color={sysConfig.colors.failed}>未认证</Tag>}</Description>
            </DescriptionList>
          </Skeleton>
          <Divider style={{ marginBottom: 32 }} />
        </Card>

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
          <Dropdown
            
            overlay={refuseMenu} 
            placement="bottomCenter"
          >
            <Button
              style={{
                marginRight: 8,
              }}
            >
              不通过
            </Button>
          </Dropdown>

          <Dropdown
            overlay={passMenu}
            placement="bottomCenter"
          >
            <Button type="primary">通过</Button>
          </Dropdown>
          
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
      users: { data, profile },
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
              scroll={{ x: 2190 }}
            />
          </div>
        </Card>
        </Skeleton>
        {this.renderProfileDrawer()}
        {this.renderRealNameAuth()}
        <UpdateForm
          modalVisible={this.state.updateVisible}
          handleModalVisible={this.toggleUpdateVisible}
          handleSubmit={this.handleUpdate}
          // loading={loadingDetails}
          data={profile.basicInfo ? profile.basicInfo : null}
        />
      </PageHeaderWrapper>
    );
  }
}

export default UsersView;