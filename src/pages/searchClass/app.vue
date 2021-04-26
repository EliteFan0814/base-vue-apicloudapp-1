<template>
  <div class="container">
    <div class="content-wrap">
      <div class="top-wrap">
        <div class="left">
          <van-icon name="arrow-left" />
          <span tabindex="-1" @click="goBack" class="goback focus">返回</span>
          <div tabindex="0" @click="goSearch" class="search-wrap focus">
            <van-icon name="search" />
          </div>
        </div>
        <div class="right">
          共{{totalCount}}部资源
        </div>
      </div>
      <div class="class-wrap">
        <div class="class-list" id="parent-tab">
          <div v-for="(item,index) in classList" :key="index" tabindex="0" :id="'son-tab-'+index"
            @focus="changeClass(index,item.id)"
            :class="{'list-item':true, 'text-focus':activeIndex===index?true:false}">{{item.name}}
          </div>
        </div>
        <!-- <van-tabs>
          <van-tab v-for="index in 20" :title="'标签 ' + index">
            内容 {{ index }}
          </van-tab>
        </van-tabs> -->
      </div>
      <div class="inner-content-wrap">
        <div class="content-list flex">
          <div v-for="(item,index) in searchList" :key="index" @click="openDetail(item.id)"
            class="content-item flex-cc">
            <div tabindex="0" class="content flex-dc item-focus" :id="'source'+index">
              <div class="img-wrap">
                <img :src="item.hostThumb" alt="">
              </div>
              <div class="name omit-1">{{item.name}}</div>
            </div>
          </div>
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
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { search, movieInfo } from '@/common/router.js'
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
      firstIn: true, // 是否首次进入此页面
      totalCount: 0,
      classList: [],
      searchList: [],
      activeIndex: 0,
      keywords: '',
      page: 1,
      pageSize: 15,
      typeId: undefined,
      infiniteId: +new Date()
    }
  },
  created() {
    // this.getAllNum()
    api.addEventListener(
      {
        name: 'viewappear'
      },
      () => {
        this.$checkBindAsync()
      }
    )
  },
  updated() {
    if (this.firstIn) {
      let a = document.getElementById('source0')
      if (a) {
        a.focus()
        this.firstIn = false
      }
    }
  },
  methods: {
    // 获取手机权限
    // async accessReAsync() {
    //   const accessRes = await this.$checkSystemAccess('phone', '手机')
    //   if (accessRes) {
    //     alert(this.$uuidv4())
    //   }
    // },
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
    openPlay() {
      openWin(playing)
    },
    handleSelect(item) {
      if (this.searchKey === '') {
        this.searchKey = '' + item
      } else {
        this.searchKey += '' + item
      }
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
    // 改变聚焦class
    changeClass(index, id) {
      if (this.activeIndex !== index) {
        this.activeIndex = index
        this.typeId = id
        this.page = 1
        this.searchList = []
        this.totalCount = 0
        this.firstIn = false
        this.infiniteId += 1

        const son_dom = document.getElementById('son-tab-' + this.activeIndex)
        const father_dom = document.getElementById('parent-tab')
        if (son_dom) {
          const clientWidth = father_dom.clientWidth
          // const scrollLeft = recommend_title_dom.scrollLeft;
          const offsetLeft = son_dom.offsetLeft
          father_dom.scrollLeft = offsetLeft - clientWidth / 2 + son_dom.clientWidth / 2
        }
      }
    },
    async getClassListAsync() {
      try {
        if (this.firstIn) {
          let tempRes = await request.getClassList()
          tempRes.value.unshift({ name: '全部', id: '' })
          this.classList = tempRes.value
          this.typeId = tempRes.value[0].id
        }
      } catch (err) {
        console.log(err)
      }
    },
    async infiniteHandler($state) {
      if (this.page === 1) {
        await this.getClassListAsync()
      }
      request
        .getSearchList(this.typeId, this.page, this.pageSize)
        .then(({ value: { data, totalCount } }) => {
          // alert(JSON.stringify(data))
          if (data.length) {
            this.page += 1
            this.searchList.push(...data)
            this.totalCount = totalCount
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((err) => {})
    },
    getAllNum() {
      request
        .getAllNum()
        .then((res) => {
          this.totalNumber = res.value
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openDetail(id) {
      openWin(movieInfo, { id })
    },
    goBack() {
      api.closeWin()
    },
    goSearch() {
      openWin(search)
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
  overflow: hidden;
  font-family: PingFang-SC-Bold;
  padding: 0;

  background-image: url('../../static/image/index/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .omit-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
  .content-wrap {
    box-sizing: border-box;
    padding: 2rem;
    .focus {
      box-sizing: border-box;
      transition: all 0.4s;
      box-shadow: none;
      outline: 1px solid transparent;
      &:focus {
        // outline: 1px solid #4f37fa;
        outline: 1px solid transparent;
        box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
        border-image-source: linear-gradient(90deg, #ffffff 100%);
        border-image-slice: 1;
      }
    }
    .text-focus {
      // transition: all 0.1s;
      // outline: none !important;
      font-weight: bold;
      font-size: 1.81rem;
      text-shadow: 0px 0px 5px #fff;
      // &:focus {
      // }
    }
    .item-focus {
      box-sizing: border-box;
      transition: all 0.4s;
      box-shadow: none;
      outline: 1px solid transparent;
      &:focus {
        .img-wrap {
          outline: 1px solid #4f37fa;
          box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
          border-image-source: linear-gradient(90deg, #ffffff 100%);
          border-image-slice: 1;
        }
        .name {
          font-weight: 400;
          text-shadow: 0px 0px 1px #fff;
        }
      }
    }
    .top-wrap {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      .left {
        display: flex;
        align-items: center;
        font-size: 1.13rem;
        letter-spacing: 0.11rem;
        color: #ffffff;
        .goback {
          margin-right: 2.06rem;
        }
        .search-wrap {
          box-sizing: border-box;
          padding: 0rem 0.31rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 1.53rem;
          width: 6.25rem;
          height: 1.63rem;
          border-radius: 0.81rem;
          border: solid 0.06rem #ffffff;
        }
      }
      .right {
        font-size: 1.5rem;
        letter-spacing: 0.08rem;
        color: #ffea3b;
      }
    }
    .class-wrap {
      box-sizing: border-box;
      padding: 0 6rem;
      margin-bottom: 1.4rem;
      .class-list {
        padding: 0.3rem 0;
        font-size: 1.31rem;
        letter-spacing: 0rem;
        color: #ffffff;
        display: flex;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .list-item {
          text-align: center;
          width: 15%;
          flex-shrink: 0;
          line-height: 1.9rem;
          transition: all 0.1s;
          outline: none !important;
        }
      }
    }
    .inner-content-wrap {
      padding: 0 6rem;
      .content-list {
        flex-wrap: wrap;
        .content-item {
          box-sizing: border-box;
          width: 20%;
          margin-bottom: 1rem;
          .content {
            width: 100%;
            .img-wrap {
              margin-bottom: 0.5rem;
              width: 8.38rem;
              height: 10.22rem;
              img {
                width: 8.38rem;
                height: 10.22rem;
              }
            }
            .name {
              text-align: center;
              width: 90%;
              font-size: 1.21rem;
              letter-spacing: 0rem;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
.flex {
  display: flex;
  align-items: center;
}
.flex-cc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-dc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.omit-1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
</style>