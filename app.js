//app.js
App({
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        console.log(res);
        that.globalData.locationData = res;
      },
      cancel: function (res) {
        alert('用户拒绝授权获取地理位置');
      }
    });
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let that = this;
        let appid = 'wx4773aa4010088788';

        let secret = 'b5ef829f3f154a73340c09ba70e13dae';
        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + res.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            // console.log(res.data.openid) //获取openid
            that.globalData.openid = res.data.openid
          }
        })
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,

    locationData:{},

    gdmapsdk_key: 'aec3a24100751ab7feaa43f0530de7fb',

    openid:"",

    //请求设置
    requestHeader: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    //请求设置
    requestHeaderJson: {
      'content-type': 'application/json'
    },

    //登录 本地
    requestHttp: "http://120.78.72.0/wechat/",
  }
})