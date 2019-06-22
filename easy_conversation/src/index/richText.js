import React from 'react'
import axios from 'axios'
import Qs from 'qs'
import {Row,Col,message,Tag,Tabs,Form,Input,Button,Select} from 'antd'
const Option = Select.Option
import "antd/dist/antd.css"
// 
import {newPublish} from '../api'
import Quill from "quill"

import 'quill/dist/quill.snow.css'

import store from './store/index'
// 
class RichText extends React.Component{
    
    constructor() {
        super()
        this.state = {
            userId:store.getState().userId,
            userName:store.getState().userName,
            title:"",
            value: "",
            type:"1"  //类型下标
        }
    }
   
    
    componentDidMount() {
        // 配置项
        const options = {
        //   debug: "warn",
          theme: "snow",
          modules: { // 自定义 toolbar 填写这个属性， 值写上 div 的 id
            toolbar: "#toolbar"
          }
        };
        // 实例化 Quill 并且储存在实例原型上
        this.editor = new Quill("#editor", options);
        // 实现输入受控，从state中读取html字符串写入编辑器中
        const { value } = this.state;
        // 判断value中是否有值，如果有那么就写入编辑器中
        if (value) this.editor.clipboard.dangerouslyPasteHTML(value);
        // 设置事件，change事件，
        this.editor.on("text-change", this.handleChange);
      }
      handleChange = () => {
        // change 事件将HTML字符串更新到state里面，
        this.setState({
          value: this.editor.root.innerHTML,
          mediaVisbile: false
        });
    }
    titleChange = (e) => {
        this.setState({
            title:e.target.value
        })
    }
    render() {
        return (
            <div>
                <h3>发表主题</h3>
                <Input style={{"marginBottom":"30px"}} placeholder="请遵守国家法律，不要传播血腥暴力色情等内容..." value={this.state.title} onChange = {(e) => {this.titleChange(e)}}></Input>
                <Select defaultValue="1" style={{"minWidth":"80px","marginBottom":"30px"}} onChange={(e) => {this.typeHandleChange(e)}}>
                    <Option value="1">作品/资源分享</Option>
                    <Option value="2">技术求助</Option>
                    <Option value="3">教程</Option>
                    <Option value="4">专业灌水区</Option>
                    <Option value="5">图文欣赏</Option>
                    <Option value="6">意见与建议</Option>
                </Select>
                <div id="toolbar">
                    <button title="加粗" className="ql-bold"></button>   {/*加粗 */}
                    <button title="代码" className="ql-code-block"></button>                 {/*代码区 */}
                    <button title="斜体" className="ql-italic"></button>  {/*斜体 */}
                    <button title="下划线" className="ql-underline"></button>  {/*下划线 */}
                    <button title="删除线" className="ql-strike"></button>   {/*删除线 */}
                    <button title="下标" className="ql-script" value="sub"></button>  {/*下标 */}
                    <button title="上标" className="ql-script" value="super"></button>  {/*上标 */}
                    <select title="对齐方式" className="ql-align" defaultValue="">       {/*对齐方式 */}
                    
                    </select>
                    <select title="字体" className="ql-font" defaultValue="">       {/*字体 */}
                        
                    </select>
                    <button title="插入图片" className="ql-image" value="image"></button>    {/*插入图片 */} 
                    <select title="文字颜色" className="ql-color" defaultValue="snow">
                    </select>
                    <select title="背景颜色" className="ql-background" defaultValue="snow">
                    </select>
                    <select title="标题" className="ql-header" defaultValue="">
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                        <option value="6" />
                    </select>
                    <button title="有序列表" className="ql-list" value="ordered"></button>
                    <button title="无序列表" className="ql-list" value="bullet"></button>
                </div>
        
                {/*  */}
                <div id="editor" style={{"minHeight":"300px"}}/>
                <div style={{"marginTop":"30px"}}>
                    <Button type="primary" onClick = {() => {this.newPublish()}}>发表</Button>
                    <Button type="danger" style={{"float":"right"}} onClick = {() => {this.props.toContent()}}>退出</Button>
                </div>
                
            </div> 
        )
    }
    typeHandleChange =(type) => {
        this.setState({
            type:type
        })
      }
    newPublish = () => {
        const newPublishData = {
            type:this.state.type,
            userId:this.state.userId,
            userName:this.state.userName,
            title:this.state.title,
            content:escape(this.state.value)
        }
        console.log(newPublishData)
        const that = this
        // ajax发送
        axios({
            headers:{
                'deviceCode':'A95ZEF1-47B5-AC90BF3'
            },
            method:"POST",
            url:newPublish,
            data:newPublishData
        }).then((res)=>{
            console.log(res.data);
            that.props.toContent()
        }).catch(function(error) {
            alert(error)
        })
        


    }
}
export default RichText