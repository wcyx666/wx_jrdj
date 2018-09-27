//index.js
//获取应用实例
const app = getApp();
// 引入SDK核心类
const QQMapWX = require('../../lib/qqmap-wx-jssdk.js');

const demo = new QQMapWX({
  key: '5MPBZ-B6EAX-NIS4K-ZBRGH-KOPG7-NSBZA' // 必填
});

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    city:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  reverseGeocoder(lat,lon) {
    let that = this;
    demo.reverseGeocoder({
      location: {
        latitude: app.globalData.locationData.latitude,
        longitude: app.globalData.locationData.longitude,

      },
      get_poi: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          city: res.result.address_component.city
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.reverseGeocoder(latitude,longitude)
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})
