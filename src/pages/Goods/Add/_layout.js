/**
 * name: 添加商品
 * hideChildrenInMenu: true
 */

import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Steps } from 'antd';
import styles from './_layout.less';
import router from 'umi/router';

const { Step } = Steps

class AddView extends PureComponent {

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'Common':
        return 0;
      case 'Details':
        return 1;
      case 'Result':
        return 2;
      default:
        return 0;
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    if (pathname === '/Goods/Add') {
      router.push('/Goods/Add/Common');
    }
  }

  render() {

    const { children, location } = this.props;
    return (
      <PageHeaderWrapper
        title="添加商品"
        tabActiveKey={location.pathname}
        content="准备开始发布您的商品吧"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写通用信息" />
              <Step title="录入商品详情" />
              <Step title="完成" />
            </Steps>
          </Fragment>
          {children}
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default AddView;