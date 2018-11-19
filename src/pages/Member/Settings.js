/**
 * name: VIP 参数设置
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Settings.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input, Divider, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
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
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form
        onSubmit={this.handleSubmit} 
        hideRequiredMark 
        style={{ marginTop: 8 }}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="VIP名称">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务加成比例">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="VIP价格">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="VIP促销价格">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="VIP有效期">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="VIP特权图">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
          })(<Input placeholder="请输入" />)}
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
