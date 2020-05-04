//index.js
const app = getApp()

Page({
  data: {
    phone: '15021134415',
  },
  pay: async (e) => {
    try {
      const { money } = e.currentTarget.dataset
      console.log('调用支付', money)
      wx.cloud.callFunction({
        name: 'pay',
        data: {
          money: parseFloat(money) * 100 + ''
        },
        success: (data) => {
          console.log(data.result)
          const { payParams } = data.result
          
          wx.requestPayment({
            nonceStr: payParams.nonceStr,
            package: payParams.package,
            paySign: payParams.paySign,
            timeStamp : payParams.timeStamp,
            signType : 'MD5',
            success: () => {
              wx.showToast({
                title: '支付成功'
              })
              wx.showShareMenu({
                withShareTicket: true,
                complete: (res) => {},
              })
            },
            fail: (err) => {
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
              console.log(err)
            }
          })
        }
      })
    } catch (error) {
    }
  }
})
