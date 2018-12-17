/**
 * name: VIP 参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import moment from 'moment';
import config from '@/config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { 
  Card, 
  Skeleton,
  Avatar, 
  Form, 
  DatePicker, 
  InputNumber,
  message, Button, Input, Divider, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import NumericInput from '@/components/NumericInput';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Uploader from '@/components/Uploader';
import { connect } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
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
        <FormItem {...formItemLayout} label="VIP名称">
          {form.getFieldDecorator('vip_name', {
            rules: [{ required: true, message: '请填写vip名称' }],
          })(<Input placeholder="取个名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务加成比例">
          {form.getFieldDecorator('add_rate', {
            rules: [{ required: true, message: '请填写任务加成比例' }],
          })(<Input placeholder="它的加成比例是？" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP价格">
          {form.getFieldDecorator('vip_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP促销价格">
          {form.getFieldDecorator('promotion_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP有效期">
          {form.getFieldDecorator('service_days', {
            rules: [{ required: true, message: '请填写正确的有效期限' }],
          })(<InputNumber min={1} />)} 天
        </FormItem>
        <FormItem {...formItemLayout} label="VIP特权图">
          {form.getFieldDecorator('vip_logo', {
            
            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
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
        <FormItem {...formItemLayout} label="VIP名称">
          {form.getFieldDecorator('vip_name', {
            rules: [{ required: true, message: '请填写vip名称' }],
            initialValue: data.vip_name,
          })(<Input placeholder="取个名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务加成比例">
          {form.getFieldDecorator('add_rate', {
            rules: [{ required: true, message: '请填写任务加成比例' }],
            initialValue: data.add_rate,
          })(<Input placeholder="它的加成比例是？" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP价格">
          {form.getFieldDecorator('vip_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
            initialValue: data.vip_price,
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="VIP促销价格">
          {form.getFieldDecorator('promotion_price', {
            rules: [{ required: true, message: '请填写一个合适的价格' }],
            initialValue: data.promotion_price,
          })(<NumericInput placeholder="0.00" prefix={<span style={{ color: 'rgba(0,0,0,.25)' }} >¥</span>} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="VIP有效期">
          {form.getFieldDecorator('service_days', {
            rules: [{ required: true, message: '请填写正确的有效期限' }],
            initialValue: data.service_days,
          })(<InputNumber min={1} />)} 天
        </FormItem>

        <FormItem {...formItemLayout} label="VIP特权图">
          {form.getFieldDecorator('vip_logo', {
            initialValue: (data.vip_logo ? `${data.vip_logo}` : null),
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
      dataIndex: 'vip_name',
      width: 150,
    },
    {
      title: '任务加成比例',
      dataIndex: 'add_rate',
      width: 150,
    },
    {
      title: 'VIP价格',
      dataIndex: 'vip_price',
      width: 150,
    },
    {
      title: 'VIP促销价格',
      dataIndex: 'promotion_price',
      width: 150,
    },
    {
      title: 'VIP有效期',
      dataIndex: 'service_days',
      width: 150,
      // render: (_, record) => {
      //   return (<span>{record.start_time} <br /> ~ <br /> {record.end_time}</span>)
      // }
    },
    {
      title: 'VIP特权图片',
      dataIndex: 'vip_logo',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
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
          <a style={{ color: 'red' }} onClick={this.deleteOne(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ]

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    

    dispatch({
      type: 'vips/fetch',
      payload: params,
    });
  }

  toggleCreateForm = () => {
    const { createFormVisible } = this.state;

    this.setState({
      createFormVisible: !createFormVisible,
    })
  }

  deleteOne = id => () => {

    const { dispatch } = this.props;
    confirm({
      title: formatMessage({ id: 'app.doublecheck.delete' }),
      okText: formatMessage({ id: 'app.doublecheck.delete.btn.okText' }),
      okType: 'danger',
      cancelText: formatMessage({ id: 'app.doublecheck.delete.btn.cancelText' }),
      onOk() {
        dispatch({
          type: 'vips/delete',
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

  toggleUpdateForm = () => {
    const { updateFormVisible } = this.state;
    
    this.setState({
      updateFormVisible: !updateFormVisible,
    });
  }

  updateOne = id => () => {
    const { updateFormVisible } = this.state;
    const { dispatch } = this.props;
    

    // load profile
    dispatch({
      type: 'vips/fetchDetails',
      payload: {
        id,
      },
    }).then(() => {
      this.setState({
        updateFormVisible: !updateFormVisible,
        updateID: id,
      });
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'vips/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'vips/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
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
              scroll={{ x: 1140 }}
            />
          </div>
        </Card>

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
        </Skeleton>
      </PageHeaderWrapper>
    );
  }
}

export default SettingsView;
