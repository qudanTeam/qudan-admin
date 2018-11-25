/**
 * name: VIP 参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, DatePicker, message, Row, Icon, Col, Button, Input, Divider, Modal, Upload } from 'antd';
import StandardTable from '@/components/StandardTable';
import NumericInput from '@/components/NumericInput';
import { formatMessage, FormattedMessage } from 'umi/locale';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

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
          <Button style={{ marginLeft: 8 }}>
            <FormattedMessage id="form.save" />
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
});

@Form.create()
class SettingsView extends PureComponent {

  state = {
    createFormVisible: false,
  }

  columns = [
    {
      title: 'VIP名称',
      dataIndex: 'vipName',
      width: 150,
    },
    {
      title: '任务加成比例',
      dataIndex: 'additionRate',
      width: 150,
    },
    {
      title: 'VIP价格',
      dataIndex: 'vipPrice',
      width: 150,
    },
    {
      title: 'VIP促销价格',
      dataIndex: 'vipPromotionPrice',
      width: 150,
    },
    {
      title: 'VIP有效期',
      dataIndex: 'vipValidity',
      width: 150,
    },
    {
      title: 'VIP特权图片',
      dataIndex: 'vipPic',
      width: 150,
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>编辑</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }}>删除</a>
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

  render() {
    return (
      <PageHeaderWrapper title="VIP参数配置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新建
              </Button>
            </div>
            <StandardTable
              size="small"
              data={{}}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1000 }}
            />
          </div>
        </Card>
        <CreateForm 
          modalVisible={this.state.createFormVisible} 
          handleModalVisible={this.toggleCreateForm}
        />
      </PageHeaderWrapper>
    );
  }
}

export default SettingsView;
