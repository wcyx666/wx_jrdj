// pages/order/deilter/deilter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"", // 订单ID,
    details:"", // 订单详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
    wx.request({
      url: app.globalData.requestHttp + 'order/wx_order_details.php',
      header: app.globalData.requestHeader,
      method: "POST",
      data: {
        id: options.id,
      },
      success(res) {
        console.log(res)
        that.setData({
          details: res.data.details
        })
      },
      fail() {

      }
    })
  },
  // 取消订单
  canclOrder(){
    let that = this;
    wx.showModal({
      title:"提示",
      content:"确认取消订单吗？",
      success:function(){
        wx.request({
          url: app.globalData.requestHttp + 'order/wx_cancel_order.php',
          header: app.globalData.requestHeader,
          method: "POST",
          data: {
            id: that.data.id,
          },
          success(res) {
            console.log(res)
            if (res.data.success == '1'){
              wx.navigateBack({
                delta:1
              })
            }
          },
          fail() {

          }
        })
      }
    })
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