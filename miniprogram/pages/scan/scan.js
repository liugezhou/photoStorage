var currentImgfileID="";
var downloadFileID="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorization:false,
    qRCodeMsg: '未识别，请重新扫码！',
		show:true,
		uploadimg:false,
    showcode:false,
    imagePath: '',
    avatarUrl:'',
    finalview:false
  },
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        authorization:true,
        avatarUrl: e.detail.userInfo.avatarUrl
      })
    }
  },
  getQRCode: function () {
    
    var _this = this;
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res);    //输出回调信息
        _this.setData({
          qRCodeMsg: res.result,
					show:false,
          showcode:true,
          finalview:false,
					uploadimg:true
        });
      }
    })
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    var _this =this
    const db = wx.cloud.database()
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = _this.data.qRCodeMsg + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
						wx.showToast({
							icon: 'success',
							title: '上传成功',
						})
						_this.setData({
							qRCodeMsg: "未识别，请重新扫码！",
							uploadimg: false,
              finalview: true,
              showcode:false
						});
            console.log('[上传文件] 成功：', res)
            downloadFileID = res.fileID
            _this.setData({
              imagePath: filePath
            })
            currentImgfileID = filePath
            //将图片的一些信息存到数据库中去
            db.collection('fileid').add({
              data: {
                filePath: filePath,
                cloudPath: cloudPath,
                fileid: res.fileID
              }
            })
            
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  
  viewall: function(){
    //下载文件
    wx.cloud.downloadFile({
      fileID: downloadFileID, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
      },
      fail: console.error
    })
    //全屏查看照片
    // wx.previewImage({
    //   current: currentImgfileID, // 当前显示图片的http链接
    //   urls: [currentImgfileID] // 需要预览的图片http链接列表
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if (!wx.cloud) {
			wx.redirectTo({
				url: '../chooseLib/chooseLib',
			})
			return
		}
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorization: true,
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
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