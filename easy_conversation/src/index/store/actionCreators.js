// 统一管理页面上所有的action
import {GET_ARTICLE_LIST,GET_USER_INFO,GET_PAGE,TO_INDEXONE,GET_UID,TO_INDEXTHREE} from './actionTypes'

// 获取首页首次文章列表
export const getAjaxList = (data) => {
    return {
        type:GET_ARTICLE_LIST,
        list:data[0],
        count:data[1][0].count
    }
}
// 获取当前登录用户
export const getUserInfo = (data) => {
    return {
        type:GET_USER_INFO,
        id:data.id,
        userName:data.userName
    }
}

// 获取当前页
export const getPage = (page) => {
    return {
        type:GET_PAGE,
        page:page
    }
}
// 
export const toIndexOne = () => {
    return {
        type:TO_INDEXONE
    }
}
// 设置uid
export const setUid = (uid) => {
    return {
        type:GET_UID,
        uid:uid
    }
}
// 
export const toThree = (uid) => {
    return {
        type:TO_INDEXTHREE,
        uid:uid,
    }
}
