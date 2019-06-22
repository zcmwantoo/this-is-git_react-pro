import React from 'react'
import axios from 'axios'
import {Menu,Icon,Row,Col,message,Tag,Tabs,Form,Input,BackTop} from 'antd'
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
import "antd/dist/antd.css"
import {selectArticleList,setLookTime} from '../api'
import {getAjaxList,setUid,toThree} from './store/actionCreators'
import RichText from './richText'   //富文本编辑区

import EasyBody from './easyBody'
import EasyMenu from './easyMenu'
import EasyMenuMobie from './easyMenuMobie'
import store from './store/index'


import Content from './contentInfo'
import {setItem,getItem} from '../localstorage'
class AppMain extends React.Component{
    constructor() {
        super()
        this.state = store.getState()
        store.subscribe(() => this.storeChange())
        console.log("manshow")
        console.log(this.state.manShow)
    }
    
    render() {
        
        return (
            <div>
                <Tabs activeKey={this.state.activeKey} animated={false} tabPosition="top">
                    <TabPane tab="12" key="1">
                        <Col xs={24} sm={24} md={0} lg={0} xl={0} className="">
                            <EasyMenuMobie addNew = {this.addNew}></EasyMenuMobie>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16} className="easy-body">
                            <EasyBody toInfo = {this.toInfo}></EasyBody>
                        </Col>
                        <Col xs={0} sm={0} md={6} lg={6} xl={6} offset={2} className="easy-menu">
                            <EasyMenu addNew = {this.addNew}></EasyMenu>
                        </Col> 
                    </TabPane>
                    <TabPane tab="content" key="2">
                        <RichText toContent = {this.toContent}></RichText> 
                    </TabPane>
                    <TabPane tab="toConInfo" key="3">
                        <Content uid={this.state.uid}></Content>
                    </TabPane>
                </Tabs>  
                <div>
                    <BackTop />
                    
                    <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>  </strong>
                    
                </div>
            </div>
        )
    }
    storeChange = () => {
        // 当store改变，重新获取store数据
        this.setState(store.getState())
    }
    addNew = () => {
        if(this.state.userId) {
            console.log(this.state.userName)
            this.setState({
                activeKey: '2'
            })
        }else{
            console.log("暂未登录")
            message.warning('请先登录，之后再发表主题');
        }
    }
    toContent = () => {
        this.setState({
            activeKey: '1'
        })
        axios.get(selectArticleList, {
            params: {
              page: 1,
              num:10
            }
          }).then(function (response) {
            console.log("text")
            console.log(response);
              const action = getAjaxList(response.data)
              store.dispatch(action)
            //   console.log(that.state.list)
          }).catch(function (error) {
              alert("error"+error)
          });
    }
    toInfo = (uid,looktime) => {
        if(getItem("looktime")) {
            setItem("looktime",getItem("looktime")+1)
            this.setLookTimeByUid(uid)
        }else{
            setItem("looktime",1)
            this.setLookTimeByUid(uid)
        }
        // if(looktime) {
        //     console.log("次数++")
        //     console.log(looktime)
            
        // }else{
        //     console.log("1次")
            
        // }
        const actionSetUid = toThree(uid)
        store.dispatch(actionSetUid)
        this.setLookTimeByUid(uid)
    }
    setLookTimeByUid = (uid,looktime) => {
        const that = this
        axios.get(setLookTime, {
            params: {
              time: looktime,
              uid:uid
            }
          }).then(function (response) {
            console.log("time")
            console.log(response);
          }).catch(function (error) {
              alert("error"+error)
          });
    }
}
export default AppMain
