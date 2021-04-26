<template>
  <div class="container">
    <div class="content-wrap">
      <div class="top-wrap">
        <div class="left">
          <van-icon name="arrow-left" />
          <span tabindex="0" @click="goBack" class="goback focus">返回</span>
          <!-- <div tabindex="0" class="search-wrap focus">
            <van-icon name="search" />
          </div> -->
        </div>
        <div class="right">

        </div>
      </div>
      <div class="content-wrap">
        <div class="content">
          <div class="content-top flex">
            <img class="movie-img" :src="movieInfo.hostThumb" alt="">
            <div class="info-wrap flex-dc">
              <div class="title">{{movieInfo.name}}</div>
              <div class="star-mark flex">
                <div class="mark-wrap">
                  <img class="mark-img" src="@/static/image/icon/star-bg.png"></img>
                  <div class="fill" :style="{width:starFill}">
                    <img class="mark-img " src="@/static/image/icon/star-fill.png"></img>
                  </div>
                </div>
                <p class="mark-num" :class="{'all-mark':movieInfo.scores===10?true:false}">
                  {{movieInfo.scores}}<span class="grade">分</span>
                </p>
              </div>
              <div class="info flex-dc">
                <span class="info-item">地区：{{movieInfo.area}}</span>
                <span class="info-item">年份：{{movieInfo.year}}</span>
                <span class="info-item">导演：{{movieInfo.director}}</span>
                <span class="info-item">分类：{{movieInfo.classStr}}</span>
                <span class="info-item">片长：{{movieInfo.time}}</span>
                <span class="info-item">主演：{{movieInfo.actor}}</span>
              </div>
            </div>
          </div>
          <div class="content-bottom flex">
            <div class="source-wrap flex">
              <!-- <div v-for="(item,index) in 5 " class="source-item flex-cc">
                <div tabindex="0" ref="source" :id="'source'+index" class="source focus flex-cc"
                  @click="openMovie(item)">
                  <van-icon name="play-circle-o" />
                  <span>资源{{index+1}}</span>
                </div>
              </div> -->
              <div v-for="(item,index) in movieInfo.completeUrlArray " class="source-item flex-cc">
                <div tabindex="0" ref="source" :id="'source'+index" class="source focus flex-cc"
                  @click="openMovie(item)">
                  <van-icon name="play-circle-o" />
                  <div class="movie-name omit-1">{{movieInfo.completeNameArray[index]}}</div>
                </div>
              </div>
            </div>
            <span class="introduction flex">
              剧情简介：{{movieInfo.intro}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { playing } from '@/common/router.js'
import { openWin } from '@/common/openPage.js'
import request from '@/api/searchClass'
export default {
  components: {
    BaseButton
  },
  data() {
    return {
      localHost: $api.getStorage('ip'),
      advertiseUrl: undefined,
      id: undefined,
      deviceId: $api.getStorage('uuid'),
      starFill: '0%',
      movieInfo: {
        name: 0,
        scores: 0,
        area: undefined,
        year: undefined,
        director: undefined,
        classStr: undefined,
        time: 0,
        actor: undefined,
        intro: undefined
      }
    }
  },
  created() {
    this.id = api.pageParam.data.id
    this.getMovieInfo()
    this.getAdvVideo()
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
    let a = document.getElementById('source0')
    a.focus()
  },
  methods: {
    goBack() {
      api.closeWin()
    },
    getAdvVideo() {
      request.getAdvVideo().then((res) => {
        this.advertiseUrl = this.localHost + res.value.value
      })
    },
    openMovie(info) {
      this.upHistory()
      openWin(playing, { info, advertiseUrl: this.advertiseUrl }, true)
    },
    getMovieInfo() {
      request
        .getmovieInfo(this.id)
        .then((res) => {
          this.movieInfo = res.value
          let temp = ''
          res.value.movieType.map((item, index, arr) => {
            temp += item.name
            if (index < arr.length - 1) {
              temp += ' | '
            }
          })
          this.movieInfo.classStr = temp
          this.movieInfo.scores = res.value.scores
          this.starFill = res.value.scores * 10 + '%'
          this.movieInfo = { ...this.movieInfo, ...res.value }

          // this.$refs.source1.focus()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 上传点播历史
    upHistory() {
      request
        .upHistory(this.id, this.deviceId)
        .then((res) => {})
        .catch((err) => {})
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
    // box-sizing: border-box;
    // width: 100%;
    // display: flex;
    padding: 2rem;
    .focus {
      box-sizing: border-box;
      transition: all 0.4s;
      outline: 1px solid transparent;
      box-shadow: none;
      &:focus {
        outline: 1px solid #fff;
        box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
        border-image-source: linear-gradient(90deg, #ffffff 100%);
        border-image-slice: 1;
      }
    }
    .text-focus {
      transition: all 0.4s;
      outline: none !important;
      &:focus {
        outline: none !important;
        font-weight: bold;
        text-shadow: 0px 0px 5px #fff;
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
    .content-wrap {
      padding: 0 6rem;
      .content {
        .content-top {
          align-items: stretch;
          color: #fff;
          margin-bottom: 1rem;
          .movie-img {
            width: 12.63rem;
            height: 14.88rem;
            margin-right: 1.5rem;
          }
          .info-wrap {
            justify-content: space-between;
            align-items: flex-start;
            .title {
              font-size: 1.88rem;
              letter-spacing: 0.19rem;
              color: #ffffff;
            }
            .star-mark {
              .mark-wrap {
                position: relative;
                margin-right: 0.5rem;
                .mark-img {
                  width: 12rem;
                }
                .fill {
                  position: absolute;
                  top: 0;
                  left: 0;
                  overflow: hidden;
                }
              }

              .mark-num {
                font-size: 1.13rem;
                color: #34b5ff;
                .grade {
                  font-size: 1.13rem;
                  color: #fff;
                }
                &:first-letter {
                  font-size: 1.88rem;
                }
              }
              .all-mark {
                font-size: 1.88rem;
              }
            }
            .info {
              align-items: flex-start;
              font-size: 1.13rem;
              letter-spacing: 0rem;
              .info-item {
                margin-bottom: 0.2rem;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
        .content-bottom {
          color: #fff;
          .source-wrap {
            width: 12.63rem;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-right: 1.5rem;
            .source-item {
              margin-bottom: 0.5rem;
              width: 45%;
              .source {
                width: 100%;
                padding: 0.7rem 0rem;
                background-image: linear-gradient(90deg, #3fbbfe 0%, #a541ff 100%), linear-gradient(#34b5ff, #34b5ff);
                background-blend-mode: normal, normal;
                border-radius: 0.13rem;
                .movie-name {
                  flex-grow: 1;
                  text-align: center;
                  max-width: 4rem;
                }
              }
            }
          }
          .introduction {
            width: 40rem;
            font-size: 1.13rem;
            line-height: 1.38rem;
            letter-spacing: 0rem;
            color: #ffffff;
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