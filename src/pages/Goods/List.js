/**
 * name: 商品列表
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Avatar, Modal, Tag } from 'antd';
import StandardTable from '@/components/StandardTable';
import config from '@/config';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Uploader from '@/components/Uploader';
import SelectProduct from '@/components/Select/SelectProduct';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
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
        <FormItem {...formItemLayout} label="选择产品">
          {form.getFieldDecorator('product_id_obj', {
            rules: [{ required: true, message: '请选择产品' }],
          })(
            <SelectProduct />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="配置标题">
          {form.getFieldDecorator('title', {
            initialValue: '结算标准',
            rules: [{ required: true, message: '配置标题' }],
          })(
            <Select>
              <Option value="结算标准">结算标准</Option>
              <Option value="结算时间">结算时间</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="配置内容">
          {form.getFieldDecorator('content', {
            rules: [{ required: true, message: '配置标题' }],
          })(
            <TextArea rows={3} />
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
        <FormItem {...formItemLayout} label="选择产品">
          {form.getFieldDecorator('product_id_obj', {
            initialValue: { key: String(data.product_id), label: String(data.product_name) },
            rules: [{ required: true, message: '请选择产品' }],
          })(
            <SelectProduct />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="配置标题">
          {form.getFieldDecorator('title', {
            initialValue: data.title,
            rules: [{ required: true, message: '配置标题' }],
          })(
            <Select>
              <Option value="结算标准">结算标准</Option>
              <Option value="结算时间">结算时间</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="配置内容">
          {form.getFieldDecorator('content', {
            initialValue: data.content,
            rules: [{ required: true, message: '配置标题' }],
          })(
            <TextArea rows={3} />
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

@connect(({ products, loading}) => ({
  products,
  loading: loading.models.products,
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class ListView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '产品ID',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '产品名称',
      dataIndex: 'product_name',
      width: 150,
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
      }
    },
    {
      title: '产品分类',
      dataIndex: 'product_type',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ProductType[val]}</Tag>);
      }
    },
    {
      title: '分类',
      dataIndex: 'bg_category',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ProductBGCategory[val]}</Tag>)
      }
    },
    {
      title: '是否展示',
      dataIndex: 'is_show',
      width: 150,
      render: (val) => {
        return (<Tag>{+val === 1 ? '是' : '否'}</Tag>)
      }
    },
    {
      title: '是否上店铺',
      dataIndex: 'is_in_shop',
      width: 150,
      render: (val) => {
        return (<Tag>{+val === 1 ? '是' : '否'}</Tag>)
      }
    },

    {
      title: '商品状态',
      dataIndex: 'is_shelf',
      width: 200,
      render: (val) => {
        return (<Tag>{+val === 1 ? '已上架' : '已下架'}</Tag>)
      }
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a>编辑</a>
          <Divider type="vertical" />
          <a >{+record.is_shelf === 0 ? '上架' : '下架'}</a>
        </Fragment>
      ),
    },
  ]

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
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

  goToCreate = (e) => {
    e.preventDefault();
    router.push('/Goods/Add/Common');
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    
    dispatch({
      type: 'product_configs/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    values.category_type = 2;
    dispatch({
      type: 'product_configs/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
      payload: {
        category_type: 2,
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
      payload: {
        category_type: 2,
        page: 1,
        pageSize: 15,
      },
    });
  }


  render() {
    const { 
      products: {
        data,
      },
      loading,
    } = this.props
    return (
      <PageHeaderWrapper title="商品列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.goToCreate}>
                新增
              </Button>
            </div>
            <StandardTable
              size="small"
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 600 }}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ListView;
