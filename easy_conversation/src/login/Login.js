import React from 'react'
import "antd/dist/antd.css"
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Tabs, Menu, message } from 'antd';
import './NormalLoginForm.css'
const TabPane = Tabs.TabPane;
import { login,toIndex } from '../api'
import RegisterTo from './register'	//注册页
import {setItem,setItemBySession} from '../localstorage'
// 
class NormalLoginForm extends React.Component {
	constructor() {
		super()
		this.state = {
			activeKey: '1',	//tab页
			loading: false,
			iconLoading: false,
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading:true
				})
				console.log(values)
				const that = this
				axios.get(login, {
					params: {
						username: values.userName,
						password: values.password,
					}
				}).then(function (response) {
					console.log(response);
					if (response.data.code === 200) {
						console.log(response.data.message)
						// 判断是否记住密码
						values.remember?setItem('userInfo',response.data.userInfo):setItemBySession('userInfo',response.data.userInfo)
						window.open(toIndex, '_self');
					} else {
						message.config({
							duration: 2,
							maxCount: 3,
						});
						message.error(response.data.message);

					}
					that.setState({
						loading:false
					})
				})
					.catch(function (error) {
						alert(error)
						that.setState({
							loading:false
						})
					});
			} else {
				console.log(err)
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Row type="flex" justify="center" className="topcav">
					<Col xs={20} sm={18} md={18} lg={16} xl={14}>
						<Menu mode="horizontal">
							<Menu.Item key="mail" title="EASY Dialogue" className="top-title" onClick={() => { this.toIndex() }}>
								<Icon type="home" style={{ "fontSize": "18px" }} />EASY Dialogue
              				</Menu.Item>
						</Menu>
					</Col>
				</Row>
				<Tabs activeKey={this.state.activeKey} tabPosition="top">
					<TabPane tab="登录" key="1">
						<div className="loginForm">
							<div className="login-content">
								<h2>登录 EASY Dialogue</h2>
								<Form onSubmit={this.handleSubmit} className="login-form">
									<Form.Item>
										{getFieldDecorator('userName', {
											rules: [{ required: true, message: '请输入用户名!' }],
										})(
											<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('password', {
											rules: [{ required: true, message: '请输入密码!' }],
										})(
											<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
										)}
									</Form.Item>
									<Form.Item>
										{getFieldDecorator('remember', {
											valuePropName: 'checked',
											initialValue: false,
										})(
											<Checkbox>记住密码</Checkbox>
										)}
										<a className="login-form-forgot" onClick={() => { this.getNewPassword() }}>忘记密码</a>
										<div>
											<Button type="primary" htmlType="submit" block loading={this.state.loading}>
												登录
                                			</Button>
										</div>

										<a onClick={() => { this.register() }}>注册</a>
									</Form.Item>
								</Form>
							</div>
							<div className="login-bottom"><a>二维码登录</a> · <a>手机登录</a> · <a>社交帐号登录</a></div>
						</div>
					</TabPane>
					<TabPane tab="忘记密码" key="2">
						忘记密码
					</TabPane>
					<TabPane tab="注册" key="3">
						<RegisterTo loginToSelf={this.loginToSelf}></RegisterTo>
					</TabPane>
				</Tabs>
			</div>

		);
	}
	// 跳到注册
	register = () => {
		this.setState({
			activeKey: '3'
		})
	}
	loginToSelf = () => {
		this.setState({
			activeKey: '1'
		})
	}
	// 忘记密码
	getNewPassword = () => {
		this.setState({
			activeKey: '2'
		})
		console.log(this.state.activeKey)
	}
	// 跳到首页
	toIndex = () => {
		window.open(toIndex, '_self');
	}
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

//   ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
export default Login