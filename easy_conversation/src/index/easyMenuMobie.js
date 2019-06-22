import React from 'react'
import axios from 'axios'
import {Menu,Icon,Row,Col,Tag} from 'antd'
import "antd/dist/antd.css"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class EasyMenuMobie extends React.Component{
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
            <Row>
                <Col span={12}>
                <Menu mode="horizontal">
							
              
              <SubMenu title={<span><Icon type="align-left" />所有分类</span>}>
                <Menu.Item key="setting:0">全部</Menu.Item>
                <MenuItemGroup title="程序发布与交流">
                  <Menu.Item key="setting:1">作品/资源分享</Menu.Item>
                  <Menu.Item key="setting:2">技术求助</Menu.Item>
                  <Menu.Item key="setting:3">教程</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="休闲娱乐" >
                  <Menu.Item key="setting:4" >专业灌水区</Menu.Item>
                  <Menu.Item key="setting:5" >图文欣赏</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="建议反馈" >
                  <Menu.Item key="setting:7" >意见与建议</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
						</Menu>
                </Col>
                <Col span={12} style={{"lineHeight":"46px","textAlign":"right"}}>
                <Tag onClick = {this.props.addNew} style={{"height":"30px","lineHeight":"30px","padding":"0 10px"}} color="cyan"><Icon type="edit" style={{"marginRight":"5px"}}/>发新主题</Tag>
                </Col>
            </Row>
            
        )
    }
}
export default EasyMenuMobie
