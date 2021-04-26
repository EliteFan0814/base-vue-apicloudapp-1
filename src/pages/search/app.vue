<template>
  <div class="container">
    <div class="content-wrap">
      <div class="left">
        <div class="input-wrap">
          <div class="input omit-1">{{searchKey||'请输入影片首字母'}}</div>
          <div class="line"></div>
        </div>
        <div class="key-wrap">
          <div v-for="(item,index) in keyList" :key="index" @click="handleSelect(item)" class="item-wrap">
            <div tabindex="0" class="key focus">
              {{item}}
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <BaseButton name="退格" @click="deleteByte(true)"></BaseButton>
          <BaseButton name="清空" @click="deleteByte(false)"></BaseButton>
        </div>
      </div>
      <div class="right">
        <div class="result-wrap">搜索结果 <span class="number">{{totalNumber}}</span> 个</div>
        <div class="outer-wrap">
          <div class="result-content-wrap">
            <div v-for="(item,index) in resultList" :key="index" class="item-wrap" @click="openDetail(item.id)">
              <div class="result-item ">
                <img :src="item.img" alt="" tabindex="0" class="focus">
                <div class="name">{{item.name}}</div>
              </div>
            </div>
          </div>
          <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId" :distance="200" direction="bottom">
            <div slot="spinner" class="state-style">读取中...</div>
            <div slot="no-more" class="state-style">已加载全部</div>
            <div slot="no-results" class="state-style">
              <no-list text="暂无影片"></no-list>
            </div>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { playing, movieInfo } from '@/common/router.js'
import { openWin } from '@/common/openPage.js'
import noList from '@/components/noList'

import request from '@/api/searchClass'
export default {
  components: {
    BaseButton,
    noList
  },
  data() {
    return {
      firstComein: true,
      searchKey: '',
      totalNumber: 0,
      page: 1,
      pageSize: 15,
      infiniteId: +new Date(),
      keyList: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0'
      ],
      resultList: [
        // {
        //   img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1247389292,1273998222&fm=11&gp=0.jpg',
        //   name: '功夫'
        // },
      ]
    }
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
  methods: {
    videoEnd() {
      this.$toast.success('播放完毕')
      // api.sendEvent({
      //   name: 'videoAdEnd'
      // })
      api.openVideo({
        url: 'http://xst.test.fxcloud.net/public/2021-01-15-18-17-34.avi'
      })
      setTimeout(() => {
        api.openApp(
          {
            androidPkg: 'com.y552426811.jcs'
          },
          function (ret, err) {
            if (ret) {
              _this.$toast.success('内页打开当前应用')
            } else {
              _this.$toast.fail('内页打开应用失败')
            }
          }
        )
      }, 1000 * 60 * 1)
      setTimeout(() => {
        api.closeFrame()
      }, 2000)
    },
    openDetail(id) {
      openWin(movieInfo, { id })
    },
    handleSelect(item) {
      if (this.searchKey === '') {
        this.searchKey = '' + item
      } else {
        this.searchKey += '' + item
      }
      this.firstComein = false
      this.infiniteId += 1
    },
    deleteByte(flag) {
      if (flag) {
        if (this.searchKey !== '') {
          this.searchKey = this.searchKey.substr(0, this.searchKey.length - 1)
        } else {
          return
        }
      } else {
        this.searchKey = ''
      }
    },
    infiniteHandler($state) {
      if (this.firstComein) {
        this.resultList = []
        $state.complete()
        return
      }
      request
        .getInputList(this.searchKey, this.page, this.pageSize)
        .then(({ value: { data, totalCount } }) => {
          if (data.length) {
            this.page += 1
            this.totalNumber = totalCount
            this.resultList.push(...data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // openLoginForm(role) {
    //   $api.setStorage('roleValue', role)
    //   openWin(loginForm, { role })
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: PingFang-SC-Bold;
  padding: 0;
  .omit-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
  .content-wrap {
    display: flex;
    .focus {
      box-sizing: border-box;
      transition: all 0.4s;
      border: 1px solid transparent;
      box-shadow: none;
      outline: none !important;
      &:focus {
        border: 2px solid #4f37fa !important;
        outline: none !important;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
        border-image-source: linear-gradient(90deg, #ffffff 100%);
        border-image-slice: 1;
      }
    }
    .left {
      box-sizing: border-box;
      flex-grow: 1;
      width: 30%;
      height: 100vh;
      background-color: #fff;
      background-image: linear-gradient(59deg, #0b0d19 0%, #151422 40%, #1f1b2a 63%, #222338 100%),
        linear-gradient(#fcdd93, #fcdd93);
      background-blend-mode: normal, normal;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 1.5rem;

      .input-wrap {
        margin-bottom: 1rem;
        .input {
          // width: 14.03rem;
          height: 1.5rem;
          font-size: 0.94rem;
          line-height: 1rem;
          letter-spacing: 0.2rem;
          color: #7569d1;
          padding: 0 0.2rem;
          text-transform: uppercase;
        }
        .line {
          border: 1px solid #fff;
          border-top: none;
          // width: 14.03rem;
          height: 0.31rem;
        }
      }
      .key-wrap {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        .item-wrap {
          width: 20%;
          text-transform: uppercase;
          color: #fff;
          font-size: 1.5rem;
          line-height: 2.5rem;
          margin-bottom: 2rem;
          .key {
            width: 2.5rem;
            height: 2.5rem;
            text-align: center;
          }
        }
      }
      .btn-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .right {
      flex-grow: 1;
      width: 70%;
      height: 100vh;
      box-sizing: border-box;
      background-color: #fff;
      background-image: linear-gradient(20deg, #111725 0%, #2f3350 52%, #3d5792 100%), linear-gradient(#fcdd93, #fcdd93);
      background-blend-mode: normal, normal;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 2rem 1.5rem;
      .result-wrap {
        font-size: 0.94rem;
        line-height: 1.35rem;
        letter-spacing: 0rem;
        color: #fff;
        margin-bottom: 1rem;
        .number {
          color: #bab1ff;
        }
      }
      .outer-wrap {
        height: calc(100vh - 5rem);
        overflow-y: scroll;
        .result-content-wrap {
          display: flex;
          flex-wrap: wrap;
          // border: 1px solid red;
          align-content: flex-start;
          padding-top: 1rem;
          .item-wrap {
            width: 25%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
            outline: none !important;
            .result-item {
              // border: 1px solid red;
              img {
                width: 8.38rem;
                height: 12.22rem;
                margin-bottom: 0.5rem;
              }
              .name {
                // border: 1px solid red;
                text-align: center;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;
                font-size: 0.94rem;
                line-height: 1.35rem;
                letter-spacing: 0rem;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
}
</style>