/**
 * name: list
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import config from '@/config';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ financials, loading }) => ({
  financials,
  loading: loading.models.financials,
  loadingFinancials: loading.effects['financials/fetchFinancials'],
  loadingFinancialsMonthReport: loading.effects['financials/fetchFinancialsMonthReport']
}))
@Form.create()
class ListView extends PureComponent {

  state = {
    activeKey: 'details',
  }

  columns = [
    {
      title: '用户编号',
      dataIndex: 'invite_code',
      
    },
    {
      title: '金额',
      dataIndex: 'price',
      
      render: (val, record) => {

        if ([1,2,3].includes(+record.trade_type)) {
          return (<span style={{color: 'red'}}>{`- ${val}`}</span>); 
        }

        return (<span style={{color: 'green'}}>{`+ ${val}`}</span>);
      }
    },
    {
      title: '类型',
      dataIndex: 'trade_type',
      
      render: (val) => {
        return (<span>{config.TradeType[val]}</span>)
      },
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      
      render: (val) => {
        return (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>);
      },
    },
    {
      title: '备注说明',
      dataIndex: 'remark',
    },
  ]

  monthReportColumns = [
    {
      title: '月份',
      dataIndex: 'ymonth',
    },
    {
      title: '收入总额',
      dataIndex: 'income',
    },
    {
      title: '支出总额',
      dataIndex: 'outcome',
    },
    {
      title: '合计',
      dataIndex: 'total',
      render: (val, record) => {
        const total = Number(record.income - record.outcome).toFixed(2)
        return (<span>{total}</span>)
      },
    },
  ]

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetch',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  handleMonthReportTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetchMonthReport',
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  handleTabChange = (key) => {
    this.setState({
      activeKey: key,
    });

    if (key === 'details') {
      this.loadList();
    } else {
      this.loadMonthReportList();
    }
  }

  loadList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetch',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }

  loadMonthReportList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financials/fetchMonthReport',
      payload: {
        page: 1,
        pageSize: 15,
      },
    });
  }

  componentDidMount() {
    this.loadList();
  }


  render() {

    const { financials, loadingFinancials, loadingFinancialsMonthReport } = this.props;
    // const { financials } = financials;
    const tabList = [{
      key: 'details',
      tab: '财务明细',
    }, {
      key: 'month_report',
      tab: '财务月报',
    }];

    return (
      <PageHeaderWrapper 
        title="财务列表"
        tabList={tabList}
        onTabChange={this.handleTabChange}
        tabDefaultActiveKey="details"
      >
        {
          this.state.activeKey === 'details' ? (
            <Card bordered={false}>
              <div className={styles.tableList}>
                <StandardTable
                  loading={loadingFinancials}
                  size="small"
                  data={financials.financials}
                  columns={this.columns}
                  onChange={this.handleTableChange}
                />
              </div>
              
            </Card>
          ) : (
            <Card bordered={false}>
              <div className={styles.tableList}>
                <StandardTable
                  size="small"
                  loading={loadingFinancialsMonthReport}
                  data={financials.month_report}
                  columns={this.monthReportColumns}
                  onChange={this.handleMonthReportTableChange}
                />
              </div>
              
            </Card>
          )
        }
        
      </PageHeaderWrapper>
    );
  }
}

export default ListView;

