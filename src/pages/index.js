/**
 * title: 首页
 * authority:
 *   - admin
 */

// import styles from './index.css';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ loading }) => ({
  loading,
}))
class HomeView extends React.Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    router.push('/Goods/List');
  }

  render() {
    return (
      <div>
        首页
      </div>
    )
  }
}

export default HomeView;