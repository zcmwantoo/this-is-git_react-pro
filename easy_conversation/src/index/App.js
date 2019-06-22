import React from 'react';
// import './App.css';
import "antd/dist/antd.css"
import axios from 'axios'
import {  Icon,  Row, Col,  Menu,Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { toLogin } from '../api'
// 
import {
  BrowserRouter as Router,
  Route,
  Link
}from 'react-router-dom'

// 

import AppMain from './appMain'
import Information from './components/information'
import Reply from './components/reply'
import PrivateLetter from './components/privateLetter'
// 
import './css/app.css'
// 获取本地存储方法
import {getItem,deleteItemByItemName,getItemBySession,deleteItemBySession} from '../localstorage'
import store from './store/index'
import {getUserInfo,getConMan,toIndexOne} from './store/actionCreators'
class App extends React.Component {
  constructor() {
		super()
    this.state = store.getState()
    // 当store里面的值改变时执行storeChange函数
    store.subscribe(() => this.storeChange())
  }
  componentDidMount() {
    if(getItem('userInfo')) { 
      const userInfo = getItem('userInfo')
      const action = getUserInfo(userInfo)
      store.dispatch(action)
    }else if(getItemBySession('userInfo')){
      const userInfo = getItemBySession('userInfo')
      const action = getUserInfo(userInfo)
      store.dispatch(action)
    }
    // 根据当前登录用户获取用户头像  // 
  }
  render() {
    return (
      <Router>
		  <div>
        <Row type="flex" justify="center" className="topcav">
            <Col xs={24} sm={20} md={18} lg={16} xl={14}>
              <Menu mode="horizontal">
                <Menu.Item key="mail" title="EASY Dialogue" className="top-title" onClick={() => {this.toList()}}>
                  <Link to="/"><Icon type="home" style={{ "fontSize": "18px" }}/>EASY Dialogue</Link>
                </Menu.Item>
                <Menu.Item key="tologin-exit" title="登录" className={`loginst ${this.state.userId ? 'hidden' : 'show'}`} >
                  <a onClick={() => {this.toLogin()}}>已有账号？登录</a>
                </Menu.Item>
                {/*已经登录用户所显示的*/}
                <SubMenu className={`loginst ${this.state.userId ? 'show' : 'hidden'}`} title={<span className="submenu-title-wrapper"><Icon type="user" />{this.state.userName}</span>}>
                  <MenuItemGroup title="系统" className="user-setting-father">
                    <Menu.Item key="setting:1" className="user-setting" onClick = {() => this.exit()}>退出</Menu.Item>
                    <Menu.Item key="setting:2" className="user-setting"><Link to="/Information">我的资料</Link></Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title="消息" className="user-setting-father">
                    <Menu.Item key="setting:3" className="user-setting"><Link to="/Reply">我的回复</Link></Menu.Item>
                    <Menu.Item key="setting:4" className="user-setting"><Link to="/PrivateLetter">我的私信</Link></Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
          <div className="box"></div>
        <Row type="flex" justify="center">
          <Col xs={20} sm={18} md={18} lg={16} xl={14}>    
            <Route exact path="/" component={AppMain}/>
            <Route path="/Information" component={Information} />
            <Route path="/Reply" component={Reply} />
            <Route path="/PrivateLetter" component={PrivateLetter} /> 
          </Col>
        </Row>
		</div>
        </Router>
    );
  }
  // 登录
  toLogin = () => {
    window.open(toLogin, '_self');
  }
  // 退出系统
  exit = () => {
    Modal.confirm({
      title: '退出?',
      content: '确定退出登录？',
      centered:true,
      cancelText:'取消',
      okText:'确定',
      onOk() {
        console.log('OK');
        deleteItemByItemName('userInfo')
        deleteItemBySession('userInfo')
        window.open(toLogin, '_self');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  storeChange = () => {
    // 当store改变，重新获取store数据
    this.setState(store.getState())
  }
  toList = () => {
    console.log("切换1")
    const actionTo = toIndexOne()
    store.dispatch(actionTo)
  }
}
export default App;
