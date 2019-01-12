/**
 * name: resource
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Resource.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Modal, Avatar } from 'antd';
import StandardTable from '@/components/StandardTable';
import { formatMessage, FormattedMessage } from 'umi/locale';
import moment from 'moment';
import SelectProduct from '@/components/Select/SelectProduct';
import Uploader from '@/components/Uploader';
import config from '@/config';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
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
      const { product_id_obj } = fieldsValue;
      if (product_id_obj) {
        fieldsValue.product_id = Number(product_id_obj.key);
      }
      
      
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
        <FormItem {...formItemLayout} label="产品名称">
          {form.getFieldDecorator('product_id_obj', {
            rules: [{ required: true, type: 'object', message: '请填写文案' }],
          })(
            <SelectProduct />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="文案">
          {form.getFieldDecorator('content', {
            
            rules: [{ required: true, message: '请填写文案' }],
          })(<TextArea rows={3} placeholder="文案" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="图片">
          {form.getFieldDecorator('share_img', {
            
            // rules: [{ required: true, message: '请上传图片' }],
          })(<Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否显示">
          {form.getFieldDecorator('is_show', {
            initialValue: 1,
            rules: [{ required: true, message: '请选择是否显示' }],
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
      const { product_id_obj } = fieldsValue;
      if (product_id_obj) {
        fieldsValue.product_id = Number(product_id_obj.key);
      }
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
        <FormItem {...formItemLayout} label="产品名称">
          {form.getFieldDecorator('product_id_obj', {
            initialValue: { key: String(data.product_id), label: String(data.product_name) },
            rules: [{ required: true, message: '请选择产品' }],
          })(
            <SelectProduct />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="文案">
          {form.getFieldDecorator('content', {
            initialValue: data.content,
            rules: [{ required: true, message: '请填写文案' }],
          })(<TextArea rows={3} placeholder="文案" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="图片">
          {form.getFieldDecorator('share_img', {
            initialValue: data.share_img ? `${data.share_img}` : null,
          })(<Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否显示">
          {form.getFieldDecorator('is_show', {
            initialValue: data.is_show,
            rules: [{ required: true, message: '请选择是否显示' }],
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

@connect(({ resources, loading}) => ({
  resources,
  loading: loading.models.resources,
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class ResourceView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '产品名称',
      dataIndex: 'product_name',
      width: 150,
    },
    {
      title: '素材文案',
      dataIndex: 'content',
      width: 600,
    },
    {
      title: '图片',
      dataIndex: 'share_img',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
      }
    },
    {
      title: '发布时间',
      dataIndex: 'create_time',
      width: 200,
      render: (txt, record) => {
        return (
          <span>{moment(txt).utc().zone(+8).format("YYYY-MM-DD HH:mm:ss")}</span>
        );
      }
    },
    {
      title: '是否展示',
      dataIndex: 'is_show',
      // width: 150,
      render: (txt) => {
        return (
          <span>{txt === 1 ? '是' : '否'}</span>
        )
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
          <a style={{ color: 'red' }} onClick={this.deleteOne(record.id)} >删除</a>
        </Fragment>
      ),
    },
  ]

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
          type: 'resources/delete',
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
      type: 'resources/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
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

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'resources/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'resources/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resources/fetch',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }

  render() {
    const { 
      resources: {
        data,
      },
      loading,
    } = this.props
    return (
      <PageHeaderWrapper title="素材管理">
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
              scroll={{ x: 1550 }}
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

export default ResourceView;
