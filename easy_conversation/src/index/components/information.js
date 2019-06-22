import React from 'react'
import axios from 'axios'
import {Menu,Icon,Row,Col,Avatar,Input,Button,Modal,Upload,message } from 'antd'
const { TextArea } = Input
import "antd/dist/antd.css"
import {ToInforMation,uploadImg} from '../../api'
import store from '../store/index'

class Information extends React.Component{
    constructor() {
        super()
        this.state = {
            visible:false,
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
    showModal = () => {
        this.setState({
            visible:true
        })
    }
    modalCancel = () => {
        this.setState({
            visible:false
        })
    }
    // 
    beforeUpload = (file) => {
        // 判断
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        if (!isJPG) {
            message.error('你只能上传jpg或png格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJPG && isLt2M;
    }
    handleCancel = () => {
        this.setState({ previewVisible: false })
    }
    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
    handleChange = ({ fileList }) => {
        
        this.setState({ fileList })
        
        if(this.state.fileList.length) {
            // 上传成功
            console.log(this.state.fileList)
            setTimeout(function() {
                message.success('头像修改成功!');
            },200)
            
            // window.open(ToInforMation, '_self');
        }
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col xs={20} sm={18} md={18} lg={16} xl={14}>  
                    <Modal
                        title="上传头像"
                        visible={this.state.visible}
                        onCancel={() => {this.modalCancel()}}
                        footer={
                            <Button key="back" onClick={() => {this.modalCancel()}}>取消</Button> 
                        }
                        centered
                    >
                         <div className="clearfix">
                            <Upload
                            name="avatar"
                            action={uploadImg+"?userId="+store.getState().userId}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload={this.beforeUpload}
                            >
                            {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        
                    </Modal>
                        <table style={{width:'100%',borderCollapse: 'collapse'}}>
                            <tbody>
                                <tr style={{border:'none'}}>
                                    <td>
                                        <Avatar size={64} style={{ color: '#f56a00', backgroundColor: '#fde3cf',fontSize:'50px' }}>S</Avatar>
                                        <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </td>
                                    <td className="mobie-img">
                                        <Button type="primary" shape="round" onClick={() => {this.showModal()}}>更改头像</Button>
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td colSpan="2" style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        发文：10  收到的赞：20  被收藏：30
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        用户名
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        <Input placeholder></Input>
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        电子邮件
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        1399577962@qq.com
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        生日
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        1399577962@qq.com
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        行业
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        1399577962@qq.com
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        地区
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        1399577962@qq.com
                                    </td>
                                </tr>
                                <tr style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        简介
                                    </td>
                                    <td style={{fontSize:'15px',color:'#969696',padding:'20px 0'}}>
                                        <TextArea rows={4} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>  
                
            </div>
        )
    }
}
export default Information
