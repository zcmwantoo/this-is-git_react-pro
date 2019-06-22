import React from 'react'
import "antd/dist/antd.css"
import { Typography,Divider,BackTop  } from 'antd';
const { Title, Paragraph, Text } = Typography;
import axios from 'axios'

import {getContentInfoByUid} from '../api'
import {setUid} from './store/actionCreators'
import store from './store/index'
import './css/content.css'
import {setItem,getItem} from '../localstorage'
const uid = getItem('uid')
class Content extends React.Component{
    
    constructor() {
        super()
        this.state = {
            uid:'',
            title:'',
            content:''
        }
        
    }
    componentDidMount() {
        // console.log(this.state.uid)
    }
    componentWillUnmount() {
        
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.uid)
        
        
        this.setState({
            uid:nextProps.uid
        })
        const that = this
        axios.get(getContentInfoByUid, {
            params: {
              uid:nextProps.uid
            }
          }).then(function (response) {
            console.log("text")
            console.log(response);
            that.setState({
                title:response.data[0].title,
                content:response.data[0].content
            })
            
          }).catch(function (error) {
              alert("error"+error)
          });
    }
    render() {
        
        return(
            <div>
                <Title >{this.state.title}</Title>
                <div dangerouslySetInnerHTML = {{ __html: unescape(this.state.content)}}></div>
                
            </div>
        )
    }

    // storeChange = () => {
    //     // 当store改变，重新获取store数据
    //     this.setState(store.getState())
    // }
}
export default Content