const SERVER_IP = "http://192.168.3.204:8001/"
export const login = SERVER_IP+"api/login"
export const getCode = SERVER_IP+"api/sendCode" //获取验证码
export const duplicateName = SERVER_IP+"api/duplicateName"  //查看是否重名
export const registeredAccount = SERVER_IP+"api/registeredAccount"  //注册
export const selectArticleList = SERVER_IP+"api/selectArticleList"  //获取当前页帖子
export const newPublish = SERVER_IP+"api/newPublish"  //发新主题
export const uploadImg = SERVER_IP+"api/upload"     //上传头像
export const getContentInfoByUid = SERVER_IP+"api/getContentInfoByUid"  //根据uid查询帖子数据
export const setLookTime = SERVER_IP+"api/setLookTime"      //修改当前帖子阅读数

// 
const WEBTO = "http://192.168.3.204:8181/"  //前端服务地址
export const toLogin = WEBTO+"login.html"  //跳转到登录页
export const toIndex = WEBTO  //跳转到首页
export const ToInforMation = WEBTO+"Information"    //跳到个人信息页
