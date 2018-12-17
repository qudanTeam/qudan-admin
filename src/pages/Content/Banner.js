/**
 * name: 轮播图管理
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './Banner.less';
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
        <FormItem {...formItemLayout} label="轮播图名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请选择轮播图名称' }],
          })(
            <Input placeholder="轮播图名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="轮播图链接">
          {form.getFieldDecorator('link', {
            rules: [{ required: true, message: '请填写轮播图链接' }],
          })(<Input placeholder="轮播图链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="轮播图位置">
          {form.getFieldDecorator('position', {
            rules: [{ required: true, message: '请选择轮播图位置' }],
            initialValue: 0,
          })(<Select style={{ width: 120 }}>
            <Option value={0}>首页</Option>
            <Option value={1}>列表</Option>
          </Select>)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否显示">
          {form.getFieldDecorator('is_show', {
            rules: [{ required: true, message: '请选择是否显示' }],
            initialValue: 1,
          })(<Select style={{ width: 120 }}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>)}
        </FormItem>

        <FormItem {...formItemLayout} label="Banner图">
          {form.getFieldDecorator('img', {
            
            rules: [{ required: true, message: '请上传banner图' }],
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
        <FormItem {...formItemLayout} label="轮播图名称">
          {form.getFieldDecorator('title', {
            initialValue: data.title,
            rules: [{ required: true, message: '请选择轮播图名称' }],
          })(
            <Input placeholder="轮播图名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="轮播图链接">
          {form.getFieldDecorator('link', {
            initialValue: data.link,
            rules: [{ required: true, message: '请填写轮播图链接' }],
          })(<Input placeholder="轮播图链接" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="轮播图位置">
          {form.getFieldDecorator('position', {
            initialValue: data.position,
            rules: [{ required: true, message: '请选择轮播图位置' }],
          })(<Select style={{ width: 120 }}>
            <Option value={0}>首页</Option>
            <Option value={1}>列表</Option>
          </Select>)}
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

        <FormItem {...formItemLayout} label="Banner图">
          {form.getFieldDecorator('img', {
            initialValue: (data.img ? data.img : null),
            rules: [{ required: true, message: '请上传banner图' }],
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

@connect(({ banners, loading}) => ({
  banners,
  loading: loading.models.banners,
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class BannerView extends PureComponent {

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
      title: '轮播图名称',
      dataIndex: 'title',
      width: 150,
    },
    {
      title: '轮播图链接',
      dataIndex: 'link',
      width: 150,
    },
    {
      title: '轮播图图片',
      dataIndex: 'img',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
      }
    },
    {
      title: '轮播图位置',
      dataIndex: 'position',
      width: 150,
      render: (txt) => {
        return (<span>{config.BannerPositionTxt[txt]}</span>)
      }
    },
    {
      title: '是否显示',
      dataIndex: 'is_show',
      width: 150,
      render: (txt) => {
        // return 
        
        return (
          <span>{txt ? '是' : '否'}</span>
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
          <a onClick={this.toggleEnableState(record)}>{record.is_show === 1 ? '禁用' : '启用'}</a>
          <Divider type="vertical" />
          <a style={{ color: 'red' }} onClick={this.deleteOne(record.id)}>删除</a>
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
          type: 'banners/delete',
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
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  toggleEnableState = record => e => {
    const { dispatch } = this.props;
    const { id, is_show } = record;
    if (e) {
      e.preventDefault();
    }

    dispatch({
      type: 'banners/update',
      payload: {
        id,
        is_show: is_show === 1 ? 0 : 1,
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
    dispatch({
      type: 'banners/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    dispatch({
      type: 'banners/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'banners/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'banners/fetch',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }


  render() {
    const { 
      banners: {
        data,
      },
      loading,
    } = this.props
    return (
      <PageHeaderWrapper title="轮播图管理">
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
            data={this.state.details}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BannerView;
