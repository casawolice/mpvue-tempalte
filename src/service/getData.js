import jsonToFormData from "../utils/jsonToFormData";
import {
    hex_md5
} from "../utils/md5.js";
import store from "../store/index.js";
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();


var config = fly.config;
config.method = 'post';
// config.baseURL = window.ajaxUrl;
// config.baseURL = window.ajaxBaseUrl || '';
config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
config.timeout = 60000;
/*config.responseType = "json";*/



fly.interceptors.request.use(function(config) {
    //在发送请求之前做某事
    return config;
}, function(error) {
    //请求错误时做些事
    //  return Promise.reject(error.message);

    return Promise.reject({
        code: "800",
        message: "客户端请求出错，请稍后再试"
    });

});

//添加响应拦截器
fly.interceptors.response.use(function(response) {
    //对响应数据做些事
    return response.data;
}, function(error) {
    //请求错误时做些事
    if (error.response && error.response.data && error.response.data.code && error.response.data.message) {
        return Promise.reject(error.response.data);
    }
    if (error && error.code && error.message) {
        return Promise.reject(error);
    }
    return Promise.reject({
        code: "900",
        message: "服务器响应出错，请稍后再试"
    });

});


export default (url, data = {}, method = 'post', dataType = "json") => {

    dataType = dataType.toLowerCase();
    method = method.toLowerCase();

    if (url.indexOf("://") == -1) url = `${'http://localhost:8080'}${('/'+url).replace("//","/")}`;


    let params = {
        url,
        data,
        options: {
            method,
            headers: {},
        }
    };
    if (dataType === 'json') {

        params.options.headers['Content-Type'] = 'application/json;charset=UTF-8';


        data = JSON.stringify(data);
    } else if (dataType === 'mformdata') {

        params.options.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'


    } else {
        data = jsonToFormData(data);

        if (["put", "post", "patch"].indexOf(method) === -1) {
            if (data !== "") url = `${url}?${data}`;
        }
        params.data = data;
        params.url = url;
    }
    if (method === 'get') params.data = "";

    let token = wx.getStorageSync("token") || "",
        time = String((new Date()).getTime()),
        securt = "bb635dd47e5861f717472df95652077356a8f38dea6347851c191f66b7cf9dc8";
    params.options.headers["AUTH-TOKEN"] = token;
    params.options.headers["AUTH-TIMESTAMP"] = time;
    params.options.headers["AUTH-SIGN"] = hex_md5(`AUTH-TIMESTAMP=${time}&AUTH-TOKEN=${token}#${securt}`);

    return fly.request(params.url, params.data, params.options).then(function(data) {
        data.msg = data.message;
        data.message = data.desc || data.message;
        if (store.state.isLogin && data.code != '401') {
            store.commit("setStates", {
                timeStamp: (new Date()).getTime()
            });

        }
        if (data.code == "200") {
            return Promise.resolve(data);


        } else {
            if (code == '401') {
                store.dispatch("logOut");
            }
            return Promise.reject(data);

        }
    }).catch(function(err) {

        return Promise.reject(err);
    })

}