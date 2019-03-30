/**
 * name: message
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Message.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Avatar, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import config from '@/config';
import Uploader from '@/components/Uploader';
import { formatMessage, FormattedMessage } from 'umi/locale';
import SelectUser from '@/components/Select/SelectUser';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

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


        <FormItem {...formItemLayout} label="消息标题">
          {form.getFieldDecorator('msg_title', {
            rules: [{ required: true, message: '请填写消息标题' }],
          })(
            <Input placeholder="消息标题" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="接收用户">
          {form.getFieldDecorator('user_ids', {
            rules: [{ required: true, type: 'array', message: '请搜索选择用户' }],
          })(
            <SelectUser />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="链接">
          {form.getFieldDecorator('msg_link', {
            rules: [{ required: true, message: '请填写链接' }],
          })(<Input placeholder="链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="内容">
          {form.getFieldDecorator('msg_content', {
            
            rules: [{ required: true, message: '请填写内容' }],
          })(<TextArea rows={3} placeholder="内容" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="消息图片">
          {form.getFieldDecorator('msg_logo', {
            rules: [{ required: true, message: '请上传图片' }],
          })(
            <Uploader action={config.uploadPath} host={config.qiniu.host} />
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
        <FormItem {...formItemLayout} label="消息标题">
          {form.getFieldDecorator('msg_title', {
            initialValue: data.msg_title,
            rules: [{ required: true, message: '请填写消息标题' }],
          })(
            <Input placeholder="消息标题" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="接收用户">
          {form.getFieldDecorator('user_ids', {
            initialValue: data.user_ids,
            rules: [{ required: true, type: 'array', message: '请搜索选择用户' }],
          })(
            <SelectUser />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="链接">
          {form.getFieldDecorator('msg_link', {
            initialValue: data.msg_link,
            rules: [{ required: true, message: '请填写链接' }],
          })(<Input placeholder="链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="内容">
          {form.getFieldDecorator('msg_content', {
            initialValue: data.msg_content,
            rules: [{ required: true, message: '请填写内容' }],
          })(<TextArea rows={3} placeholder="内容" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="消息图片">
          {form.getFieldDecorator('msg_logo', {
            initialValue: data.msg_logo,
            rules: [{ required: true, message: '请上传图片' }],
          })(
            <Uploader action={config.uploadPath} host={config.qiniu.host} />
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

@connect(({ messages, loading }) => ({
  messages,
  loading: loading.models.messages,
}))
@Form.create()
class MessageView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '用户',
      dataIndex: 'id',
      width: 150,
      render: (id, record) => {
        const txt = record.user_ids;
        const users = txt.map(item => item.label);
        return (<span>{users.join(',')}</span>)
        // return (<span>ok</span>);
      }
    },
    {
      title: '消息logo',
      dataIndex: 'msg_logo',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
      }
    },
    {
      title: '消息标题',
      dataIndex: 'msg_title',
      width: 150,

    },
    {
      title: '消息内容',
      dataIndex: 'msg_content',
      width: 150,
    },
    {
      title: '消息链接',
      dataIndex: 'msg_link',
      // width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.pushMessage(record.id)}>推送</a>
          <Divider type="vertical" />
          <a onClick={this.prepareUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.deleteOne(record)}>删除</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'messages/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  deleteOne = record => e => {
    if (e) {
      e.preventDefault();
    }

    const { id } = record;

    this.props.dispatch({
      type: 'messages/delete',
      payload: {
        id,
      },
    });
  }

  toggleCreateForm = () => {
    this.setState({
      createFormVisible: !this.state.createFormVisible,
    });
  }

  pushMessage = id => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'messages/push',
      payload: {
        id,
      }
    });
  }

  prepareUpdate = record => e => {
    if (e) {
      e.preventDefault();
    }
    

    const { id } = record;
    this.setState({
      updateID: id,
      details: record,
    });
    this.toggleUpdateForm();
  }

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'messages/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'messages/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'messages/fetch',
    });
  }


  render() {
    const { 
      messages: {
        data,
      },
      loading
    } = this.props;
    return (
      <PageHeaderWrapper title="消息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新增
              </Button>
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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MessageView;
