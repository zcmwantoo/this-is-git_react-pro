import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message } from 'antd';
import './register.css';
import { toIndex } from '../api'
import { getCode,duplicateName,registeredAccount} from '../api';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
            confirmDirty: false,
            emailValue:'',
            message:'输入的邮箱无效',
            loading:false,
            disabled:false,//按钮是否不可以点击
            getCodeText:'获取验证码',//
			timeNum:30,
			passIsTrue:'success',//判断密码是否合法
			passMessage:'',//密码提示信息
			hasFeedbackIsTrue:false,//密码输入框图标
			twoPassTrue:false,//确认密码图标
			userNameFee:false,//用户名图标
			userNameIsTrue:'success',//用户名是否合法
			userNameMessage:'',//用户名提示信息
			successRegister:false,	//终极验证用户名
			successPassRegister:false,//密码
			registerCode:''	,//验证码
			codeMessage:'',//'验证码提示信息'
			codeIsTrue:'success',//验证码是否正确
		};
	}
	// 判断第一次输入的密码是否符合校验
	passBlur = () => {
		var reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ ;
		const form = this.props.form;
		const thisPass = form.getFieldValue('password')
		console.log(thisPass)
		this.setState({
			hasFeedbackIsTrue:true
		})
		if(thisPass){
			reg.test(thisPass)?this.setState({
				passIsTrue:'success',
				passMessage:'',
				successPassRegister:true
			}):this.setState({
				passIsTrue:'error',
				passMessage:'请输入符合规范的密码',
				successPassRegister:false
			})
		}else{
			this.setState({
				passIsTrue:'error',
				passMessage:'请输入密码'
			})
		}
	}
	// 判断用户名是否存在，是否规范
	nameIsTrue = () => {
		
		const res = /^[a-zA-Z]\w{5,11}$/;
		const form = this.props.form;
		const userName = form.getFieldValue('userName')
		if(userName) {
			if(res.test(userName)){
				const that = this
				// 调接口，验证是否有重名
				axios.get(duplicateName, {
					params: {
						username: userName,
					}
				}).then(function (response) {
					console.log(response);
					response.data.code == 200?that.setState({
						userNameFee:true,
						userNameIsTrue:'success',
						userNameMessage:'',
						successRegister:true
					}):that.setState({
						userNameFee:true,
						userNameIsTrue:'error',
						userNameMessage:response.data.message,
						successRegister:false
					})
					   
				}).catch(function (error) {
					that.setState({
						successRegister:false
					})
					alert(error)
						
				});
			}else{
				
				this.setState({
					userNameFee:true,
					userNameIsTrue:'error',
					userNameMessage:'用户名不符合'
				})
			}
		}else{
			this.setState({
				userNameFee:true,
				userNameIsTrue:'error',
				userNameMessage:'请输入用户名'
			})
		}
	}
	//
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};
	compareToFirstPassword = (rule, value, callback) => {
		this.setState({
			twoPassTrue:true
		})
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('你输入的两个密码不一致!');
		} else {
			callback();
		}
	};
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	//
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
		return (
			<div className="register-body">
				<h2>注册新用户</h2>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item
						label={
							<span>
								用户名&nbsp;
								<Tooltip title="只能为英文或数字，且不能以数字打头，长度为6-12个字符">
									<Icon type="exclamation-circle" />
								</Tooltip>
							</span>
						} hasFeedback={this.state.userNameFee} validateStatus={this.state.userNameIsTrue} help={this.state.userNameMessage}
					>
						{getFieldDecorator('userName', { rules: [ { required: true, message: '请输入用户名!' } ] })(
							<Input placeholder="用户名" onBlur={() => {this.nameIsTrue()}}/>
						)}
					</Form.Item>
					<Form.Item label={
							<span>
								密码&nbsp;
								<Tooltip title="请输入6-16位英文，数字，字符（空格除外）">
									<Icon type="exclamation-circle" />
								</Tooltip>
							</span>
						} hasFeedback={this.state.hasFeedbackIsTrue} validateStatus={this.state.passIsTrue} help={this.state.passMessage}>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: '请输入密码!'
								},
								{
									validator: this.validateToNextPassword
								}
							]
						})(<Input type="password" onBlur={() => {this.passBlur()}}/>)}
					</Form.Item>
					<Form.Item label="确认密码" hasFeedback={this.state.twoPassTrue}>
						{getFieldDecorator('confirm', {
							rules: [
								{
									required: true,
									message: '请确认你的密码!'
								},
								{
									validator: this.compareToFirstPassword
								}
							]
						})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
					<Form.Item label={
							<span>
								邮箱&nbsp;
								<Tooltip title="请输入正确的电子邮箱地址">
									<Icon type="exclamation-circle" />
								</Tooltip>
							</span>
						} hasFeedback>
                    
						{getFieldDecorator('email', {
							rules: [
								{
									type: 'email',
									message: this.state.message
								},
								{
									required: true,
									message: '请输入你的邮箱!'
								},{
                                    validator: this.comEmail
                                }
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="验证码" extra="确保验证码输入无误才能注册账号." help={this.state.codeMessage} validateStatus={this.state.codeIsTrue}>
						<Row gutter={8}>
							<Col span={12}>
								{getFieldDecorator('captcha', {
									rules: [ { required: true, message: '请输入验证码!' } ]
								})(<Input />)}
							</Col>
							<Col span={12}>
								<Button onClick={() => {this.getCode()}} loading={this.state.loading} disabled={this.state.disabled}>{this.state.getCodeText}</Button>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							注册
						</Button>
                        <div>我有账号？<a onClick={() => {this.toLogin()}}>返回登录</a></div>
					</Form.Item>
				</Form>
			</div>
		);
	}
	//
	handleSubmit = (e) => {
		e.preventDefault();
		const form = this.props.form;
		const thisPass = form.getFieldValue('password')
		const userName = form.getFieldValue('userName')
		const code = form.getFieldValue('captcha')
		if(!thisPass) {
			this.setState({
				passIsTrue:'error',
				passMessage:'请输入密码'
			})
		}
		if(!userName) {
			this.setState({
				userNameFee:true,
				userNameIsTrue:'error',
				userNameMessage:'请输入用户名'
			})
		}
		if(!code) {
			this.setState({
				
				codeMessage:'请输入验证码'
			})
		}
		this.props.form.validateFields((err, values) => {
			const form = this.props.form;
			const code = form.getFieldValue('captcha')
			if (!err) {
				console.log(values);
				// 判断是否能注册
				if(this.state.successRegister&&this.state.successPassRegister){
					
					if(this.state.registerCode !==code) {
						this.setState({
							codeMessage:'验证码输入有误',
							codeIsTrue:'error'
						})
					}else{
						console.log("可以注册")
						this.setState({
							codeMessage:'',
							codeIsTrue:'success'
						})
						// 注册提交
						this.registeredAccount(values)
					}
					
				}else{
					console.log("不可以注册")
					this.setState({
						registerCode
					})
				}
			} else {
                console.log(err);
                console.log("错误")
			}
		});
    };
    comEmail = (rule, value, callback) => {
		this.setState({
            emailValue:value
        })
        
		callback();
    };
    // 返回登录也
    toLogin = () => {
        this.props.loginToSelf()
    }
    // 获取验证码
    getCode=() => {
        this.setState({
            loading:true
        })
        const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        console.log(myreg.test(this.state.emailValue))
        const emailUrl = this.state.emailValue
        const that = this
        if(myreg.test(emailUrl)) {
            axios.get(getCode, {
                params: {
                    email: emailUrl,
                }
            }).then(function (response) {
				console.log(999)
                console.log(response);
                if (response.data.result.code === 200) {
                    console.log(response.data.result.message)
    
                    message.success(response.data.result.message);
                    that.setState({
                        loading:false,
                        disabled:true,
                        registerCode:response.data.testCode
                    })
                    setTimeout(function() {
                        that.setState({
                            disabled:false,
                        })
                    },30000)
                    that.countDown =  setInterval(() => {
                        that.setState({
                            timeNum:--that.state.timeNum,
                        })
                        that.setState({
                            getCodeText:that.state.timeNum+"秒后重新获取"
                        })
                        if(that.state.timeNum ===0) {
                            clearInterval(that.countDown);
                            that.setState({
                                getCodeText:'获取验证码',
                                timeNum:30,
                            })
                        }
                    },1000)
                } else {
                    message.config({
                        // top: '50%',
                        duration: 2,
                        maxCount: 3,
                    });
                    message.error(response.data.result.message);
                    that.setState({
                        loading:false
                    })
                }
                
            })
                .catch(function (error) {
                    alert(error)
                    
                });
        }
	}
	// 注册
	registeredAccount = (values) => {
		console.log(values)
		axios.get(registeredAccount, {
			params: values
		}).then(function (response) {
			console.log(response);
			if(response.data.code == 200) {
				window.open(toIndex, '_self');
			}
		}).catch(function (error) {
			alert(error)	
		});
	}
}
const RegisterTo = Form.create({ name: 'normal_register' })(Register);
export default RegisterTo;
