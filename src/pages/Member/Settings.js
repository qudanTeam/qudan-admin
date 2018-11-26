/**
 * name: VIP 参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { 
  Card, 
  Skeleton,
  Avatar, 
  Form, 
  DatePicker, 
  message, Row, Icon, Col, Button, Input, Divider, Modal, Upload } from 'antd';
import StandardTable from '@/components/StandardTable';
import NumericInput from '@/components/NumericInput';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const uploaderProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
  };

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

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增"
      centered
      visible={modalVisible}
      onOk={okHandle}
      footer={null}
      width={620}
      onCancel={() => handleModalVisible()}
    >
      <Form
        // onSubmit={this.handleSubmit} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="VIP名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请填写vip名称' }],
          })(<Input placeholder="取个名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务加成比例">
          {form.getFieldDecorator('rate', {
            rules: [{ required: true, message: '请填写任务加成比例' }],
          })(<Input placeholder="它的加成比例是？" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP价格">
          {form.getFieldDecorator('price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP促销价格">
          {form.getFieldDecorator('promotion_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP有效期">
          {form.getFieldDecorator('validity_period', {
            rules: [{ required: true, message: '请填写正确的有效期限' }],
          })(<RangePicker
            style={{ width: '100%' }}
            placeholder={[
              formatMessage({ id: 'form.date.placeholder.start' }),
              formatMessage({ id: 'form.date.placeholder.end' }),
            ]}
          />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP特权图">
          {form.getFieldDecorator('logo', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
          })(
            <Upload {...uploaderProps}>
              <Button>
                <Icon type="upload" /> 上传图片
              </Button>
            </Upload>
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
    handleAdd, 
    data,
    handleModalVisible } = props;

  const uploaderProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
  };

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

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增"
      centered
      visible={modalVisible}
      onOk={okHandle}
      footer={null}
      width={620}
      onCancel={() => handleModalVisible()}
    >
      <Form
        // onSubmit={this.handleSubmit} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem {...formItemLayout} label="VIP名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写vip名称' }],
            initialValue: data.name,
          })(<Input placeholder="取个名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务加成比例">
          {form.getFieldDecorator('addition_rate', {
            rules: [{ required: true, message: '请填写任务加成比例' }],
            initialValue: data.addition_rate,
          })(<Input placeholder="它的加成比例是？" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP价格">
          {form.getFieldDecorator('price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
            initialValue: data.price,
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP促销价格">
          {form.getFieldDecorator('promotion_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
            initialValue: data.promotion_price,
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP有效期">
          {form.getFieldDecorator('validity_period', {
            rules: [{ required: true, message: '请填写正确的有效期限' }],
            initialValue: [
              moment(data.start_time),
              moment(data.end_time),
            ],
          })(<RangePicker
            style={{ width: '100%' }}
            placeholder={[
              formatMessage({ id: 'form.date.placeholder.start' }),
              formatMessage({ id: 'form.date.placeholder.end' }),
            ]}
          />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP特权图">
          {form.getFieldDecorator('logo', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
          })(
            <Upload {...uploaderProps}>
              <Button>
                <Icon type="upload" /> 上传图片
              </Button>
            </Upload>
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

@Form.create()
@connect(({ vips, loading }) => ({
  vips,
  loading: loading.models.vips,
}))
class SettingsView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    preLoading: false,
  }

  columns = [
    {
      title: 'VIP名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '任务加成比例',
      dataIndex: 'addition_rate',
      width: 150,
    },
    {
      title: 'VIP价格',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: 'VIP促销价格',
      dataIndex: 'promotion_price',
      width: 150,
    },
    {
      title: 'VIP有效期',
      // dataIndex: 'vipValidity',
      width: 250,
      render: (_, record) => {
        return (<span>{record.start_time} <br /> ~ <br /> {record.end_time}</span>)
      }
    },
    {
      title: 'VIP特权图片',
      dataIndex: 'vip_image',
      width: 150,
      render: (imgURL) => {
        return (<Avatar shape="square" size={100} src={imgURL} />);
      }
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.updateOne(record.id)} >编辑</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }} onClick={this.deleteOne}>删除</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = () => {

  }

  toggleCreateForm = () => {
    const { createFormVisible } = this.state;

    this.setState({
      createFormVisible: !createFormVisible,
    })
  }

  deleteOne = () => {
    confirm({
      title: formatMessage({ id: 'app.doublecheck.delete' }),
      okText: formatMessage({ id: 'app.doublecheck.delete.btn.okText' }),
      okType: 'danger',
      cancelText: formatMessage({ id: 'app.doublecheck.delete.btn.cancelText' }),
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  toggleUpdateForm = () => {
    const { updateFormVisible } = this.state;
    
    this.setState({
      updateFormVisible: !updateFormVisible,
    });
  }

  updateOne = id => () => {
    const { updateFormVisible } = this.state;
    const { dispatch } = this.props;
    this.setState({
      updateFormVisible: !updateFormVisible,
    });

    // load profile
    dispatch({
      type: 'vips/fetchDetails',
      payload: {
        id,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      preLoading: true,
    });
    dispatch({
      type: 'vips/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  render() {

    const { vips: { data, details } } = this.props;
    return (
      <PageHeaderWrapper title="VIP参数配置" loading={this.state.preLoading}>
        <Skeleton active loading={this.state.preLoading}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新建
              </Button>
            </div>
            <StandardTable
              size="small"
              data={data}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1200 }}
            />
          </div>
        </Card>
        <CreateForm 
          modalVisible={this.state.createFormVisible} 
          handleModalVisible={this.toggleCreateForm}
        />

        <UpdateForm 
          modalVisible={this.state.updateFormVisible}
          handleModalVisible={this.toggleUpdateForm}
          data={details}
        />
        </Skeleton>
      </PageHeaderWrapper>
    );
  }
}

export default SettingsView;
