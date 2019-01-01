/**
 * name: account
 */

import styles from './Account.less';
import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Button, Divider, Modal, Form, Select, Input } from 'antd';
import StandardTable from '@/components/StandardTable';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleSubmit, handleModalVisible } = props;

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

  const okHandle = (e) => {
    if (typeof e !== 'undefined') {
      e.preventDefault();
    }
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (typeof handleSubmit === "function") {
        handleSubmit(fieldsValue);
      }
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增"
      centered
      visible={modalVisible}
      // onOk={okHandle}
      footer={null}
      width={620}
      onCancel={() => handleModalVisible()}
    >
      <Form
        onSubmit={okHandle} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="账号名称">
          {form.getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入账号名称' }],
          })(
            <Input placeholder="账号名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="密码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写密码' }],
          })(<Input placeholder="密码" type="password" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否启用">
          {form.getFieldDecorator('enabled', {
            rules: [{ required: true, message: '请选择是否启用' }],
            initialValue: 1,
          })(<Select style={{ width: 120 }}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>)}
        </FormItem>
        
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="form.submit" />
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
            <FormattedMessage id="form.cancel" />
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
});

const UpdateForm = Form.create()(props => {
  const { 
    modalVisible, 
    form,
    handleSubmit, 
    data,
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
      destroyOnClose
      title="修改"
      centered
      visible={modalVisible}
      footer={null}
      width={620}
      onCancel={() => handleModalVisible()}
    >
      <Form
        onSubmit={okHandle} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="账号名称">
          {form.getFieldDecorator('username', {
            initialValue: data.username,
            rules: [{ required: true, message: '请输入账号名称' }],
          })(
            <Input placeholder="账号名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否启用">
          {form.getFieldDecorator('enabled', {
            rules: [{ required: true, message: '请选择是否启用' }],
            initialValue: data.enabled,
          })(<Select style={{ width: 120 }}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>)}
        </FormItem>
        
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="form.submit" />
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
            <FormattedMessage id="form.cancel" />
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
});

const UpdatePasswordForm = Form.create()(props => {
  const { 
    modalVisible, 
    form,
    handleSubmit, 
    data,
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
      destroyOnClose
      title="重置密码"
      centered
      visible={modalVisible}
      footer={null}
      width={620}
      onCancel={() => handleModalVisible()}
    >
      <Form
        onSubmit={okHandle} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="密码">
          {form.getFieldDecorator('password', {
            initialValue: data.password,
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input placeholder="密码" type="password" />
          )}
        </FormItem>
        
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="form.submit" />
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
            <FormattedMessage id="form.cancel" />
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
});

@connect(({ admins, loading }) => ({
  admins,
  loading: loading.models.admins,
}))
class AccountView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    updatePasswordFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      width: 150,
      render: (val) => {
        return (
          <span>{val === 1 ? '启用' : '禁用'}</span>
        )
      },
    },
    {
      title: '操作',
      width: 200,
      render: (text, record) => (
        <Fragment>
          <a onClick={this.prepareUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.toggleEnableState(record)}>{record.enabled === 1 ? '禁用' : '启用'}</a>
          <Divider type="vertical" />
          <a onClick={this.prepareUpdatePassword(record)}>重置密码</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }} onClick={this.deleteOne(record.id)} >删除</a>
        </Fragment>
      ),
    },
  ];

  toggleEnableState = (record) => e => {
    const { dispatch } = this.props;
    const { id, enabled } = record;
    if (e) {
      e.preventDefault();
    }

    dispatch({
      type: 'admins/update',
      payload: {
        id,
        enabled: enabled === 1 ? 0 : 1,
      },
    });
  }

  deleteOne = id => e => {
    e.preventDefault();

    const { dispatch } = this.props;
    confirm({
      title: formatMessage({ id: 'app.doublecheck.delete' }),
      okText: formatMessage({ id: 'app.doublecheck.delete.btn.okText' }),
      okType: 'danger',
      cancelText: formatMessage({ id: 'app.doublecheck.delete.btn.cancelText' }),
      onOk() {
        dispatch({
          type: 'admins/delete',
          payload: {
            id,
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  prepareUpdate = (record) => e => {
    e.preventDefault();

    const { id } = record;
    this.setState({
      updateID: id,
      details: record,
    });
    this.toggleUpdateForm();
  }

  prepareUpdatePassword = (record) => e => {
    e.preventDefault();

    const { id } = record;
    this.setState({
      updateID: id,
      details: record,
    });
    this.toggleUpdatePasswordForm();
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdatePassword = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'admins/updatePassword',
      payload: values,
    }).then(() => {
      this.toggleUpdatePasswordForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'admins/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  toggleCreateForm = () => {
    this.setState({
      createFormVisible: !this.state.createFormVisible,
    });
  }

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  toggleUpdatePasswordForm = () => {
    this.setState({
      updatePasswordFormVisible: !this.state.updatePasswordFormVisible,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admins/fetch',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }

  render() {
    const { 
      admins: {
        data,
      },
      loading 
    } = this.props;
    
    return (
      <PageHeaderWrapper title="账户管理">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListOperator}>
                <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                  新增
                </Button>
              </div>
              <StandardTable
                size="small"
                loading={loading}
                data={data}
                columns={this.columns}
                onChange={this.handleTableChange}
              />
            </div>

            <CreateForm 
              modalVisible={this.state.createFormVisible} 
              handleModalVisible={this.toggleCreateForm}
              handleSubmit={this.handleCreate}
            />

            <UpdateForm 
              modalVisible={this.state.updateFormVisible}
              handleModalVisible={this.toggleUpdateForm}
              handleSubmit={this.handleUpdate}
              data={this.state.details}
            />

            <UpdatePasswordForm 
              modalVisible={this.state.updatePasswordFormVisible}
              handleModalVisible={this.toggleUpdatePasswordForm}
              handleSubmit={this.handleUpdatePassword}
              data={{}}
            />
          </Card>
        </PageHeaderWrapper>
    );
  }
}

export default AccountView;
