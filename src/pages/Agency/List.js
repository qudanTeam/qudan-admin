/**
 * name: list
 */


import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Skeleton, Drawer } from 'antd';
import StandardTable from '@/components/StandardTable';
import moment from 'moment';
import config from '@/config';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ agents, loading}) => ({
  agents,
  loading: loading.models.agents,
  loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class ListView extends PureComponent {

  state = {
    preLoading: false,
    childsVisible: false,
    rewardsVisible: false,
  }

  columns = [
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      key: 'user_id',
      width: 160,
    },
    {
      title: '专属邀请码',
      dataIndex: 'invite_code',
      width: 160,
    },
    {
      title: '代理等级',
      dataIndex: 'level',
      width: 150,
      render: (txt) => {
        return (
          <span>{config.AgentLevel[txt]}</span>
        )
      },
    },
    {
      title: '直接分佣比例',
      dataIndex: 'direct_rate',
      width: 150,
    },
    {
      title: '间接分佣比例',
      dataIndex: 'related_rate',
      width: 150,
    },
    {
      title: '成为代理时间',
      dataIndex: 'beign_agent_time',
      // width: 150,
      render: (txt, record) => {
        return (
          <span>{moment(txt).utcOffset(-8).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")}</span>
        );
      }
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.showChilds(record.id)}>查看下级</a>
          <Divider type="vertical" />
          <a onClick={this.showRewards(record.id)} style={{ color: 'red' }}>查看奖励</a>
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
      type: 'agents/fetch',
      payload: params,
    });
  }

  handleSearch = (e) => {
    const { form, dispatch } = this.props;
    e.preventDefault();

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // console.log(fieldsValue, 'values');
      // form.resetFields();
      // if (typeof handleSubmit === 'function') {
      //   handleSubmit(fieldsValue);
      // }

      dispatch({
        type: 'agents/fetch',
        payload: {
          ...fieldsValue,
        },
      })
    });
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户编号">
              {getFieldDecorator('invite_code')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="代理等级">
              {getFieldDecorator('level', {
                initialValue: 'all',
              })(
                <Select>
                  <Option value="all">全部</Option>
                  <Option value="1">{config.AgentLevel[1]}</Option>
                  <Option value="2">{config.AgentLevel[2]}</Option>
                  <Option value="3">{config.AgentLevel[3]}</Option>
                </Select>
              )}
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

  toggleChildsDrawer = () => {
    const { childsVisible = false } = this.state;

    this.setState({
      childsVisible: !childsVisible,
    });
  }

  toggleRewardsDrawer = () => {
    const { rewardsVisible = false } = this.state;

    this.setState({
      rewardsVisible: !rewardsVisible,
    });
  }

  showChilds = (id) => (e) => {
    e.preventDefault();
    this.toggleChildsDrawer();

    // console.log(this.state, '----dddd');

    this.props.dispatch({
      type: 'agents/fetchChilds',
      payload: {
        pid: id,
      },
    });
  }

  showRewards = (id) => (e) => {
    e.preventDefault();
    this.toggleRewardsDrawer();

    this.props.dispatch({
      type: 'agents/fetchRewards',
      payload: {
        pid: id,
      },
    });
  }

  renderChildsDrawer = () => {

    const { agents: { parentAgentID, childs }, loadingChilds } = this.props;

    const columns = [
      {
        title: '用户编号',
        dataIndex: 'invite_code',
        width: 150,
      },
      {
        title: '下级类型',
        width: 150,
        key: "child_type",
        dataIndex: 'user_id',
        render: (_, record) => {
          const { parent_agent_id } = record;

          if (parentAgentID === parent_agent_id) {
            return (
              <span>直接下级</span>
            )
          }

          return (
            <span>间接下级</span>
          );
        }
      },
      {
        title: '用户姓名',
        dataIndex: 'realname',
        width: 150,
      },
      {
        title: '手机号',
        dataIndex: 'register_mobile',
        width: 150,
      },
      {
        title: '注册时间',
        dataIndex: 'register_time',
        width: 200,
        render: (val) => {
          return (<span>{moment(val).utcOffset(-8).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")}</span>)
        },
      }
    ];

    const handleTableChange = (pagination) => {
      const { dispatch } = this.props;

      const params = {
        pid: parentAgentID,
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      

      dispatch({
        type: 'agents/fetchChilds',
        payload: params,
      });
    }

    return (
      <Drawer 
        title={'下级代理'}
        width={720}
        placement="right"
        onClose={this.toggleChildsDrawer}
        visible={this.state.childsVisible}
        style={{
          height: 'calc(100% - 65px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <Card bordered={false}>
          
          <StandardTable
            size="small"
            data={childs}
            loading={loadingChilds}
            columns={columns}
            onChange={handleTableChange}
          />
          <Divider style={{ marginBottom: 32 }} />
        </Card>

      </Drawer>
    )
  }

  renderChildsRewardsDrawer = () => {

    const { agents: { parentAgentID, rewards }, loadingRewards } = this.props;

    const columns = [
      {
        title: '用户编号',
        dataIndex: 'invite_code',
        width: 150,
      },
      {
        title: '订单号',
        dataIndex: 'id',
        width: 150,
      },
      {
        title: '金额',
        dataIndex: 'price',
        width: 150,
      },
      
      {
        title: '订单状态',
        dataIndex: 'status',
        width: 150,
        render: (val) => {
          return (<span>{config.TradeExecState[val]}</span>)
        },
      },
      {
        title: '商品名称',
        dataIndex: 'product_name',
        width: 150,
      },
      {
        title: '收益时间',
        dataIndex: 'audit_time',
        width: 200,
        render: (val) => {
          return (<span>{moment(val).utcOffset(-8).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")}</span>)
        },
      },
      {
        title: '奖励状态',
        dataIndex: 'send_status',
        width: 150,
        render: (val) => {
          return (<span>{config.RewardStatus[val]}</span>)
        },
      }
    ];

    const handleTableChange = (pagination) => {

      const { dispatch } = this.props;

      const params = {
        pid: parentAgentID,
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
      

      dispatch({
        type: 'agents/fetchRewards',
        payload: params,
      });
    }

    return (
      <Drawer 
        title={'下级代理奖励'}
        width={720}
        placement="right"
        onClose={this.toggleRewardsDrawer}
        visible={this.state.rewardsVisible}
        style={{
          height: 'calc(100% - 65px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <Card bordered={false}>
          
          <StandardTable
            size="small"
            data={rewards}
            loading={loadingRewards}
            columns={columns}
            onChange={handleTableChange}
          />
          <Divider style={{ marginBottom: 32 }} />
        </Card>

      </Drawer>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      preLoading: true,
    });
    dispatch({
      type: 'agents/fetch',
    }).then(() => {
      this.setState({
        preLoading: false,
      });
    });
  }

  render() {
    const {
      agents: { data },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper 
        title="代理列表"
        // tabList={tabList}
      >
        <Skeleton active loading={this.state.preLoading}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              size="small"
              data={data}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1200 }}
            />
          </div>
        </Card>
        </Skeleton>
        {this.renderChildsDrawer()}
        {this.renderChildsRewardsDrawer()}
      </PageHeaderWrapper>
    );
  }
}

export default ListView;
