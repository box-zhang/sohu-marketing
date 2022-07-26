
import axios from 'axios'
import qs from "qs";
import hxeapi from './hxeapi.js'
/*axios全局配置*/
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = process.env.VUE_APP_BASEURL;//地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';//请求头根据自定义需求
axios.defaults.timeout = 60000;///默认请求超时时间

let http = axios.create({
    //请求host
    //baseURL: process.env.VUE_APP_BASEURL,
    headers: {
        isShowloading:true
    }
})

//http request 拦截器
http.interceptors.request.use(
    request => {
        //显示加载框
        if (request.headers.isShowloading !== false)
            hxeapi.showLoading();
        delete request.headers.isShowloading;
        // if (request.method === 'post' && request.data) {
        //     request.data = qs.stringify({ ...request.data })
        // }
        //请求前操作写在这里
		request.url = process.env.VUE_APP_BASEURL+request.url
		//console.log(process.env.VUE_APP_BASEURL)

        return request
    }, error => {
        hxeapi.hideLoading();
        return Promise.reject(error)
    });

//http response 拦截器
http.interceptors.response.use(
    response => {
        hxeapi.hideLoading();
        //请求后续操作写在这里
        if(response.status==200){
			console.log(response.data)
			return response.data
		}else{
			hxeapi.showModal({
			  title:"请求错误",
			  content:response.statusText,
			  showCancel:true
			}).then(()=>{
			  console.log("你点击了确定");
			}).catch(()=>{
			  console.log("你点击了取消");
			});
			return response
		}
    },
    error => {
        console.log(error.response)
        hxeapi.hideLoading();
        return Promise.reject(error.response)
    });
export default http