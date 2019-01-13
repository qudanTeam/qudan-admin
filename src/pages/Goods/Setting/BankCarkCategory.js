/**
 * name: bank_cark_category
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './BankCarkCategory.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Avatar, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import config from '@/config';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Uploader from '@/components/Uploader';

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

  const getFieldValue = form.getFieldValue;

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
        <FormItem {...formItemLayout} label="银行名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写名称' }],
          })(
            <Input placeholder="银行名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="进度查询链接">
          {form.getFieldDecorator('get_link', {
            rules: [{ required: true, message: '请填写查询链接' }],
          })(<Input placeholder="进度查询链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="LOGO">
          {form.getFieldDecorator('logo', {
            rules: [{ required: true, message: '请上传LOGO图' }],
          })(
            <Uploader action={config.uploadPath} host={config.qiniu.host} />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否有H5链接">
          {form.getFieldDecorator('has_link', {
            initialValue: 0,
            rules: [{ required: true, message: '请选择' }],
          })(
            <Select>
              <Option value={0}>否</Option>
              <Option value={1}>是</Option>
            </Select>
          )}
        </FormItem>

        {
          getFieldValue('has_link') === 1 ? (
            <FormItem {...formItemLayout} label="是否需要图形验证码">
              {form.getFieldDecorator('need_verify_code', {
                initialValue: 0,
                rules: [{ required: true, message: '请选择' }],
              })(
                <Select>
                  <Option value={0}>否</Option>
                  <Option value={1}>是</Option>
                </Select>
              )}
            </FormItem>
          ) : null
        }
        
        {
          (getFieldValue('need_verify_code') === 1 && getFieldValue('has_link') === 1) ? (
            <FormItem {...formItemLayout} label="图形验证码链接">
              {form.getFieldDecorator('verify_code_link', {
                rules: [{ required: true, message: '请填写图形验证码链接' }],
              })(<Input.TextArea rows={3} placeholder="图形验证码链接" />)}
            </FormItem>
          ) : null
        }

        {
          getFieldValue('has_link') === 1 ? (
            <FormItem {...formItemLayout} label="是否需要手机验证码">
              {form.getFieldDecorator('need_mobile_verify_code', {
                initialValue: 0,
                rules: [{ required: true, message: '请选择' }],
              })(
                <Select >
                  <Option value={0}>否</Option>
                  <Option value={1}>是</Option>
                </Select>
              )}
            </FormItem>
          ) : null
        }

        {
          (getFieldValue('need_mobile_verify_code') === 1 && getFieldValue('has_link') === 1) ? (
            <FormItem {...formItemLayout} label="手机验证码链接">
              {form.getFieldDecorator('mobile_verify_code_link', {
                
                rules: [{ required: true, message: '请填写手机验证码链接' }],
              })(<Input.TextArea rows={3} placeholder="手机验证码链接" />)}
            </FormItem>
          ) : null
        }
        
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

  const getFieldValue = form.getFieldValue;

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
        <FormItem {...formItemLayout} label="银行名称">
          {form.getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '请填写名称' }],
          })(
            <Input placeholder="银行名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="进度查询链接">
          {form.getFieldDecorator('get_link', {
            initialValue: data.get_link,
            rules: [{ required: true, message: '请填写查询链接' }],
          })(<Input placeholder="进度查询链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="LOGO">
          {form.getFieldDecorator('logo', {
            initialValue: data.logo,
            rules: [{ required: true, message: '请上传LOGO图' }],
          })(
            <Uploader action={config.uploadPath} host={config.qiniu.host} />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否有H5链接">
          {form.getFieldDecorator('has_link', {
            initialValue: data.has_link || 0,
            rules: [{ required: true, message: '请选择' }],
          })(
            <Select>
              <Option value={0}>否</Option>
              <Option value={1}>是</Option>
            </Select>
          )}
        </FormItem>

        {
          getFieldValue('has_link') === 1 ? (
            <FormItem {...formItemLayout} label="是否需要图形验证码">
              {form.getFieldDecorator('need_verify_code', {
                initialValue: data.need_verify_code || 0,
                rules: [{ required: true, message: '请选择' }],
              })(
                <Select>
                  <Option value={0}>否</Option>
                  <Option value={1}>是</Option>
                </Select>
              )}
            </FormItem>
          ) : null
        }
        
        {
          (getFieldValue('need_verify_code') === 1 && getFieldValue('has_link') === 1) ? (
            <FormItem {...formItemLayout} label="图形验证码链接">
              {form.getFieldDecorator('verify_code_link', {
                initialValue: data.verify_code_link,
                rules: [{ required: true, message: '请填写图形验证码链接' }],
              })(<Input.TextArea rows={3} placeholder="图形验证码链接" />)}
            </FormItem>
          ) : null
        }

        {
          getFieldValue('has_link') === 1 ? (
            <FormItem {...formItemLayout} label="是否需要手机验证码">
              {form.getFieldDecorator('need_mobile_verify_code', {
                initialValue: data.need_mobile_verify_code || 0,
                rules: [{ required: true, message: '请选择' }],
              })(
                <Select >
                  <Option value={0}>否</Option>
                  <Option value={1}>是</Option>
                </Select>
              )}
            </FormItem>
          ) : null
        }

        {
          (getFieldValue('need_mobile_verify_code') === 1 && getFieldValue('has_link') === 1) ? (
            <FormItem {...formItemLayout} label="手机验证码链接">
              {form.getFieldDecorator('mobile_verify_code_link', {
                initialValue: data.mobile_verify_code_link,
                rules: [{ required: true, message: '请填写手机验证码链接' }],
              })(<Input.TextArea rows={3} placeholder="手机验证码链接" />)}
            </FormItem>
          ) : null
        }
        
        
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

@connect(({ categories, loading}) => ({
  categories,
  loading: loading.models.categories,
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class BankCarkCategoryView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '银行名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '查询链接',
      dataIndex: 'get_link',
      width: 350,
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      // width: 150,
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
          <a onClick={this.prepareUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.delete(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ]

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }


  delete = id => e => {
    if (e) {
      e.preventDefault();
    }
    console.log(id);

    this.props.dispatch({
      type: 'categories/delete',
      payload: {
        id,
        category_type: 1,
      },
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

  toggleCreateForm = () => {
    this.setState({
      createFormVisible: !this.state.createFormVisible,
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    values.category_type = 1;
    dispatch({
      type: 'categories/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    values.category_type = 1;
    dispatch({
      type: 'categories/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/fetch',
      payload: {
        category_type: 1,
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/fetch',
      payload: {
        category_type: 1,
        page: 1,
        pageSize: 15,
      },
    });
  }


  render() {
    const { 
      categories: {
        data,
      },
      loading,
    } = this.props
    return (
      <PageHeaderWrapper title="银行分类配置">
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
              scroll={{ x: 800 }}
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

export default BankCarkCategoryView;
