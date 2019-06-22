import React from 'react'
import axios from 'axios'
import {List, Avatar, Icon,Menu,Tag } from 'antd'
import "antd/dist/antd.css"
import './css/easyMune.css'
class EasyMenu extends React.Component {
  constructor() {
      super()
      this.state = {

      }
  }
  componentDidMount() {
    
  }
  componentWillUnmount(){
    
  }
  render() {
      return (
       <div className="card-list">
       <Tag onClick = {this.props.addNew} style={{"height":"30px","lineHeight":"30px","padding":"0 10px","margin":"16px 0"}} color="cyan"><Icon type="edit" style={{"marginRight":"5px"}}/>发新主题</Tag>
       {/* <a style={{"color":"red","display":"block","height":"46px","lineHeight":"46px","padding":"0 20px"}}><Icon type="edit" style={{"marginRight":"5px"}}/>发新主题</a> */}
            <div className="card">
                <div className="card-title"><a>全部</a></div>
                
            </div>
            <div className="card">
                <div className="card-title">程序发布与交流</div>
                <div className="card-body">
                    <p><a>作品/资源分享</a></p>
                    <p><a>技术求助</a></p>
                    <p><a>教程</a></p>
                </div>
            </div>
            <div className="card">
                <div className="card-title">休闲娱乐</div>
                <div className="card-body">
                    <p><a>专业灌水区</a></p>
                    <p><a>图文欣赏</a></p>
                </div>
            </div>
            <div className="card">
                <div className="card-title">建议反馈</div>
                <div className="card-body">
                    <p><a>意见与建议</a></p>
                </div>
            </div>
       </div>
      )
  }
}
export default EasyMenu