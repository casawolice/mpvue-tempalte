<script>
export default {
    created() {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        console.log('app created and cache logs by setStorageSync')
    }
}
</script>

<style lang="less">
.flex {
    display: flex;

}

.flex-loop(@n;

@i: 0) when(@n>=@i) {
    .flex-@{n} {
        // flex-grow: @n;
        flex: @n;
    }

    .flex-loop(@n - 1);
}

.flex-loop(10);

.flex-l {
    justify-content: flex-start;
}

//居左
.flex-r {
    justify-content: flex-end;
}

//居右
.flex-c {
    justify-content: center;
}

//居中
.flex-b {
    justify-content: space-between;
}

//块与块之间等距空白
.flex-a {
    justify-content: space-around;
}

//每个块左右都要等距空白 块与块之间空白不重合
.flex-vc {
    align-items: center;
}

//垂直居中
.flex-vt {
    align-items: flex-start;
}

//垂直居顶
.flex-vb {
    align-items: flex-end;
}

//垂直居底
.flex-w {
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
}

.flex-dc {
    flex-direction: column;
}

.flex-center {
    .flex;
    .flex-c;
    .flex-vc;
    // .flex-w;
}

.tac {
    text-align: center;
}

.bold {
    font-weight: bold
}

.h-100 {
    height: 100%;
}

.word {
    word-wrap: break-word;
    word-break: break-all;
}

//淡入淡出
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}

.reg-body {
    position: absolute;
    z-index: 0;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

page {
    background: #f4f4f4;
    height: 100%;
}

* {
    font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Source Han Sans, Noto Sans CJK Sc, Microsoft YaHei, Microsoft Jhenghei, sans-serif;
}

image {
    width: auto;
    height: auto;
    display: auto;
    overflow: auto;

}
</style>
