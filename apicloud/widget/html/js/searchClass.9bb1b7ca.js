!function(t){function e(e){for(var s,r,c=e[0],o=e[1],l=e[2],f=0,p=[];f<c.length;f++)r=c[f],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);for(u&&u(e);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,c=1;c<n.length;c++){var o=n[c];0!==i[o]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var s={},i={9:0},a=[];function r(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var c=window.webpackJsonp=window.webpackJsonp||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=o;a.push([7,1,0]),n()}({7:function(t,e,n){t.exports=n("b034")},"71c4":function(t,e,n){"use strict";var s=n("ad27");n.n(s).a},ad27:function(t,e,n){},b034:function(t,e,n){"use strict";n.r(e),n("cadf"),n("551c"),n("f751"),n("097d");var s=n("22b4"),i=n("2909"),a=(n("96cf"),n("1da1")),r=n("82ea"),c=n("5780"),o=n("4505"),l=n("bfd3"),u=n("70a5"),f={components:{BaseButton:r.a,noList:l.a},data:function(){return{firstIn:!0,totalCount:0,classList:[],searchList:[],activeIndex:0,keywords:"",page:1,pageSize:15,typeId:void 0,infiniteId:+new Date}},created:function(){var t=this;api.addEventListener({name:"viewappear"},(function(){t.$checkBindAsync()}))},methods:{videoEnd:function(){this.$toast.success("播放完毕"),api.openVideo({url:"http://xst.test.fxcloud.net/public/2021-01-15-18-17-34.avi"}),setTimeout((function(){api.openApp({androidPkg:"com.y552426811.jcs"},(function(t,e){t?_this.$toast.success("内页打开当前应用"):_this.$toast.fail("内页打开应用失败")}))}),6e4),setTimeout((function(){api.closeFrame()}),2e3)},openPlay:function(){Object(o.b)(playing)},handleSelect:function(t){""===this.searchKey?this.searchKey=""+t:this.searchKey+=""+t},deleteByte:function(t){if(t){if(""===this.searchKey)return;this.searchKey=this.searchKey.substr(0,this.searchKey.length-1)}else this.searchKey=""},changeClass:function(t,e){this.activeIndex!==t&&(this.activeIndex=t,this.typeId=e,this.page=1,this.searchList=[],this.totalCount=0,this.firstIn=!1,this.infiniteId+=1)},getClassListAsync:function(){var t=Object(a.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!this.firstIn){t.next=8;break}return t.next=4,u.a.getClassList();case 4:(e=t.sent).value.unshift({name:"全部",id:""}),this.classList=e.value,this.typeId=e.value[0].id;case 8:t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0);case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));return function(){return t.apply(this,arguments)}}(),infiniteHandler:function(){var t=Object(a.a)(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==this.page){t.next=3;break}return t.next=3,this.getClassListAsync();case 3:u.a.getSearchList(this.typeId,this.page,this.pageSize).then((function(t){var s,a=t.value,r=a.data,c=a.totalCount;r.length?(n.page+=1,(s=n.searchList).push.apply(s,Object(i.a)(r)),n.totalCount=c,e.loaded()):e.complete()})).catch((function(t){}));case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),getAllNum:function(){var t=this;u.a.getAllNum().then((function(e){t.totalNumber=e.value})).catch((function(t){}))},openDetail:function(t){Object(o.b)(c.c,{id:t})},goBack:function(){api.closeWin()},goSearch:function(){Object(o.b)(c.f)}}},p=(n("71c4"),n("2877")),d=Object(p.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"content-wrap"},[n("div",{staticClass:"top-wrap"},[n("div",{staticClass:"left"},[n("van-icon",{attrs:{name:"arrow-left"}}),n("span",{staticClass:"goback focus",attrs:{tabindex:"0"},on:{click:t.goBack}},[t._v("返回")]),n("div",{staticClass:"search-wrap focus",attrs:{tabindex:"0"},on:{click:t.goSearch}},[n("van-icon",{attrs:{name:"search"}})],1)],1),n("div",{staticClass:"right"},[t._v("\n        共"+t._s(t.totalCount)+"部资源\n      ")])]),n("div",{staticClass:"class-wrap"},[n("div",{staticClass:"class-list flex"},t._l(t.classList,(function(e,s){return n("div",{key:s,class:{"list-item":!0,"text-focus":t.activeIndex===s},attrs:{tabindex:"0"},on:{focus:function(n){return t.changeClass(s,e.id)}}},[t._v(t._s(e.name)+"\n        ")])})),0)]),n("div",{staticClass:"inner-content-wrap"},[n("div",{staticClass:"content-list flex"},t._l(t.searchList,(function(e,s){return n("div",{key:s,staticClass:"content-item flex-cc",on:{click:function(n){return t.openDetail(e.id)}}},[n("div",{staticClass:"content flex-dc item-focus",attrs:{tabindex:"0"}},[n("div",{staticClass:"img-wrap"},[n("img",{attrs:{src:e.hostThumb,alt:""}})]),n("div",{staticClass:"name omit-1"},[t._v(t._s(e.name))])])])})),0)])]),n("infinite-loading",{attrs:{identifier:t.infiniteId,distance:200,direction:"bottom"},on:{infinite:t.infiniteHandler}},[n("div",{staticClass:"state-style",attrs:{slot:"spinner"},slot:"spinner"},[t._v("读取中...")]),n("div",{staticClass:"state-style",attrs:{slot:"no-more"},slot:"no-more"},[t._v("已加载全部")]),n("div",{staticClass:"state-style",attrs:{slot:"no-results"},slot:"no-results"},[n("no-list",{attrs:{text:"暂无影片"}})],1)])],1)}),[],!1,null,"197f9f2b",null).exports;new s.a({el:"#app",render:function(t){return t(d)}})}});