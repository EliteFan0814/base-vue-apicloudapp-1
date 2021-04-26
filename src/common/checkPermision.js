// import { Toast } from 'vant'

function checkPermision(nameArr) {
  return new Promise((resolve, reject) => {
    var resultList = api.hasPermission({
      list: nameArr
    })
    for (const item of resultList) {
      // 权限已开
      if (item.granted) {
        resolve()
      } else {
        requestPermision(item.name)
          .then((res) => {
            resolve()
          })
          .catch((err) => {
            api.toast({ msg: '权限开启失败' })
            reject(err)
          })
      }
    }
  })
}

function requestPermision(name) {
  return new Promise((resolve, reject) => {
    api.requestPermission(
      {
        list: [name],
        code: 1
      },
      (ret, err) => {
        // 请求权限成功
        if (ret.list[0].name === name && ret.list[0].granted) {
          resolve()
        } else {
          // 请求权限失败
          reject(err)
        }
      }
    )
  })
}

export { checkPermision }
