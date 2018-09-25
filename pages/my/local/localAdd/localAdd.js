// pages/my/local/localAdd/localAdd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '', // 用户ID
    name:"", // 姓名
    mobie:"",// 手机号码
    title: "",// 地址名称
    address: "", // 地址
    num: "", // 门牌号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取姓名
  bindNameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  // 获取手机号
  bindTelInput(e) {
    this.setData({
      mobie: e.detail.value
    })
  },
  // 获取门牌号
  bindAddressInfoInput(e){
    this.setData({
      num: e.detail.value
    })
  },
  // 保存地址
  address(){
    let that = this;
    if (that.data.name == ''){
      wx.showToast({
        title:"姓名不能为空",
        icon: 'none',
      })
    } else if (that.data.mobie == ''){
      wx.showToast({
        title: "手机不能为空",
        icon: 'none',
      })
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(that.data.mobie))){
      wx.showToast({
        title: "手机格式错误",
        icon: 'none',
      })
    } else if (that.data.title == '' ){
      wx.showToast({
        title: "地址不能为空",
        icon: 'none',
      })
    } else if (that.data.num == '' ) {
      wx.showToast({
        title: "楼号不能为空",
        icon: 'none',
      })
    } else {
      wx.showLoading();
      wx.request({
        url: app.globalData.requestHttp + 'local/wx_add_local.php',
        header: app.globalData.requestHeader,
        method: "POST",
        data: {
          uid: app.globalData.openid,
          name: that.data.name,
          mobie: that.data.mobie,
          address: that.data.address,
          title: that.data.title,
          num: that.data.num,
        },
        success(res) {
          if(res.data.success == 1){
            let time = setTimeout(function(){
              wx.hideLoading({
                success: function () {
                  wx.removeStorage({
                    key:"local"
                  })
                  wx.showToast({
                    icon: 'none',
                    title: "地址添加成功",
                    success:function(){
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                }
              })
            },1000)
          }else{
            let time = setTimeout(function () {
              wx.hideLoading({
                success:function(){
                  wx.showToast({
                    icon: 'none',
                    title: "系统异常"
                  })
                }
              })
            }, 1000)
          }
          console.log(res)
        },
        fail() {

        }
      })
    } 
  },

  choiceLocla(){
    wx.navigateTo({
      url: '../../../localMap/localMap',
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
    let that = this;
    wx.getStorage({
      key: 'local',
      success: function (res) {
        console.log(res.data)
        that.setData({
          title: res.data.title,
          address: res.data.address,
        })
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