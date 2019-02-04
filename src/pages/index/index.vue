<template>
  <section class="mp-body flex flex-dc">
    <section class="wrap-content flex-1">
  
      <van-notify id="van-notify" />
    </section>
  </section>
</template>

<script>
  import amapFile from "../../utils/amap-wx";
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import {
    sendSms,
    verifyCode,
    updateAvatar,
    getlogo
  } from "../../service/mobile.js";
  import Notify from '../../wxComponents/vant-weapp/notify/notify';
  export default {
    
    data: function() {
      return {
        telTip: "*非大陆手机号请填写区号，如+10-123456",
        telError: "",
        tel: "",
        vercode: "",
        vercodeError: "",
        count: 0,
        logo: "",
        isPreLoadImg: true,
        id: ""
      };
    },
    components: {
   
    },
  
    computed: {
      ...mapState(["cityName"]),
  
      
    },
    watch: {
     
    },
  
    created() {
  
  
  
    },
    onLoad: function(options) {
      this.id = options.id || "";
      this.setStates({
        company: this.id
      });
      //  this.checkLogin();
    },
    onShow() {},
    onReady() {},
    mounted() {
      
    },
  
    methods: {
      ...mapMutations(["setStates", "clear"]),
      ...mapActions(["checkLogin"]),
      notify(){
         Notify("dd");
      }
    }
  };
</script>

<style lang='less'>
  @import "./style.less";
</style>
