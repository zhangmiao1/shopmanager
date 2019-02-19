import axios from 'axios'
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
    Vue.prototype.$http = axios

}
export default MyPlugin

