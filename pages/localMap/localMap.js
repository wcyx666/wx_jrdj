// pages/my/local/localAdd/localAdd.js
const app = getApp();

// 引入SDK核心类
const QQMapWX = require('../../lib/qqmap-wx-jssdk.js');

const demo = new QQMapWX({
  key: '5MPBZ-B6EAX-NIS4K-ZBRGH-KOPG7-NSBZA' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pois:"",
    inpuVal:"",
  },

  address(e){
    wx.setStorage({
      key: "local",
      data: e.currentTarget.dataset.local,
      success:function(){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  bindInput(e){
    if (e.detail.value != ''){
      this.QQMAP(e.detail.value)
    }
    this.setData({
      inpuVal: e.detail.value
    })    
  },

  QQMAP(val){
    let that = this;
    demo.getSuggestion({
      keyword: val,
      region: "大同市",
      policy: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          pois: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  reverseGeocoder(){
    let that = this;
    demo.reverseGeocoder({
      location: {
        latitude: app.globalData.locationData.latitude,
        longitude: app.globalData.locationData.longitude,
       
      },
      get_poi: 1,
      success: function (res) {
        that.setData({
          pois: res.result.pois
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用接口
    this.reverseGeocoder();
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})