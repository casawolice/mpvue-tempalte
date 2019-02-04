const pageDatas = {}
const projConfig = require("../proj.json");
let MyPlugin = {};
MyPlugin.install = function (Vue) {
  // 添加全局方法或属性
  Vue.prototype.$isPage = function isPage() {
    return this.$mp && this.$mp.mpType === 'page'
  }

  Vue.prototype.$pageId = function pageId() {
    return this.$isPage() ? this.$mp.page.__wxWebviewId__ : null
  }
  Vue.prototype.$loading=function(){
    wx.showLoading({title:"加载中..."});
  }
  Vue.prototype.$loadingHide=function(){
    wx.hideLoading();
  }
  Vue.prototype.$toast=function(options){
       
    wx.showToast(options);

  };

  // 注入组件
  Vue.mixin({

    methods: {
      showError(msg){
        wx.showToast({
          title: msg,
          duration: 2000
        })
      },
      getAvatar(id, type, host) {

        if (!id || !type) return "";
        host = host || projConfig.imageUrl;
        return `${host}/v1/image/${type}/${id}`

    },
      stashPageData() {
        // 备份route和当前数据
        return {
          data: { ...this.$data
          }
        }
      },
      restorePageData(oldData) {
        Object.assign(this.$data, oldData.data)
      }
    },

    onLoad() {
      if (this.$isPage()) {
        // 新进入页面 初始化数据
        Object.assign(this.$data, this.$options.data())
      }
    },

    onUnload() {
      if (this.$isPage()) {
        // 退出页面，删除数据
        delete pageDatas[this.$pageId()]
        this.$needReloadPageData = true
        // console.log(pageDatas);
      }
    },

    onHide() {
      if (this.$isPage()) {
        // 将要隐藏时，备份数据
        pageDatas[this.$pageId()] = this.stashPageData()

        // console.log(pageDatas);

      }
    },

    onShow() {
      if (this.$isPage()) {
        // 如果是后退回来的，拿出历史数据来设置data
        if (this.$needReloadPageData) {
          const oldData = pageDatas[this.$pageId()]

          if (oldData) {
            this.restorePageData(oldData)
          }
          this.$needReloadPageData = false
        }
      }
    }

  })
}
export default MyPlugin
