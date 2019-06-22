import {GET_ARTICLE_LIST,GET_USER_INFO,MOUNTED,GET_PAGE,CON_MAN,TO_INDEXONE,GET_UID,TO_INDEXTHREE} from './actionTypes'
// 存储数据
const defaultState = {
    count : 0,
    page:1,
    list: [],
    userId:'',
    userName:'',
    activeKey: '1',	//首页tab页
    mounted:true,
    uid:''
}//存储的数据
// reducer可以接收state，但是不能修改state
export default (state = defaultState,action) => {
    if(action.type === GET_ARTICLE_LIST) {      //初始化首页文章列表
        const newState = JSON.parse(JSON.stringify(state))
        console.log("action"+action)
        newState.list = action.list
        newState.count = action.count
        return newState
    }
    // 获取当前登录用户
    if(action.type === GET_USER_INFO) {      
        const newState = JSON.parse(JSON.stringify(state))
        newState.userId = action.id
        newState.userName = action.userName
        return newState
    }
    // 获取当前页
    if(action.type === GET_PAGE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.page = action.page
        return newState
    }
    // 
    if(action.type === TO_INDEXONE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.activeKey = '1'
        return newState
    }
    // 获取uid
    if(action.type === GET_UID) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.uid = action.uid
        return newState
    }
    if(action.type === TO_INDEXTHREE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.uid = action.uid
        newState.activeKey = '3'
        return newState
    }
    return state
}