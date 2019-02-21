import axios from 'axios'
import {
    Message
} from 'element-ui';

const MyPlugin = {}
MyPlugin.install = function (Vue) {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    axios.interceptors.request.use(function (config) {
        // 在发起请求请做一些业务处理

        if (config.url !== 'login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function (error) {
        // 对请求失败做处理
        return Promise.reject(error);
    });
    //响应拦截器
    axios.interceptors.response.use(function (response) {
        const {
            meta: {
                msg,
                status
            }
        } = response.data;
        // 统一处理status非200和201的情况->提示框
        if (status !== 200 && status !== 201) {
            Message.warning(msg);
            
        }
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    Vue.prototype.$http = axios

}
export default MyPlugin

