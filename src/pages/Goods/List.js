/**
 * name: list
 */

import React, { PureComponent, Fragment } from 'react';
import styles from './List.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Form, Row, Icon, Col, Button, Input, Select, Avatar, Modal, Tag, Tooltip, Switch, Skeleton } from 'antd';
import StandardTable from '@/components/StandardTable';
import config from '@/config';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Uploader from '@/components/Uploader';
import SelectProduct from '@/components/Select/SelectProduct';
import router from 'umi/router';
import SelectProductCategory from '@/components/Select/SelectProductCategory';
import SelectAdvistor from '@/components/Select/SelectAdvistor';
import SelectProductLink from '@/components/Select/SelectProductLink';
import Editor from '@/components/Editor/editor';
import BraftEditor from 'braft-editor';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

@Form.create()
class UpdateForm extends PureComponent {

  // componentDidMount() {
  //   this.props.form.setFieldsValue({
  //     how_settle: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
  //   })
  // }

  render() {
    const { 
      modalVisible, 
      form,
      handleSubmit, 
      data,
      loading,
      handleModalVisible } = this.props;
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
        md: { span: 10 },
      },
    };
  
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
  
    const { getFieldDecorator, getFieldValue } = form;
  
    const getProductType = () => {
      return getFieldValue('product_type');
  
      // return productType === 2;
    }
  
    const okHandle = (e) => {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }
      
      form.validateFieldsAndScroll((err, fieldsValue) => {
        if (err) return;
        // console.log(fieldsValue, 'values');
        form.resetFields();
        if (typeof handleSubmit === 'function') {

          if (fieldsValue.preferential) {
            fieldsValue.preferential = fieldsValue.preferential.toHTML();
          }
          if (fieldsValue.how_settle) {
            fieldsValue.how_settle = fieldsValue.how_settle.toHTML();
          }

          if (fieldsValue.apply_condition) {
            fieldsValue.apply_condition = fieldsValue.apply_condition.toHTML();
          }

          if (fieldsValue.base_right) {
            fieldsValue.base_right = fieldsValue.base_right.toHTML();
          }

          if (fieldsValue.card_progress_img) {
            fieldsValue.card_progress_img = fieldsValue.card_progress_img.toHTML();
          }
          if (fieldsValue.benefits_b) {
            fieldsValue.benefits_b = fieldsValue.benefits_b.toHTML();
          }

          if (fieldsValue.benefits_c) {
            fieldsValue.benefits_c = fieldsValue.benefits_c.toHTML();
          }

          if (fieldsValue.require_condition) {
            fieldsValue.require_condition = fieldsValue.require_condition.toHTML();
          }

          if (fieldsValue.commission_standard) {
            fieldsValue.commission_standard = fieldsValue.commission_standard.toHTML();
          }
          // console.log(fieldsValue, 'fieldsValue');
          handleSubmit(fieldsValue);
        }
      });
    };
    return (
      <Modal
        wrapClassName="fullscreen-able"
        destroyOnClose
        title="修改"
        centered
        visible={modalVisible}
        footer={null}
        mask={false}
        style={{height: '100%'}}
        width="100%"
        onCancel={() => handleModalVisible()}
      >
        <Skeleton
          active
          loading={loading}
          paragraph={{
            rows: 10,
          }}
        >
        <Form
          onSubmit={okHandle} 
          hideRequiredMark 
          style={{ marginTop: 8 }}
        >
          {
            getProductType() === 3 ? (
              <>
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
                      <Option value={3}>POS机</Option>
                      <Option value={2}>贷款产品</Option>
                      <Option value={1}>信用卡产品</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="是否热门">
                  {getFieldDecorator('is_hot', {
                    initialValue: data.is_hot ? true : false,
                    rules: [{required: true, type: 'boolean'}]
                  })(<Switch checkedChildren={<Icon type="check" />} defaultChecked={data.is_hot} unCheckedChildren={<Icon type="close" />} />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="是否展示">
                  {getFieldDecorator('is_show', {
                    initialValue: data.is_show ? true : false,
                    rules: [{required: true, type: 'boolean'}]
                  })(<Switch checkedChildren={<Icon type="check" />} defaultChecked={data.is_show} unCheckedChildren={<Icon type="close" />} />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="广告主">
                  {getFieldDecorator('advertisers_obj', {
                    initialValue: data.advertisers_obj,
                    rules: [{ required: true, message: '请选择一个广告主' }],
                  })(
                    <SelectAdvistor />
                  )}
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
                  })(<Input placeholder="请输入金额" />)}
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
                    initialValue: data.bg_category || 1,
                    rules: [{ required: true, message: '请选择后台分类' }],
                  })(
                    <Select placeholder="后台分类">
                      <Option value={1}>秒到账</Option>
                      <Option value={2}>大额度</Option>
                      <Option value={3}>秒办卡</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="基本工资">
                  {getFieldDecorator('base_salary', {
                    initialValue: data.base_salary,
                    rules: [
                      { required: true, message: '请输入基本工资' },
                      {
                        pattern: config.NumberRegex,
                        message: '请输入正确的基本工资',
                      },
                    ],
                  })(<Input placeholder="基本工资" />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="平台奖励">
                  {getFieldDecorator('platform_award', {
                    initialValue: data.platform_award,
                    rules: [
                      { required: true, message: '请输入平台奖励' },
                      {
                        pattern: config.NumberRegex,
                        message: '请输入正确的平台奖励',
                      },
                    ],
                  })(<Input placeholder="平台奖励" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品金额">
                  {getFieldDecorator('pos_price', {
                    initialValue: data.pos_price,
                    rules: [
                      { required: true, message: '请输入商品金额' },
                      {
                        pattern: config.NumberRegex,
                        message: '请输入正确的商品金额',
                      },
                    ],
                  })(<Input placeholder="商品金额" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品押金">
                  {getFieldDecorator('pos_deposit', {
                    initialValue: data.pos_deposit,
                    rules: [
                      { required: true, message: '请输入商品押金' },
                      {
                        pattern: config.NumberRegex,
                        message: '请输入正确的商品押金',
                      },
                    ],
                  })(<Input placeholder="商品押金" />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="特色文案">
                  {getFieldDecorator('special_txt', {
                    initialValue: data.special_txt,
                    rules: [{ required: true, max: 255, message: '请填写产品名称' }],
                  })(
                    <Input placeholder="特色文案" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="特色标签">
                  {getFieldDecorator('special_tag', {
                    initialValue: data.special_tag,
                    rules: [{ required: true, max: 255, message: '请填写特色标签' }],
                  })(
                    <Input placeholder="特色标签" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="详情页头部图片">
                  {getFieldDecorator('detail_header_img', {
                    initialValue: data.detail_header_img,
                    rules: [{ required: true, message: '请上传详情页头部图片' }],
                  })(
                    <Uploader action={config.uploadPath} host={config.qiniu.host} />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="基本权益">
                  {getFieldDecorator('base_right', {
                    initialValue: BraftEditor.createEditorState(data.base_right),
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入基本权益');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(
                    // <Input.TextArea placeholder="基本权益" rows={3} />
                    <Editor placeholder="基本权益" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="办理流程">
                  {getFieldDecorator('handing_process', {
                    initialValue: data.handing_process,
                    rules: [{ required: true, message: '请上传办理流程' }],
                  })(
                    <Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="办理要求">
                  {getFieldDecorator('require_condition', {
                    initialValue: BraftEditor.createEditorState(data.require_condition),
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入办理要求');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(
                    // <Input.TextArea placeholder="基本权益" rows={3} />
                    <Editor placeholder="办理要求" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="产品优势B端">
                  {getFieldDecorator('benefits_b', {
                    initialValue: BraftEditor.createEditorState(data.benefits_b),
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入B端产品优势');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(
                    // <Input.TextArea placeholder="基本权益" rows={3} />
                    <Editor placeholder="B端产品优势" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="产品优势C端">
                  {getFieldDecorator('benefits_c', {
                    initialValue: BraftEditor.createEditorState(data.benefits_c),
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入C端产品优势');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(
                    // <Input.TextArea placeholder="基本权益" rows={3} />
                    <Editor placeholder="C端产品优势" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="产品海报">
                  {getFieldDecorator('product_poster', {
                    initialValue: data.product_poster,
                    rules: [{ required: true, message: '请上传产品海报' }],
                  })(
                    <Uploader action={config.uploadPath} host={config.qiniu.host} />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="分享的标题">
                  {getFieldDecorator('share_title', {
                    initialValue: data.share_title,
                    rules: [{ required: true, max: 200, message: '请填写分享的标题' }],
                  })(
                    <Input placeholder="分享的标题" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="分享的内容">
                  {getFieldDecorator('share_content', {
                    initialValue: data.share_content,
                    rules: [{ required: true, max: 200, message: '请填写分享的内容' }],
                  })(
                    <Input placeholder="分享的内容" />
                  )}
                </Form.Item>

                <Form.Item {...formItemLayout} label="分享的LOGO">
                  {getFieldDecorator('share_logo', {
                    initialValue: data.share_logo,
                    rules: [{ required: true, max: 200, message: '请填写分享的标题' }],
                  })(
                    <Uploader action={config.uploadPath} host={config.qiniu.host} />
                  )}
                </Form.Item>
              </>
            ) : (
            <>
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
                    <Option value={3}>POS机</Option>
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
                  <SelectProductCategory ptype={getFieldValue('product_type')}  />
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
                })(<Switch checkedChildren={<Icon type="check" />} defaultChecked={data.is_hot} unCheckedChildren={<Icon type="close" />} />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="是否展示">
                {getFieldDecorator('is_show', {
                  initialValue: data.is_show,
                  rules: [{required: true, type: 'boolean'}]
                })(<Switch checkedChildren={<Icon type="check" />} defaultChecked={data.is_show}  unCheckedChildren={<Icon type="close" />} />)}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="广告主">
                {getFieldDecorator('advertisers_obj', {
                  initialValue: data.advertisers_obj,
                  rules: [{ required: true, message: '请选择一个广告主' }],
                })(
                  <SelectAdvistor />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="是否上店铺可选">
                {getFieldDecorator('is_in_shop', {
                  initialValue: data.is_in_shop ? true : false,
                  rules: [{required: true, type: 'boolean'}]
                })(<Switch checkedChildren={<Icon type="check" />} defaultChecked={data.is_in_shop} unCheckedChildren={<Icon type="close" />} />)}
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
                })(<Input placeholder="请输入金额" />)}
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
                  initialValue: +data.bg_category,
                  rules: [{ required: true, message: '请选择后台分类' }],
                })(
                  <Select placeholder="后台分类">
                    <Option value={1}>秒到账</Option>
                    <Option value={2}>大额度</Option>
                    <Option value={3}>秒办卡</Option>
                  </Select>
                )}
              </Form.Item>
      
              {
                getProductType() === 2 ? (
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
                    })(<Input  placeholder="最高额度" />)}
                  </Form.Item>
                ) : null
              }
              
              {
                getProductType() === 2 ? (
                  <Form.Item {...formItemLayout} label="贷款额度">
                    {getFieldDecorator('loan_limit', {
                      initialValue: data.loan_limit,
                      rules: [
                        { required: true, message: '请输入贷款额度' },
                        {
                          pattern: /^(\d+)((?:\.\d+)?)$/,
                          message: '请输入正确的贷款额度',
                        },
                      ],
                    })(<Input  placeholder="额度" />)}
                  </Form.Item>
                ) : null
              }
              {
                getProductType() === 2 ? (
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
                ) : null
              }
              {
                getProductType() === 2 ? (
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
                ) : null
              }
      
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
      
              {
                getProductType() === 2 ? (
                  <Form.Item {...formItemLayout} label="申请条件">
                    {getFieldDecorator('apply_condition', {
                      initialValue: BraftEditor.createEditorState(data.apply_condition),
                      // rules: [
                      //   { required: false, max: 200, message: '请输入申请条件' },
                      // ],
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('请输入申请条件')
                          } else {
                            callback()
                          }
                        }
                      }],
                    })(<Editor placeholder="请输入申请条件" />)}
                  </Form.Item>
                ) : null
              }
      
              {
                getProductType() === 2 ? (
                  <Form.Item {...formItemLayout} label="申请流程图片">
                    {getFieldDecorator('apply_tp_img', {
                      initialValue: data.apply_tp_img,
                      rules: [{ required: true, message: '请上传申请流程图' }],
                    })(
                      <Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />
                    )}
                  </Form.Item>
                ) : null
              }
              
      
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
                {getFieldDecorator('unit', {
                  initialValue: data.unit,
                  rules: [
                    { required: true, max: 200, message: '请输入阶梯值单位' },
                  ],
                })(<Input placeholder="张/万" />)}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="阶梯值奖励单位">
                {getFieldDecorator('jl_unite', {
                  initialValue: data.jl_unite || '元',
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
                })(<Input  placeholder="输入商品利润价格" />)}
              </Form.Item>
      
              {
                getProductType() === 2 ? (
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
                ) : null
              }
      
              {
                getProductType() === 2 ? (
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
                ) : null
              }
      
              {
                getProductType() === 2 ? (
                  <Form.Item {...formItemLayout} label="注意事项">
                    {/* {getFieldDecorator('commission_standard', {
                      initialValue: data.commission_standard,
                      rules: [
                        { required: false, max: 100, message: '返佣标准' },
                      ],
                    })(<Input placeholder="输入返佣标准" />)} */}

                    {getFieldDecorator('commission_standard', {
                      initialValue: BraftEditor.createEditorState(data.commission_standard),
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('输入注意事项')
                          } else {
                            callback()
                          }
                        }
                      }],
                    })(
                      // <TextArea rows={3} placeholder="请输入申请条件" />
                      <Editor 
                        placeholder="输入注意事项" 
                      />
                    )}
                  </Form.Item>
                ) : null
              }
      
              {/* <Form.Item {...formItemLayout} label="绑定商品链接">
                {getFieldDecorator('product_link_obj', {
                  initialValue: data.product_link_obj,
                })(
                  <SelectProductLink ptype={getFieldValue('product_type')}  />
                )}
              </Form.Item> */}
      
              <Form.Item {...formItemLayout} label="绑定商品链接">
                {getFieldDecorator('product_link', {
                  initialValue: data.product_link,
                })(
                  <Input placeholder="请输入商品链接" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="特色文案">
                {getFieldDecorator('special_txt', {
                  initialValue: data.special_txt,
                  rules: [{ required: true, max: 255, message: '请填写产品名称' }],
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
                })(<Input  placeholder="阶梯A起始值" />)}
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
                })(<Input  placeholder="阶梯A结束值" />)}
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
                })(<Input  placeholder="阶梯B起始值" />)}
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
                })(<Input  placeholder="阶梯B结束值" />)}
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
                })(<Input  placeholder="阶梯C起始值" />)}
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
                })(<Input  placeholder="阶梯C结束值" />)}
              </Form.Item>
      
              {/* <Form.Item {...formItemLayout} label="月度工资">
                {getFieldDecorator('month_salary', {
                  initialValue: data.month_salary,
                  rules: [{ required: true, max: 100, message: '请填写月度工资' }],
                })(
                  <Input placeholder="月度工资" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="实时工资">
                {getFieldDecorator('salary', {
                  initialValue: data.salary,
                  rules: [{ required: true, max: 100, message: '请填写实时工资' }],
                })(
                  <Input placeholder="实时工资" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="月度工资描述">
                {getFieldDecorator('month_salary_desc', {
                  initialValue: data.month_salary_desc,
                  rules: [{ required: true, max: 500, message: '请填写月度工资描述' }],
                })(
                  <Input placeholder="月度工资描述" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="实时工资描述">
                {getFieldDecorator('salary_desc', {
                  initialValue: data.salary_desc,
                  rules: [{ required: true,  max: 500, message: '请填写实时工资描述' }],
                })(
                  <Input placeholder="实时工资描述" />
                )}
              </Form.Item> */}
      
              <Form.Item {...formItemLayout} label="阶梯A奖励">
                {getFieldDecorator('a_level_reward', {
                  initialValue: data.a_level_reward,
                  rules: [
                    { required: true, message: '请填写阶梯A奖励' },
                    {
                      pattern: config.RateRegex,
                      message: '请输入正确的奖励值 例: 0.10',
                    },
                  ],
                })(
                  <Input placeholder="阶梯A奖励" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="阶梯B奖励">
                {getFieldDecorator('b_level_reward', {
                  initialValue: data.b_level_reward,
                  rules: [
                    { required: true, message: '请填写阶梯B奖励' },
                    {
                      pattern: config.RateRegex,
                      message: '请输入正确的奖励值 例: 0.10',
                    },
                  ],
                })(
                  <Input placeholder="阶梯B奖励" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="阶梯C奖励">
                {getFieldDecorator('c_level_reward', {
                  initialValue: data.c_level_reward,
                  rules: [
                    { required: true, message: '请填写阶梯C奖励' },
                    {
                      pattern: config.RateRegex,
                      message: '请输入正确的奖励值 例: 0.10',
                    },
                  ],
                })(
                  <Input placeholder="阶梯C奖励" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="详情页头部图片">
                {getFieldDecorator('detail_header_img', {
                  initialValue: data.detail_header_img,
                  rules: [{ required: true, message: '请上传详情页头部图片' }],
                })(
                  <Uploader action={config.uploadPath} host={config.qiniu.host} />
                )}
              </Form.Item>
              {
                getProductType() === 1 ? (
                  <Form.Item {...formItemLayout} label="信用卡长图">
                    {getFieldDecorator('card_long_img', {
                      initialValue: data.card_long_img,
                      rules: [{ required: true, message: '请上传信用卡长图' }],
                    })(
                      <Uploader action={config.uploadPath} host={config.qiniu.host} />
                    )}
                  </Form.Item>
                ) : null
              }
      
              <Form.Item {...formItemLayout} label="产品海报">
                {getFieldDecorator('product_poster', {
                  initialValue: data.product_poster,
                  rules: [{ required: true, message: '请上传产品海报' }],
                })(
                  <Uploader action={config.uploadPath} host={config.qiniu.host} />
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
                  initialValue: BraftEditor.createEditorState(data.how_settle),
                  // rules: [{ required: true, max: 255, message: '请填写如何结算奖金' }],
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                      if (value.isEmpty()) {
                        callback('如何结算奖金')
                      } else {
                        callback()
                      }
                    }
                  }],
                })(
                  <Editor placeholder="如何结算奖金" />
                )}
              </Form.Item>
      
              <Form.Item {...formItemLayout} label="分享的标题">
                {getFieldDecorator('share_title', {
                  initialValue: data.share_title,
                  rules: [{ required: true, max: 200, message: '请填写分享的标题' }],
                })(
                  <Input placeholder="分享的标题" />
                )}
              </Form.Item>

              <Form.Item {...formItemLayout} label="分享的内容">
                {getFieldDecorator('share_content', {
                  initialValue: data.share_content,
                  rules: [{ required: true, max: 200, message: '请填写分享的内容' }],
                })(
                  <Input placeholder="分享的内容" />
                )}
              </Form.Item>

              <Form.Item {...formItemLayout} label="分享的LOGO">
                {getFieldDecorator('share_logo', {
                  initialValue: data.share_logo,
                  rules: [{ required: true, max: 200, message: '请填写分享的标题' }],
                })(
                  <Uploader action={config.uploadPath} host={config.qiniu.host} />
                )}
              </Form.Item>
      
              {/* {
                getProductType() === 1 ? (
                  <Form.Item {...formItemLayout} label="办卡流程图">
                    {getFieldDecorator('card_progress_img', {
                      initialValue: data.card_progress_img,
                      rules: [{ required: true, message: '请上传办卡流程图' }],
                    })(
                      <Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />
                    )}
                  </Form.Item>
                ) : null
              } */}
              {
                getProductType() === 1 ? (
                  <Form.Item {...formItemLayout} label="温馨提示">
                    {getFieldDecorator('card_progress_img', {
                      initialValue: BraftEditor.createEditorState(data.card_progress_img),
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('请输入温馨提示')
                          } else {
                            callback()
                          }
                        }
                      }],
                    })(
                      // <Uploader isSingle={false} action={config.uploadPath} host={config.qiniu.host} />
                      <Editor placeholder="温馨提示" />
                    )}
                  </Form.Item>
                ) : null
              }
              
              {
                getProductType() === 1 ? (
                  <Form.Item {...formItemLayout} label="基本权益">
                    {getFieldDecorator('base_right', {
                      initialValue: BraftEditor.createEditorState(data.base_right),
                      // rules: [{ required: true, max: 200, message: '请填写基本权益' }],
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('请输入基本权益')
                          } else {
                            callback()
                          }
                        }
                      }],
                    })(
                      <Editor placeholder="基本权益" />
                    )}
                  </Form.Item>
                ) : null
              }
      
              {
                getProductType() === 1 ? (
                  <Form.Item {...formItemLayout} label="优惠活动">
                    {getFieldDecorator('preferential', {
                      initialValue: BraftEditor.createEditorState(data.preferential),
                      // rules: [{ required: true, max: 200, message: '请填写优惠活动' }],
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                            callback('请输入优惠活动')
                          } else {
                            callback()
                          }
                        }
                      }],
                    })(
                      <Editor placeholder="优惠活动" />
                    )}
                  </Form.Item>
                ) : null
              }
            </>
            )
          }
          
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
              <FormattedMessage id="form.cancel" />
            </Button>
          </FormItem>
        </Form>
        </Skeleton>
      </Modal>
    );
  }
}

