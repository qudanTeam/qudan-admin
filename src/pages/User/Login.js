import React from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import styles from './Login.less';
import { Alert, Row, Col, Form, Input, Icon, Button, Avatar } from 'antd';
import { connect } from 'dva';
import IronSpin from '@/components/IronSpin';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class Login extends React.Component {

  submitLogin = (values) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'login/login',
      payload: {
        ...values,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(['username', 'password'], { force: true }, (err, values) => {
      if (!err) {
        this.submitLogin(values); 
      }
    })
  }

  renderAlertMsg = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  )

  render() {
    const { 
      form: {
        getFieldDecorator,
      },
      login,
      submitting,
    } = this.props;

    return (
      <div className={`${styles.loginForm}`}>
        <Row align="middle" justify="center">
          <Col offset={7} span={10}>
            <h2 style={{ textAlign: 'center' }}>
              <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            </h2>
            <div className={`${styles.segment} ${styles.formShadow}`}>
              <Form onSubmit={this.handleSubmit}>
                {login.status === 'error' && 
                login.type === 'account' && 
                !submitting && this.renderAlertMsg(formatMessage({ id: 'app.login.message-invalid-credentials'}))}
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的用户名',
                      },
                    ],
                  })(<Input name="username" size="large" prefix={<Icon type="user" />} type="text" placeholder="账户" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的密码',
                      },
                    ],
                  })(<Input name="password" size="large" prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button size="large" style={{ width: '100%'}} type="primary" htmlType="submit">
                    {submitting ? <><IronSpin /> <FormattedMessage id="app.login.logining" /> </> :
                    <FormattedMessage id="app.login.login" />}
                  </Button>
                </Form.Item>
              </Form>
            </div>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
