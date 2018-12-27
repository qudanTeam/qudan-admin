/**
 * name: 第一步
 */

import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, Icon, Switch, Tooltip } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import SelectAdvistor from '@/components/Select/SelectAdvistor';
import SelectProductCategory from '@/components/Select/SelectProductCategory';
import Uploader from '@/components/Uploader';
import config from '@/config';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ goodAdd }) => ({
  data: goodAdd.productInfo,
}))
@Form.create()
class CommonForm extends React.PureComponent {

  state = {
    productType: 'loans',
  }

  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'goodAdd/saveFormData',
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
            {getFieldDecorator('product_name', {
              initialValue: data.product_name,
              rules: [{ required: true, max: 100, message: '请填写产品名称' }],
            })(
              <Input placeholder="产品名称" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="产品LOGO">
            {getFieldDecorator('logo', {
              initialValue: data.logo,
              rules: [{ required: true, message: '请上传产品LOGO' }],
            })(
              <Uploader action={config.uploadPath} host={config.qiniu.host} />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="产品类型">
            {getFieldDecorator('product_type', {
              initialValue: data.product_type,
              rules: [{ required: true, message: '请填写一个类型' }],
            })(
              <Select placeholder="选择产品类型">
                <Option value={2}>贷款产品</Option>
                <Option value={1}>信用卡产品</Option>
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
            {getFieldDecorator('product_category', {
              initialValue: data.product_category,
              rules: [{ required: true, message: '请选择一个产品分类' }],
            })(
              <SelectProductCategory ptype={getFieldValue('product_type')} />
              // <Select placeholder="选择产品分类">
              //   <Option value={1}>秒到账</Option>
              //   <Option value={2}>大额度</Option>
              //   <Option value={3}>秒办卡</Option>
              // </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否热门">
            {getFieldDecorator('is_hot', {
              initialValue: data.is_hot,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否展示">
            {getFieldDecorator('is_show', {
              initialValue: data.is_show,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="广告主">
            {getFieldDecorator('advertisers_obj', {
              initialValue: data.advertisers,
              rules: [{ required: true, message: '请选择一个广告主' }],
            })(
              <SelectAdvistor />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="是否上店铺可选">
            {getFieldDecorator('is_in_shop', {
              initialValue: data.is_in_shop,
              rules: [{required: true, type: 'boolean'}]
            })(<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="奖金">
            {getFieldDecorator('commission', {
              initialValue: data.commission,
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
            {getFieldDecorator('sort_val', {
              initialValue: data.sort_val,
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
            {getFieldDecorator('bg_category', {
              initialValue: data.bg_category,
              rules: [{ required: true, message: '请选择后台分类' }],
            })(
              <Select placeholder="后台分类">
                <Option value={1}>秒到账</Option>
                <Option value={2}>大额度</Option>
                <Option value={3}>秒办卡</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="贷款最高额度">
            {getFieldDecorator('amount_line', {
              initialValue: data.amount_line,
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
            {getFieldDecorator('month_rate', {
              initialValue: data.month_rate,
              rules: [
                { required: true, message: '请输入月利率' },
                {
                  pattern: config.RateRegex,
                  message: '请输入正确的月利率 例: 0.10',
                },
              ],
            })(<Input placeholder="请输入月利率" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="日利率">
            {getFieldDecorator('day_rate', {
              initialValue: data.day_rate,
              rules: [
                { required: false, message: '请输入日利率' },
                {
                  pattern: config.RateRegex,
                  message: '请输入正确的日利率 例: 0.10',
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
            {getFieldDecorator('special_tag', {
              initialValue: data.special_tag,
              rules: [{ required: false, }],
            })(
              <Input placeholder="特色标签" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="通过率">
            {getFieldDecorator('allow_rate', {
              initialValue: data.allow_rate,
              rules: [
                { required: true, message: '请填写通过率' },
                {
                  pattern: config.RateRegex,
                  message: '请输入正确的通过率 例: 0.10',
                },
              ],
            })(
              <Input placeholder="通过率" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="申请人数">
            {getFieldDecorator('apply_num', {
              initialValue: data.apply_num,
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
            {getFieldDecorator('apply_condition', {
              initialValue: data.apply_condition,
              rules: [
                { required: false, max: 200, message: '请输入申请条件' },
              ],
            })(<TextArea rows={3} placeholder="请输入申请条件" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="申请流程图片">
            {getFieldDecorator('apply_tp_img', {
              initialValue: data.apply_tp_img,
              rules: [{ required: true, message: '请上传申请流程图' }],
            })(
              <Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="基本工资">
            {getFieldDecorator('base_salary', {
              initialValue: data.base_salary,
              rules: [
                { required: true, message: '请输入基本工资' },
                {
                  pattern: config.RateRegex,
                  message: '请输入正确的基本工资',
                },
              ],
            })(<Input placeholder="基本工资" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="阶梯值单位">
            {getFieldDecorator('unite', {
              initialValue: data.unite,
              rules: [
                { required: true, max: 200, message: '请输入阶梯值单位' },
              ],
            })(<Input placeholder="张/万" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="阶梯值奖励单位">
            {getFieldDecorator('jl_unite', {
              initialValue: data.jl_unite,
              rules: [
                { required: true, max: 200, message: '请输入阶梯值奖励单位' },
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
            {getFieldDecorator('burundian', {
              initialValue: data.burundian,
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
            {getFieldDecorator('expire_begin', {
              initialValue: data.expire_begin,
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
            {getFieldDecorator('expire_end', {
              initialValue: data.expire_end,
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
            {getFieldDecorator('commission_standard', {
              initialValue: data.commission_standard,
              rules: [
                { required: false, max: 100, message: '返佣标准' },
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
