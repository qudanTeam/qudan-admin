/**
 * name: 广告主
 */

import React, { PureComponent } from 'react';
import styles from './Advertisers.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Icon, Col, Button, Input } from 'antd';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;

@Form.create()
class AdvertiserView extends PureComponent {

  columns = [
    {
      title: '用户编号',
      dataIndex: 'userNum',
      width: 150,
    },
    {
      title: '广告主名称',
      dataIndex: 'advertiserName',
      width: 150,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '微信号',
      dataIndex: 'wechat',
      width: 150,
    },
    {
      title: '投放商品数量',
      dataIndex: 'goodsNum',
      width: 150,
    },
    {
      title: '入驻时间',
      dataIndex: 'joinTime',
      width: 150,
    },
  ]

  handleTableChange = () => {

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
              {getFieldDecorator('userNum')(<Input placeholder="搜索: 用户编号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem>
              {getFieldDecorator('mobile')(<Input placeholder="搜索: 广告主名称" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem >
              {getFieldDecorator('mobile')(<Input placeholder="搜索: 手机号" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem>
              {getFieldDecorator('mobile')(<Input placeholder="搜索: 微信" />)}
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
    return (
      <PageHeaderWrapper title="广告主">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              size="small"
              data={{}}
              columns={this.columns}
              onChange={this.handleTableChange}
            />
          </div>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvertiserView;