@connect(({ products, loading}) => ({
  products,
  loading: loading.models.products,
  loadingDetails: loading.effects['products/fetchDetails'],
  // loadingChilds: loading.effects['agents/fetchChilds'],
}))
@Form.create()
class ListView extends PureComponent {

  state = {
    createFormVisible: false,
    updateFormVisible: false,
    details: {},
  }

  columns = [
    {
      title: '产品ID',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '产品名称',
      dataIndex: 'product_name',
      width: 150,
    },
    {
      title: 'LOGO',
      dataIndex: 'logo',
      width: 150,
      render: (imgURL) => {
        const url = `${config.qiniu.host}/${imgURL}`;
        return (<Avatar shape="square" size={100} src={url} />);
      }
    },
    {
      title: '产品分类',
      dataIndex: 'product_type',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ProductType[val]}</Tag>);
      }
    },
    {
      title: '分类',
      dataIndex: 'bg_category',
      width: 150,
      render: (val) => {
        return (<Tag>{config.ProductBGCategory[val]}</Tag>)
      }
    },
    {
      title: '是否展示',
      dataIndex: 'is_show',
      width: 150,
      render: (val) => {
        return (<Tag color={+val === 1 ? config.colors.blue_active : config.colors.blue_normal}>{+val === 1 ? '是' : '否'}</Tag>)
      }
    },
    {
      title: '是否上店铺',
      dataIndex: 'is_in_shop',
      width: 150,
      render: (val) => {
        return (<Tag color={+val === 1 ? config.colors.blue_active : config.colors.blue_normal}>{+val === 1 ? '是' : '否'}</Tag>)
      }
    },

    {
      title: '商品状态',
      dataIndex: 'is_shelf',
      width: 200,
      render: (val) => {
        return (<Tag color={+val === 1 ? config.colors.success : config.colors.failed}>{+val === 1 ? '已上架' : '已下架'}</Tag>)
      }
    },

    {
      title: '更新时间',
      dataIndex: 'modify_time',
      render: (val) => {
        return (<span>{moment(val).utcOffset(-8).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    },

    {
      title: '更新人',
      dataIndex: 'update_admin',
    },
    
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={this.prepareUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={+record.is_shelf === 0 ? this.handleOnShelf(record.id) : this.handleDisableShelf(record.id)}>{+record.is_shelf === 0 ? '上架' : '下架'}</a>
        </Fragment>
      ),
    },
  ]

  toggleUpdateForm = () => {
    this.setState({
      updateFormVisible: !this.state.updateFormVisible,
    });
  }

  handleOnShelf = (id) => e => {
    e.preventDefault();

    this.props.dispatch({
      type: 'products/onShelf',
      payload: {
        id,
      },
    });
  }

  handleDisableShelf = id => e => {
    e.preventDefault();

    this.props.dispatch({
      type: 'products/disableShelf',
      payload: {
        id,
      },
    });
  }

  prepareUpdate = record => e => {
    if (e) {
      e.preventDefault();
    }
    

    const { id } = record;
    this.setState({
      updateID: id,
      details: record,
    });

    this.props.dispatch({
      type: 'products/fetchDetails',
      payload: {
        id,
      },
    });

    this.toggleUpdateForm();
  }

  toggleCreateForm = () => {
    this.setState({
      createFormVisible: !this.state.createFormVisible,
    });
  }

  goToCreate = (e) => {
    e.preventDefault();
    router.push('/Goods/Add/Common');
  }

  handleCreate = (values) => {
    const { dispatch } = this.props;
    
    dispatch({
      type: 'product_configs/create',
      payload: values,
    }).then(() => {
      this.toggleCreateForm();
    });
  }

  handleUpdate = (values) => {
    const { dispatch } = this.props;
    values.id = this.state.updateID;
    console.log(values, '=====');
    dispatch({
      type: 'products/update',
      payload: values,
    }).then(() => {
      this.toggleUpdateForm();
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
      payload: {
        category_type: 2,
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        page: 1,
        pageSize: 15,
      };

      if (values.filter_time && values.filter_time.length > 0) {
        values.start_time = values.filter_time[0].format('YYYY-MM-DD HH:mm:ss');
        values.end_time = values.filter_time[1].format('YYYY-MM-DD HH:mm:ss');
        delete values.filter_time;
      }

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'products/fetch',
        payload: values,
      });
    });
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetch',
      payload: {
        category_type: 2,
        page: 1,
        pageSize: 15,
      },
    });
  }

  renderQueryForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 0, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="商品类型">
              {getFieldDecorator('product_type', {
                initialValue: null,
              })(
                <Select>
                  <Option value={null}>全部</Option>
                  <Option value={1}>信用卡</Option>
                  <Option value={2}>贷款</Option>
                  <Option value={3}>POS机</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品ID">
              {getFieldDecorator('product_id')(
                <Input placeholder="商品ID" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }} className={styles.submitButtons}>
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
    const { 
      products: {
        data,
        details,
      },
      loading,
      loadingDetails,
    } = this.props
    return (
      <PageHeaderWrapper title="商品列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.goToCreate}>
                新增
              </Button>
            </div>
            <StandardTable
              size="small"
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleTableChange}
              scroll={{ x: 1700 }}
            />
          </div>
        </Card>
        <UpdateForm
          modalVisible={this.state.updateFormVisible}
          handleModalVisible={this.toggleUpdateForm}
          handleSubmit={this.handleUpdate}
          loading={loadingDetails}
          data={details}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ListView;
