import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './index.less'

let watcher

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

/*
this.messageListener = 
db.collection(collection).where(this.mergeCommonCriteria(criteria)).watch({

groupId

*/

  componentDidMount () {
    const db = wx.cloud.database()
    watcher = db.collection('Queue')
      .orderBy('currentDate', 'asc')
      .where({
        currentDate: moment().format('YYYY-M-D')
      })
      .limit(1)
      .watch({
        onChange: function(snapshot) {
          console.log('docs\'s changed events', snapshot.docChanges)
          console.log('query result snapshot after the event', snapshot.docs)
          console.log('is init data', snapshot.type === 'init')
        },
        onError: function(err) {
          console.error('the watch closed because of error', err)
        }
      })
  }

  componentWillUnmount () {
    // watcher.close()
  }

  componentDidShow () { }

  componentDidHide () { }

  pay = async () => {
    console.log('pay')
    try {
      // let res = await Taro.cloud.callFunction({
      //     name: 'pay',
      //     data: {
      //       money: '1'
      //     }
      // })
      // console.log(res);
      // const { nonceStr, paySign, timeStamp, signType } = res.result.payParams
      // Taro.requestPayment({
      //   timeStamp,
      //   nonceStr,
      //   signType,
      //   package: res.result.payParams.package,
      //   paySign,
      //   success: (payRes) => {
      //     console.log(payRes)
      //   },
      //   fail: (err) => {
      //     console.log('支付失败', err)
      //   },
      //   complete: (data) => {
      //     console.log('支付结束',data)
      //   }
      // })
    } catch (error) {
      console.log(
        '支付失败', error
      )
    }
  }

  login = async (userInfo) => {
    try {
      await Taro.login();
      let user = await Taro.cloud.callFunction({
        name: 'login',
        data: {
          userInfo: userInfo.detail.userInfo
        }
      })
      // let res = await Taro.cloud.callFunction({
      //   name: 'login',
      //   data: {
      //     userInfo: userInfo.detail.userInfo
      //   }
      // })
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.pay} >
          Test Pay
        </Button>
        <Button 
          openType='getUserInfo'
          onGetUserInfo={this.login}
        >login</Button>
      </View>
    )
  }
}
