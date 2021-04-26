<template>
  <div class="container">
    <div class="title">应用软件</div>
    <div class="app-list-wrap">
      <div v-for="(item,index) in appList" :key="index" @click="openApp(item)" class="item-wrap">
        <div tabindex="0" class="item focus">
          <div class="img-wrap">
            <img :src="item.hostThumb" alt="">
          </div>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <van-popup round v-model="showDownload" :style="{ backgroundColor: 'fff',opacity:0.8 }">
      <div class="circle-wrap">
        <van-circle v-model="currentRate" :rate="currentRate" :speed="100" :text="rateText" />
      </div>
    </van-popup>
    <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId" :distance="200" direction="bottom">
      <div slot="spinner" class="state-style">读取中...</div>
      <div slot="no-more" class="state-style">已加载全部</div>
      <div slot="no-results" class="state-style">
        <no-list text="暂无应用"></no-list>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { openWin } from '@/common/openPage.js'
import noList from '@/components/noList'

import request from '@/api/searchClass'
export default {
  components: {
    BaseButton,
    noList
  },
  created() {
    api.addEventListener(
      {
        name: 'viewappear'
      },
      () => {
        this.$checkBindAsync()
      }
    )
  },
  data() {
    return {
      showDownload: false,
      currentRate: 0,
      rateText: undefined,
      page: 1,
      pageSize: 15,
      typeId: api.pageParam.data.type || '',
      infiniteId: +new Date(),
      appList: []
    }
  },
  methods: {
    infiniteHandler($state) {
      request
        .getAppList(this.page, this.pageSize, this.typeId)
        .then(({ value: { data } }) => {
          if (data.length) {
            this.page += 1
            this.appList.push(...data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // async accessReAsync() {
    //   const accessRes = await this.$checkSystemAccess('photos-w', '本地存储空间')
    //   if (accessRes) {
    //     alert(this.$uuidv4())
    //   }
    // },
    // 下载安装 app
    downloadinstall(info) {
      const _this = this
      _this.showDownload = true
      api.download(
        {
          // url: $api.localhost +info.url 'http://192.168.0.117:8090/public/1.apk1',
          url: $api.getStorage('ip') + info.url,
          savePath: `fs://download/${info.name}.apk1`,
          report: true,
          cache: true,
          allowResume: true
        },
        function (ret, err) {
          if (ret.state == 0) {
            //下载中
            _this.currentRate = ret.percent
            _this.rateText = '下载中：' + _this.currentRate.toFixed(0) + '%'
          } else if (ret.state == 1) {
            // 下载完成
            _this.showDownload = false
            _this.currentRate = 0
            // 调用安装
            api.installApp({
              appUri: `file://storage/emulated/0/UZMap/A6169778903358/download/${info.name}.apk1`
            })
          } else {
            // 下载失败
            _this.showDownload = false
          }
        }
      )
    },
    openApp(info) {
      const _this = this
      // 打开app
      api.openApp(
        {
          // androidPkg: 'com.qiyi.video'
          androidPkg: info.packageName
        },
        function (ret, err) {
          if (ret) {
            // 打开成功
          } else {
            // 打开失败
            _this.downloadinstall(info)
          }
        }
      )

      // api.openApp({
      //   androidPkg: 'com.gitvdemo.video'
      //   androidPkg: 'com.qiyi.video'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: PingFang-SC-Bold;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #fff;
  background-image: linear-gradient(20deg, #111725 0%, #2f3350 52%, #3d5792 100%), linear-gradient(#fcdd93, #fcdd93);
  background-blend-mode: normal, normal;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .focus {
    box-sizing: border-box;
    transition: all 0.4s;
    border: 1px solid transparent;
    box-shadow: none;
    &:focus {
      border: 1px solid #4f37fa !important;
      outline: none !important;
      box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
      border-image-source: linear-gradient(90deg, #ffffff 100%);
      border-image-slice: 1;
    }
  }
  .title {
    font-size: 1.5rem;
    letter-spacing: 0.15rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 1rem;
  }
  .app-list-wrap {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .item-wrap {
      width: 16%;
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      .item {
        width: 90%;
        background-color: #212439;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        .img-wrap {
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
          img {
            max-width: 3.5rem;
            max-height: 3.5rem;
          }
        }
        .name {
          width: 90%;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
          font-size: 1rem;
          letter-spacing: 0.15rem;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
  .circle-wrap {
    padding: 2rem;
  }
}
</style>