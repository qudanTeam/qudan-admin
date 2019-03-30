/**
 * name: advertisers
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './Advertisers.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input, Modal, Divider } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import moment from 'moment';

const FormItem = Form.Item;

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
        <FormItem {...formItemLayout} label="广告主名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '广告主名称' }],
          })(<Input placeholder="广告主名称" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="手机">
          {form.getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请填写真实手机号' }],
          })(<Input placeholder="手机号" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="微信">
          {form.getFieldDecorator('weixin', {
            rules: [{ required: true, message: '请填写广告主微信号' }],
          })(<Input placeholder="微信号" />)}
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
  const { modalVisible, form, data, handleSubmit, handleModalVisible } = props;

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
      title="修改"
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
        <FormItem {...formItemLayout} label="广告主名称">
          {form.getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: '广告主名称' }],
          })(<Input placeholder="广告主名称" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="手机">
          {form.getFieldDecorator('mobile', {
            initialValue: data.mobile,
            rules: [{ required: true, message: '请填写真实手机号' }],
          })(<Input placeholder="手机号" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="微信">
          {form.getFieldDecorator('weixin', {
            initialValue: data.weixin,
            rules: [{ required: true, message: '请填写广告主微信号' }],
          })(<Input placeholder="微信号" />)}
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

@connect(({advistors, loading }) => ({
  advistors,
  loading: loading.models.advistors,
}))
@Form.create()
class AdvertiserView extends PureComponent {

  state = {
    preLoading: false,
    formValues: {},
    createFormVisible: false,
    updateFormVisible: false,
    record: {},
    updateID: null,
  }

  originColumns = [
    {
      title: '用户编号',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '广告主名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '微信号',
      dataIndex: 'weixin',
      width: 150,
    },
    {
      title: '投放商品数量',
      dataIndex: 'product_count',
      width: 150,
    },
    {
      title: '入驻时间',
      dataIndex: 'modify_time',
      // width: 150,
      render: (val) => {
        return (<span>{moment(val).utcOffset(-8).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")}</span>)
      },
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.prepareUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.deleteOne(record)}>删除</a>
        </Fragment>
      ),
    },
  ]

  get columns() {
    const cols = this.originColumns.map((val) => {
      if (!val.render) {
        val.render = (txt) => {
          return (<span>{txt || '--'}</span>)
        }
      }

      return val;
    })
    return cols;
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...this.state.formValues,
    };

    dispatch({
      type: 'advistors/fetch',
      payload: params,
    });
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

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        page: 1,
        pageSize: 15,
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'advistors/fetch',
        payload: values,
      });
    });
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'advistors/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  prepareUpdate = record => e => {
    if (e) {
      e.preventDefault();
    }
    

    const { id } = record;
    this.setState({
      updateID: id,
      record,
    });

    this.toggleUpdateForm();
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'advistors/update',
      payload: {
        id: this.state.updateID,
        ...values
      },
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  deleteOne = record => e => {
    if (e) {
      e.preventDefault();
    }

    const { id } = record;

    this.props.dispatch({
      type: 'advistors/delete',
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
      type: 'advistors/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      formValues: {},
    });
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem>
              {getFieldDecorator('id')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem>
              {getFieldDecorator('name')(<Input placeholder="搜索: 广告主名称" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem >
              {getFieldDecorator('mobile')(<Input placeholder="搜索: 手机号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem>
              {getFieldDecorator('weixin')(<Input placeholder="搜索: 微信" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );

  }

  render() {
    const {
      advistors: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper title="广告主">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.toggleCreateForm}>
                新建
              </Button>
            </div>
            <StandardTable
              loading={loading}
              size="small"
              data={data}
              columns={this.columns}
              scroll={{ x: 1200 }}
              onChange={this.handleTableChange}
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
            data={this.state.record}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvertiserView;
