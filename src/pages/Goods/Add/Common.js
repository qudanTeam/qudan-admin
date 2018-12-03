/**
 * name: 第一步
 */

import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Icon, Switch, Tooltip } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

@connect(({ goodAdd }) => ({
  data: goodAdd.step,
}))
@Form.create()
class CommonForm extends React.PureComponent {

  state = {
    productType: 'loans',
  }

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/Goods/Add/Details');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="产品名称">
            {getFieldDecorator('productName', {
              initialValue: data.productName,
              rules: [{ required: true, message: '请填写产品名称' }],
            })(
              <Input placeholder="产品名称" />
              // <Select placeholder="test@example.com">
              //   <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
              // </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品类型">
            {getFieldDecorator('productType', {
              initialValue: data.productType,
              rules: [{ required: true, message: '请填写一个类型' }],
            })(
              <Select defaultValue="loans" placeholder="loans">
                <Option value="loans">贷款产品</Option>
                <Option value="creditCard">信用卡产品</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            {...formItemLayout} 
            label={
              <span>
                产品分类 &nbsp;
                <em className={styles.optional}>
                  <Tooltip title="信用卡为关联银行信息-影响进度查询，贷款关联贷款分类标签-影响商品列表标签显示">
                    <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            }
          >
            {getFieldDecorator('productType', {
              initialValue: data.productCate,
              rules: [{ required: true, message: '请选择一个产品分类' }],
            })(
              <Select defaultValue="cate1" placeholder="cate1">
                <Option value="cate1">分类一</Option>
                <Option value="cate2">分类二</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否热门">
            {getFieldDecorator('isHot', {
              initialValue: data.isHot,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否展示">
            {getFieldDecorator('isShow', {
              initialValue: data.isShow,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="广告主">
            {getFieldDecorator('advertisers', {
              initialValue: data.advertisers,
              rules: [{ required: true, message: '请选择一个广告主' }],
            })(
              <Select defaultValue="advertisers1" placeholder="cate1">
                <Option value="advertisers1">广告主一</Option>
                <Option value="advertisers2">广告主二</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="是否上店铺可选">
            {getFieldDecorator('isStoreOption', {
              initialValue: data.isStoreOption,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="奖金">
            {getFieldDecorator('bonus', {
              initialValue: data.bonus,
              rules: [
                { required: true, message: '请输入奖金金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="排序">
            {getFieldDecorator('sort', {
              initialValue: data.sort,
              rules: [
                { required: true, message: '请输入排序序号' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入排序序号',
                },
              ],
            })(<Input placeholder="序号" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="后台分类">
            {getFieldDecorator('backEndCate', {
              initialValue: data.backEndCate,
              rules: [{ required: true, message: '请选择后台分类' }],
            })(
              <Select defaultValue="backEndCate1" placeholder="cate1">
                <Option value="backEndCate1">秒到账</Option>
                <Option value="backEndCate2">大额度</Option>
                <Option value="backEndCate3">秒办卡</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="贷款最高额度">
            {getFieldDecorator('topLoanLimit', {
              initialValue: data.topLoanLimit,
              rules: [
                { required: true, message: '请输入贷款最高额度' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入正确的贷款最高额度',
                },
              ],
            })(<Input prefix="¥" placeholder="最高额度" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="贷款额度">
            {getFieldDecorator('loanLimit', {
              initialValue: data.loanLimit,
              rules: [
                { required: true, message: '请输入贷款额度' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入正确的贷款额度',
                },
              ],
            })(<Input prefix="¥" placeholder="额度" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="月利率">
            {getFieldDecorator('monthRate', {
              initialValue: data.monthRate,
              rules: [
                { required: true, message: '请输入月利率' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入月利率',
                },
              ],
            })(<Input placeholder="请输入月利率" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="日利率">
            {getFieldDecorator('dailyRate', {
              initialValue: data.dailyRate,
              rules: [
                { required: false, message: '请输入日利率' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入日利率',
                },
              ],
            })(<Input placeholder="请输入日利率" />)}
          </Form.Item>

          <Form.Item 
            {...formItemLayout} 
            label={
              <span>
                特色标签&nbsp;
                <em className={styles.optional}>
                  <Tooltip title="商品详情页-标题旁的标签显示">
                    <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            } 
          >
            {getFieldDecorator('specialLabel', {
              initialValue: data.specialLabel,
              rules: [{ required: false, }],
            })(
              <Input placeholder="特色标签" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="通过率">
            {getFieldDecorator('passRate', {
              initialValue: data.passRate,
              rules: [{ required: true, message: '请填写通过率' }],
            })(
              <Input placeholder="通过率" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="申请人数">
            {getFieldDecorator('monthRate', {
              initialValue: data.monthRate,
              rules: [
                { required: true, message: '请输入申请人数' },
                {
                  pattern: /^(\d+)$/,
                  message: '请输入正确的申请人数',
                },
              ],
            })(<Input placeholder="请输入申请人数" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="申请条件">
            {getFieldDecorator('applyCondition', {
              initialValue: data.applyCondition,
              rules: [
                { required: false, message: '请输入申请条件' },
              ],
            })(<TextArea rows={3} placeholder="请输入申请条件" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="基本工资">
            {getFieldDecorator('baseSalary', {
              initialValue: data.baseSalary,
              rules: [
                { required: true, message: '请输入基本工资' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入正确的贷款额度',
                },
              ],
            })(<Input placeholder="额度" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="阶梯值单位">
            {getFieldDecorator('unite', {
              initialValue: data.unite,
              rules: [
                { required: true, message: '请输入阶梯值单位' },
              ],
            })(<Input placeholder="张/万" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="阶梯值奖励单位">
            {getFieldDecorator('rewardUnite', {
              initialValue: data.rewardUnite,
              rules: [
                { required: true, message: '请输入阶梯值奖励单位' },
              ],
            })(<Input placeholder="元" />)}
          </Form.Item>

          <Form.Item 
            {...formItemLayout} 
            label={
              <span>
                商品利润价格&nbsp;
                <em className={styles.optional}>
                  <Tooltip title="用来计算此商品的总利润！">
                    <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            }
          >
            {getFieldDecorator('productProfitPrice', {
              initialValue: data.productProfitPrice,
              rules: [
                { required: false, message: '请输入商品利润价格' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入商品利润价格',
                },
              ],
            })(<Input prefix="¥" placeholder="输入商品利润价格" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="期限开始">
            {getFieldDecorator('durationStart', {
              initialValue: data.durationStart,
              rules: [
                { required: false, message: '请输入期限开始' },
                {
                  pattern: /^(\d+)$/,
                  message: '请输入正确的数值',
                },
              ],
            })(<Input placeholder="期限开始" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="期限结束">
            {getFieldDecorator('durationEnd', {
              initialValue: data.durationStart,
              rules: [
                { required: false, message: '请输入期限结束' },
                {
                  pattern: /^(\d+)$/,
                  message: '请输入正确的数值',
                },
              ],
            })(<Input placeholder="期限结束" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="返佣标准">
            {getFieldDecorator('rebateStandard', {
              initialValue: data.rebateStandard,
              rules: [
                { required: false, message: '返佣标准' },
              ],
            })(<Input placeholder="输入返佣标准" />)}
          </Form.Item>

          
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>信用卡工资计算规则</h4>
          <p>
          基本工资*实际开卡数量+阶梯工资*实际开卡数量（判断实际开卡数量在哪个阶梯工资区间）。
          </p>
          <h4>贷款工资计算规则</h4>
          <p>
          基本工资比例*实际贷款金额+阶梯工资比例*实际贷款金额（判断实际贷款金额在哪个阶梯工资区间），每个月1-31日，当月累计，次月重置计算。
          </p>
        </div>
      </Fragment>
    );
  }
}

export default CommonForm;
