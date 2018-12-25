/**
 * name: 结果
 */

import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ goodAdd }) => ({
  data: goodAdd.productInfo,
}))
class ResultView extends React.PureComponent {

  handleAddNext = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch({
      type: 'goodAdd/clearProduct',
    });
    
    router.push('/Goods/Add/Common');
  }

  toProductList = (e) => {
    e.preventDefault();

    router.push('/Goods/List');
  }

  render() {
    const { data } = this.props;

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={this.handleAddNext}>
          再加一个
        </Button>
        <Button onClick={this.toProductList}>查看商品列表</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="商品添加成功"
        description="快去商品列表上架商品吧！"
        // extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default ResultView;
