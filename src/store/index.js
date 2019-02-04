import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
    state: {

        cityName:"",
        userName: wx.getStorageSync('m-userName') || '',
        qrcode: wx.getStorageSync('m-qrcode') || '',
        company: wx.getStorageSync('m-company') || '',
        code: wx.getStorageSync('m-code') || '',
        mobile: wx.getStorageSync('m-mobile') || '',
        area_code: wx.getStorageSync('m-area_code') || '',
        avatar: wx.getStorageSync('m-avatar') || '',
        timeStamp:Number(wx.getStorageSync('m-timeStamp') || 0),
        isLogin:Boolean(wx.getStorageSync('m-isLogon') || false)

    },
    modules: {

    },
    getters: {




    },
    mutations: {



        clear(state) {


            for (let key in state) {
                if(key !='company'){
                    wx.removeStorageSync(`m-${key}`);
                    state[key] = '';
                }
             
            }


        },

      


        setStates(state, payload) {
            for (let key in payload) {
                state[key] = payload[key];
                wx.setStorageSync(`m-${key}`, payload[key])

            }

        },
       
    },
    actions: {
        logOut({
            commit,
            state,
            getters,
            dispatch
        }){
            let url=`/pages/index/index?id=${state.company}`;
            commit("clear");
            wx.reLaunch({url});
            
        },
        checkLogin({
            commit,
            state,
            getters,
            dispatch
        },redirect=true){
           let ts=(new Date()).getTime();
           if(!state.isLogin || ts-state.timeStamp>1800000){
            
            dispatch("logOut");
           
           }
           else{
            if(redirect)wx.redirectTo({url:"/pages/takePhoto/index"});
           }

        }

    }
})

export default store;
