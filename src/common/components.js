//该文件为全局自定义组件安装js

//无数据，错误页面组件
import Error from '../components/template/Error'


export default {
    install: (Vue) => {
        Vue.component('error',Error)
    }
}
