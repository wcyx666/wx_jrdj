// pages/index/preOrder/preOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    furnVal: "",
    typeArray: ['维修', '安装'],
    proType: "",// 预约项目
    makeDateTime: "",//预约时间

    proTitle: "", // 故障名称
    types: "1",// 维修安装类型标识 1维修
    localTitle: "",// 小区地址
    localNum: "",// 小区楼号
    localAddress: "", //小区地址
    localName: "",// 联系人用户名
    localMobie: "",// 联系人电话
    makeData: "", //预约日期
    makeTime: "", //预约时间
    proName: "",// 预约项目名称
    coupon: "1", //是否使用了优惠券 1 未使用 2 使用
    textarea: "",//问题详情
  },

  switch1Change: function (e) {
    if (e.detail.value) {
      this.setData({
        furnVal: 1
      })
    } else {
      this.setData({
        furnVal: 2
      })
    }
  },

  bindPickerChange(e) {
    this.setData({
      types: e.detail.value
    })
  },

  textarea(e) {
    this.setData({
      textarea: e.detail.value
    })
  },

  // 跳转服务地址
  routerLocal() {
    wx.navigateTo({
      url: '../service-address/address',
    })
  },
  // 跳转预约项目
  routerProject() {
    wx.navigateTo({
      url: '../cleaning-project/project',
    })
  },
  // 跳转预约时间
  routerAppointment() {
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
  // 跳转优惠券
  routerAvailable() {
    wx.navigateTo({
      url: '../../my/coupon/coupon',
    })
  },
  // 提交订单
  getOrder() {
    wx.showLoading();
    let that = this;
    if (that.data.localTitle == '') {
      wx.showToast({
        title: "服务地址为空",
        icon: 'none',
      })
    } else if (that.data.proName == '') {
      wx.showToast({
        title: "维修项目为空",
        icon: 'none',
      })
    } else if (that.data.makeData == '') {
      wx.showToast({
        title: "预约时间为空",
        icon: 'none',
      })
    } else if (that.data.textarea == '') {
      wx.showToast({
        title: "问题描述为空",
        icon: 'none',
      })
    } else {

      wx.request({
        url: app.globalData.requestHttp + 'order/wx_order.php',
        header: app.globalData.requestHeader,
        method: "POST",
        data: {
          uid: app.globalData.openid,
          types: that.data.types,// 维修安装类型标识
          localTitle: that.data.localTitle,// 小区地址
          localNum: that.data.localNum,// 小区楼号
          localAddress: that.data.localAddress, //小区地址
          localName: that.data.localName,// 联系人用户名
          localMobie: that.data.localMobie,// 联系人电话
          makeData: that.data.makeData, //预约日期
          makeTime: that.data.makeTime, //预约时间
          proName: that.data.proName,// 预约项目名称
          proTitle: that.data.proTitle,// 预约项目名称
          isCoupon: that.data.coupon, //是否使用了优惠券
          textarea: that.data.textarea //问题详情描述
        },
        success(res) {
          let orderId = res.data.orderId;
          if (res.data.success == '1') {
            let time = setTimeout(function () {
              wx.hideLoading({
                success: function () {
                  wx.showModal({
                    title: '订单提交成功',
                    showCancel: false,
                    cancelColor: "#db5044",
                    content: '前往订单页面，等待师傅接单',
                    success: function (res) {
                      console.log(res)
                      if (res.confirm) {
                        wx.clearStorage();
                        wx.switchTab({
                          url: '../../order/order?id=' + orderId,
                        })
                      }
                    }
                  })
                }
              })
            }, 1000)

          } else {
            let time = setTimeout(function () {
              wx.hideLoading({
                success: function () {
                  wx.showToast({
                    title: "系统异常",
                    icon: 'none',
                  })
                }
              })
            }, 1000)
          }
        },
        fail() {

        }
      })
    }
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
    // 获取地址
    wx.getStorage({
      key: 'local',
      success: function (res) {
        that.setData({
          localName: res.data.name,
          localMobie: res.data.mobie,
          localTitle: res.data.title,
          localNum: res.data.num,
          localAddress: res.data.address
        })
      },
    })
    // 获取维修项目
    wx.getStorage({
      key: 'typeName',
      success: function (res) {
        that.setData({
          proName: res.data.name.name,
          proTitle: res.data.title,
          proType: res.data.name.types
        })
      },
    })
    // 获取预约时间
    wx.getStorage({
      key: 'timestamp',
      success: function (res) {
        that.setData({
          makeData: res.data.date, //预约日期
          makeTime: res.data.time, //预约时间
          makeDateTime: res.data.date + ' ' + res.data.time
        })
      },
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