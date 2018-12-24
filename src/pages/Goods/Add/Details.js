/**
 * name: 第二步
 */

import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Select, Divider } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';
import Uploader from '@/components/Uploader';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ goodAdd, loading }) => ({
  submitting: loading.effects['goodAdd/submitStepForm'],
  data: goodAdd.step,
}))
@Form.create()
class DetailsForm extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/form/step-form/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} label="特色文案">
          {getFieldDecorator('special_txt', {
            initialValue: data.special_txt,
            rules: [{ required: true, message: '请填写产品名称' }],
          })(
            <Input placeholder="特色文案" />
          )}
        </Form.Item>

        {/* <Form.Item {...formItemLayout} label="产品海报">
          {getFieldDecorator('product_show_img', {
            initialValue: data.product_show_img,
            rules: [{ required: true, message: '请填写产品名称' }],
          })(
            <Uploader />
          )}
        </Form.Item> */}

        <Form.Item {...formItemLayout} label="阶梯A起始值">
          {getFieldDecorator('a_begin', {
            initialValue: data.a_begin,
            rules: [
              { required: true, message: '请输入阶梯A起始值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯A起始值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯A起始值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯A结束值">
          {getFieldDecorator('a_limit', {
            initialValue: data.a_limit,
            rules: [
              { required: true, message: '请输入阶梯A结束值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯A结束值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯A结束值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯B起始值">
          {getFieldDecorator('b_begin', {
            initialValue: data.b_begin,
            rules: [
              { required: true, message: '请输入阶梯B起始值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯B起始值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯B起始值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯B结束值">
          {getFieldDecorator('b_limit', {
            initialValue: data.b_limit,
            rules: [
              { required: true, message: '请输入阶梯B结束值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯B结束值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯B结束值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯C起始值">
          {getFieldDecorator('c_start', {
            initialValue: data.c_start,
            rules: [
              { required: true, message: '请输入阶梯C起始值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯C起始值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯C起始值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯C结束值">
          {getFieldDecorator('c_limit', {
            initialValue: data.c_limit,
            rules: [
              { required: true, message: '请输入阶梯C结束值' },
              {
                pattern: /^(\d+)((?:\.\d+)?)$/,
                message: '请输入正确的阶梯C结束值',
              },
            ],
          })(<Input prefix="¥" placeholder="阶梯C结束值" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="月度工资">
          {getFieldDecorator('month_salary', {
            initialValue: data.month_salary,
            rules: [{ required: true, message: '请填写月度工资' }],
          })(
            <Input placeholder="月度工资" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="实时工资">
          {getFieldDecorator('salary', {
            initialValue: data.salary,
            rules: [{ required: true, message: '请填写实时工资' }],
          })(
            <Input placeholder="实时工资" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="月度工资描述">
          {getFieldDecorator('month_salary_desc', {
            initialValue: data.month_salary_desc,
            rules: [{ required: true, message: '请填写月度工资描述' }],
          })(
            <Input placeholder="月度工资描述" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="实时工资描述">
          {getFieldDecorator('salary_desc', {
            initialValue: data.salary_desc,
            rules: [{ required: true, message: '请填写实时工资描述' }],
          })(
            <Input placeholder="实时工资描述" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯A奖励">
          {getFieldDecorator('a_level_reward', {
            initialValue: data.a_level_reward,
            rules: [{ required: true, message: '请填写阶梯A奖励' }],
          })(
            <Input placeholder="阶梯A奖励" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯B奖励">
          {getFieldDecorator('b_level_reward', {
            initialValue: data.b_level_reward,
            rules: [{ required: true, message: '请填写阶梯B奖励' }],
          })(
            <Input placeholder="阶梯B奖励" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="阶梯C奖励">
          {getFieldDecorator('c_level_reward', {
            initialValue: data.c_level_reward,
            rules: [{ required: true, message: '请填写阶梯C奖励' }],
          })(
            <Input placeholder="阶梯C奖励" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="详情页头部图片">
          {getFieldDecorator('detail_header_img', {
            initialValue: data.detail_header_img,
            rules: [{ required: true, message: '请上传详情页头部图片' }],
          })(
            <Uploader />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="信用卡长图">
          {getFieldDecorator('card_long_img', {
            initialValue: data.card_long_img,
            rules: [{ required: true, message: '请上传信用卡长图' }],
          })(
            <Uploader />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="产品展示图">
          {getFieldDecorator('product_show_img', {
            initialValue: data.product_show_img,
            rules: [{ required: true, message: '请上传产品展示图' }],
          })(
            <Uploader />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="结算内容显示">
          {getFieldDecorator('settlement_type', {
            initialValue: data.settlement_type,
            rules: [{ required: true, message: '请填写一个类型' }],
          })(
            <Select >
              <Option value={1}>实时结</Option>
              <Option value={2}>T+1结</Option>
              <Option value={3}>T+2结</Option>
              <Option value={4}>T+3结</Option>
              <Option value={5}>每周一结</Option>
              <Option value={6}>每周二结</Option>
              <Option value={7}>每周三结</Option>
              <Option value={8}>每周四结</Option>
              <Option value={9}>每周五结</Option>
              <Option value={10}>次月5-15日结</Option>
              <Option value={11}>次月20-25结</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="如何结算奖金">
          {getFieldDecorator('how_settle', {
            initialValue: data.how_settle,
            rules: [{ required: true, message: '请填写如何结算奖金' }],
          })(
            <TextArea rows={3} placeholder="如何结算奖金" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="分享内容(分享的标题)">
          {getFieldDecorator('share_title', {
            initialValue: data.share_title,
            rules: [{ required: true, message: '请填写分享内容' }],
          })(
            <Input placeholder="分享内容" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="办卡流程图">
          {getFieldDecorator('card_progress_img', {
            initialValue: data.card_progress_img,
            rules: [{ required: true, message: '请上传办卡流程图' }],
          })(
            <Uploader />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="基本权益">
          {getFieldDecorator('base_right', {
            initialValue: data.base_right,
            rules: [{ required: true, message: '请填写基本权益' }],
          })(
            <Input placeholder="基本权益" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="优惠活动">
          {getFieldDecorator('preferential', {
            initialValue: data.preferential,
            rules: [{ required: true, message: '请填写优惠活动' }],
          })(
            <Input placeholder="优惠活动" />
          )}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default DetailsForm;
