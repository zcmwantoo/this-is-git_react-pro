import React from 'react'
import axios from 'axios'
import {List, Avatar, Icon,Tag, Switch,Tooltip   } from 'antd'
import "antd/dist/antd.css"
import {selectArticleList,getTotal} from '../api'
// 
import store from './store/index'
import {getAjaxList,getPage} from './store/actionCreators'

function timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() < 10 ?  '0'+date.getDate()+ ' ' : date.getDate()+ ' ';
      var h = date.getHours() < 10 ? '0'+date.getHours()+ ':' : date.getHours()+ ':';
      var m = date.getMinutes() < 10 ? '0'+date.getMinutes()+ ':' : date.getMinutes()+ ':';
      var s = date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds();
      return Y+M+D+h+m+s;
  }
  // utc时间转北京时间
  function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 
} 
  // 提取html字符串中的纯文本
  function getSimpleText(html){
    var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    var msg = html.replace(re1,'');//执行替换成空字符
    if(msg.length > 100) {
      msg = msg.substr(0,100)+"..."
    }
    return msg;
    }
  
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
// 


class EasyBody extends React.Component{
    constructor() {
        super()
        this.state = store.getState()
        // 当store里面的值改变时执行storeChange函数
        store.subscribe(() => this.storeChange())
    }
    selectArticleList = (that,page,num) => {
        axios.get(selectArticleList, {
          params: {
            page: page,
            num:num
          }
        }).then(function (response) {
          console.log("text")
          console.log(response);
            const action = getAjaxList(response.data)
            store.dispatch(action)
            console.log(that.state.list)
           
        }).catch(function (error) {
            alert("error"+error)
        });
    }
    componentDidMount() {   //组件被挂载到页面上，只执行一次，ajax
      const that = this
      this.selectArticleList(that,1,3)
      const pageAction = getPage(1)
      store.dispatch(pageAction)
    }
    // 离开组件时，重写state，返回空值
    componentWillUnmount(){
    
    }
    render() {
        return(
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
                // 保存当前页到store
                const pageAction = getPage(page)
                store.dispatch(pageAction)
                // 
                const that = this
                this.selectArticleList(that,page,3)
                scrollTo(0,0)
              },
              total:this.state.count, //数据总条数
              pageSize: 3,            //每条显示页数
              current:this.state.page              //当前页
            }}
            dataSource={this.state.list}
            footer={<div><b>更新于</b> {timestampToTime(new Date().getTime())}</div>}
            renderItem={item => (
              <List.Item
                key={item.time}
                
                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                // extra={<img width={272} alt="logo" src={item.src?item.src:''} />}
                
                
              >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<div><a>{item.userName}</a><span className="book-time">{ utc2beijing(item.time) }</span>
                {
                  item.type == 1?
                  <Tooltip placement="top" title="作品、资源分享">
                  <Tag color="#f50" className="tag">分享</Tag></Tooltip>:(
                    item.type ==2?<Tooltip placement="top" title="技术求助">
                    <Tag color="#2db7f5" className="tag">求助</Tag></Tooltip>:(
                      item.type ==3?<Tooltip placement="top" title="技术教程">
                      <Tag color="#87d068" className="tag">教程</Tag></Tooltip>:(
                        item.type ==4?<Tooltip placement="top" title="灌水区">
                        <Tag color="#108ee9" className="tag">灌水</Tag></Tooltip>:(
                          item.type == 5?<Tooltip placement="top" title="图文欣赏区">
                          <Tag color="cyan" className="tag">图文</Tag></Tooltip>:(
                            item.type ==6?<Tooltip placement="top" title="意见或建议">
                            <Tag color="purple" className="tag">意见</Tag></Tooltip>:""
                          )
                        )
                      )
                    )
                  )
                }
                </div>}
                // extra={item.src?<img width={150} alt="logo" src={item.src} />:''}
              />
              <p><a className="book-title" title={item.title} onClick={() => {this.props.toInfo(item.uid,item.looktime)}}>{item.title}</a></p>
              <p dangerouslySetInnerHTML = {{ __html: getSimpleText(unescape(item.content))}}></p>
                {/* <a onClick = {() =>{this.ddd(item.content)}}>245</a> */}
                {item.imgsrc=="null"?'':<div className="imgWidth">
                  <img alt="logo" src={item.imgsrc} className="imgw"></img>
                </div>}
                
                
              </List.Item>
            )}
          /> 
        )
    }
    storeChange = () => {
      
      this.setState(store.getState())
      // alert(store.getState().mounted)
    }
    
    
}
export default EasyBody