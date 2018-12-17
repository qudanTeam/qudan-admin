/**
 * name: 代理参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Divider, Col, Button, Input, Modal, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import config from '@/config';
import { formatMessage, FormattedMessage } from 'umi/locale';
import NumericInput from '@/components/NumericInput/NumericInput';

const FormItem = Form.Item;
const Option = Select.Option;
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
        <FormItem {...formItemLayout} label="代理等级">
          {form.getFieldDecorator('level', {
            rules: [{ required: true, message: '请选择代理等级' }],
            initialValue: '1',
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">{config.AgentLevel[1]}</Option>
              <Option value="2">{config.AgentLevel[2]}</Option>
              <Option value="3">{config.AgentLevel[3]}</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="直接分佣比例">
          {form.getFieldDecorator('direct_rate', {
            rules: [{ required: true, message: '请填写直接分佣比例' }],
          })(<Input placeholder="请填写直接分佣比例" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="间接分佣比例">
          {form.getFieldDecorator('related_rate', {
            rules: [{ required: true, message: '请填写间接分佣比例' }],
          })(<Input placeholder="请填写间接分佣比例" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="邀请注册人数">
          {form.getFieldDecorator('invite_limit', {
            rules: [{ required: true, message: '请填写邀请注册人数' }],
          })(<NumericInput placeholder="邀请注册人数" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="下级完成任务数">
          {form.getFieldDecorator('task_done_limit', {
            rules: [{ required: true, message: '请填写下级完成任务数' }],
          })(<NumericInput placeholder="0" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分享次数">
          {form.getFieldDecorator('share_limit', {
            rules: [{ required: true, message: '请填写分享次数' }],
          })(<NumericInput placeholder="0" />)}
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
      title="新增"
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
        <FormItem {...formItemLayout} label="代理等级">
          {form.getFieldDecorator('level', {
            rules: [{ required: true, message: '请选择代理等级' }],
            initialValue: String(data.level),
          })(
            <Select style={{ width: 120 }}>
              <Option value="1">{config.AgentLevel[1]}</Option>
              <Option value="2">{config.AgentLevel[2]}</Option>
              <Option value="3">{config.AgentLevel[3]}</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="直接分佣比例">
          {form.getFieldDecorator('direct_rate', {
            rules: [{ required: true, message: '请填写直接分佣比例' }],
            initialValue: data.direct_rate,
          })(<Input placeholder="请填写直接分佣比例" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="间接分佣比例">
          {form.getFieldDecorator('related_rate', {
            rules: [{ required: true, message: '请填写间接分佣比例' }],
            initialValue: data.related_rate,
          })(<Input placeholder="请填写间接分佣比例" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="邀请注册人数">
          {form.getFieldDecorator('invite_limit', {
            rules: [{ required: true, message: '请填写邀请注册人数' }],
            initialValue: data.invite_limit,
          })(<NumericInput placeholder="邀请注册人数" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="下级完成任务数">
          {form.getFieldDecorator('task_done_limit', {
            rules: [{ required: true, message: '请填写下级完成任务数' }],
            initialValue: data.task_done_limit,
          })(<NumericInput placeholder="0" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分享次数">
          {form.getFieldDecorator('share_limit', {
            rules: [{ required: true, message: '请填写分享次数' }],
            initialValue: data.share_limit,
          })(<NumericInput placeholder="0" />)}
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

@connect(({ agent_configs, loading}) => ({
  agent_configs,
  loading: loading.models.agent_configs,
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class SettingsView extends PureComponent {

  state = {
    updateFormVisible: false,
    createFormVisible: false,
  }

  columns = [
    {
      title: '代理级别名称',
      dataIndex: 'level',
      width: 150,
      render: (txt) => {
        return (
          <span>{config.AgentLevel[txt]}</span>
        )
      },
    },
    {
      title: '直接分佣比例',
      dataIndex: 'direct_rate',
      width: 150,
    },
    {
      title: '间接分佣比例',
      dataIndex: 'related_rate',
      width: 150,
    },
    {
      title: '邀请注册人数',
      dataIndex: 'invite_limit',
      width: 150,
    },
    {
      title: '下级完成任务数量',
      dataIndex: 'task_done_limit',
      width: 200,
    },
    {
      title: '分享次数',
      dataIndex: 'share_limit',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.prepareUpdate(record.id)} >编辑</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }} onClick={this.deleteOne(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ]

  deleteOne = id => () => {

    const { dispatch } = this.props;
    confirm({
      title: formatMessage({ id: 'app.doublecheck.delete' }),
      okText: formatMessage({ id: 'app.doublecheck.delete.btn.okText' }),
      okType: 'danger',
      cancelText: formatMessage({ id: 'app.doublecheck.delete.btn.cancelText' }),
      onOk() {
        dispatch({
          type: 'agent_configs/delete',
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

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    

    dispatch({
      type: 'agent_configs/fetch',
      payload: params,
    });
  }

  prepareUpdate = id => e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      updateID: id,
    });

    this.props.dispatch({
      type: 'agent_configs/fetchDetails',
      payload: {
        id,
      }
    }).then(() => {
      this.toggleUpdateForm();
    });
    
  }

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  toggleCreateForm = () => {
    this.setState({
      createFormVisible: !this.state.createFormVisible,
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'agent_configs/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'agent_configs/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    
    dispatch({
      type: 'agent_configs/fetch',
    });
  }

  render() {
    const {
      agent_configs: { data, details },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="代理参数设置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新增
              </Button>
            </div>
            <StandardTable
              size="small"
              data={data}
              loading={loading}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1000 }}
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
            data={details}
          />

        </Card>
        
      </PageHeaderWrapper>
    );
  }
}

export default SettingsView;
