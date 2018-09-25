// pages/my/local/local.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr: ""
  },

  addLocal() {
    wx.navigateTo({
      url: '../../my/local/localAdd/localAdd'
    })
  },

  UpdateLocal(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../my/local/localUpdate/localUpdate?id=" + id + ""
    })
  },

  localInfo(e){
    wx.setStorage({
      key:'local',
      data: e.currentTarget.dataset.local,
      success:function(){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this;
    wx.request({
      url: app.globalData.requestHttp + 'local/wx_read_local.php',
      header: app.globalData.requestHeader,
      method: "POST",
      data: {
        uid: app.globalData.openid
      },
      success(res) {
        that.setData({
          dataArr: res.data.data
        })
      },
      fail() {

      }
    })
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