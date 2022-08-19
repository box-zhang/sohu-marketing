/*
 * @Author: boxZhang
 * @Date: 2022-08-18 16:41:01
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-19 15:07:15
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\common\http.js
 */

import axios from 'axios';
import hxeapi from './hxeapi.js';
/*axios全局配置*/
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = process.env.VUE_APP_BASEURL;//地址
// boxzhang
// axios.defaults.baseURL = "https://souhu.qiyuhd.cn/sohu/"; //地址
// boxzhang end
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; //请求头根据自定义需求
// axios.defaults.timeout = 60000; ///默认请求超时时间
axios.defaults.timeout = 5000; ///默认请求超时时间

let http = axios.create({
  //请求host
  // baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    isShowloading: true
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
    //boxzhang
    // request.url = process.env.VUE_APP_BASEURL + request.url
    request.url = process.env.VUE_APP_BASEURL + request.url
    //boxzhang
    console.log("aaaa:" + process.env.VUE_APP_BASEURL)
    console.log("bbbb:" + request.url)

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
    if (response.status == 200) {
      console.log(response.data)
      return response.data
    } else {
      hxeapi.showModal({
        title: "请求错误",
        content: response.statusText,
        showCancel: true
      }).then(() => {
        console.log("你点击了确定");
      }).catch(() => {
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