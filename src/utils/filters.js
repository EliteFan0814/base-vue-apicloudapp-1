/* 统一过滤器入口 */
import Vue from 'vue';
import moment from 'moment';

// 日期只显示年月日
Vue.filter('shortDate', function(str){
  return str ? str.split(' ')[0] : ''
})

// 金额过滤器 cnMoney
Vue.filter('cnMoney', function (number) {
  if (typeof number === 'number') {
    return '￥' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (typeof number === 'string' && !isNaN(number)) {
    number = parseFloat(number);
    return '￥' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return '￥-';
  }
});
// 短日期过滤器 cnDate
Vue.filter('cnDate', function (date) {
  if (date instanceof Date) {
    return moment(date).format('YYYY年MM月DD日');
  }
  if (typeof date === 'string' || typeof date === 'number') {
    try {
      return moment(date).format('YYYY年MM月DD日');
    } catch (e) { }
  }
  return '-';
});
// 长日期过滤器 cnDateTime
Vue.filter('cnDateTime', function (date) {
  if (date instanceof Date) {
    return moment(date).format('YYYY年MM月DD日 HH:mm:ss');
  }
  if (typeof date === 'string' || typeof date === 'number') {
    try {
      return moment(date).format('YYYY年MM月DD日 HH:mm:ss');
    } catch (e) { }
  }
  return '-';
});

Vue.filter('commonDate', function (date) {
  if (date instanceof Date) {
    return moment(date).format('YYYY-MM-DD');
  }
  if (typeof date === 'string' || typeof date === 'number') {
    try {
      return moment(date).format('YYYY-MM-DD');
    } catch (e) { }
  }
  return '-';
});

Vue.filter('msgDate', function (date) {
  if (date instanceof Date || typeof date === 'string' || typeof date === 'number') {
    try {
      date = moment(date).toDate();
    } catch (e) {
      return '-';
    }
  } else {
    return '-';
  }
  var curDate = new Date();
  var timestamp = curDate.getTime() - date.getTime();

  if (timestamp / 1000 < 10) {
    return '刚刚';
  }
  if (timestamp / 1000 / 60 < 1) {
    return Math.round(timestamp / 1000) + '秒前';
  }

  if (timestamp / 1000 / 60 / 60 < 1) {
    return Math.round(timestamp / 1000 / 60) + '分钟前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 < 1) {
    return Math.round(timestamp / 1000 / 60 / 60) + '小时前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 / (365 / 12) < 1) {
    return Math.round(timestamp / 1000 / 60 / 60 / 24) + '天前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 / 365 < 1) {
    return Math.round(timestamp / 1000 / 60 / 60 / 24 / (365 / 12)) + '月前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 / 356 > 1) {
    return Math.round(timestamp / 1000 / 60 / 60 / 24 / 365) + '年前';
  }
  return '-';
});
Vue.filter('conDate', function (date) {
  if (date instanceof Date || typeof date === 'string' || typeof date === 'number') {
    try {
      date = moment(date).toDate();
    } catch (e) {
      return '-';
    }
  } else {
    return '-';
  }
  var curDate = new Date();
  var timestamp = curDate.getTime() - date.getTime();
  if (timestamp / 1000 < 10) {
    return '刚刚';
  }

  if (timestamp / 1000 / 60 < 1) {
    return Math.round(timestamp / 1000) + '秒前';
  }
  if (timestamp / 1000 / 60 / 60 < 1) {
    return Math.round(timestamp / 1000 / 60) + '分钟前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 < 1) {
    return Math.round(timestamp / 1000 / 60 / 60) + '小时前';
  }
  if (timestamp / 1000 / 60 / 60 / 24 / (365 / 12) < 1) {
    return Math.round(timestamp / 1000 / 60 / 60 / 24) + '天前';
  }

  return moment(date).format('YYYY-MM-DD');
});
