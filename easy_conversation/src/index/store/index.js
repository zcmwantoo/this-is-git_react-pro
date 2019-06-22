// 处理数据,管理数据
import {createStore,applyMiddleware,compose} from 'redux'
// 使用redux中间件
import thunk from 'redux-thunk'
import reducer from './reducer'
// 配置thunk中间件和devtools中间件
// redux-thunk支持action是以函数的形式存在
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
}) : compose
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);    
const store = createStore(reducer,enhancer)

export default store