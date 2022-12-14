# WeKey扫码组件使用说明

``` install
npm i @trustasia/wekey-qr-react 或

yarn add @trustasia/wekey-qr-react 
```

## 使用示例

```demo
import WeKeyQrcode from '@trustasia/wekey-qr-react';
// css 文件中引入
@import '@trustasia/wekey-qr-react/dist/wekey-qr-react.cjs.development.css';

<WeKeyQrcode
  getImgApi='/ta-demo/wekey/register/qrcode'
  ewmParams={{
    name: form.getFieldValue('name')
  }}
  tip='用WeKey APP扫描二维码，将您的手机设置为认证器。'
  getQrcodeResultApi='/ta-demo/wekey/register/result'
  successCallback={() => {
    message.success('扫码成功！！！！！')
  }}
  showResult={true}
/>
```

## 参数说明

|  参数   | 类型  | 描述  |
|  ----  | ----  | ----  |
| getImgApi  | string | 生成二维码图片到接口地址  |
| ewmParams  | ?any | 获取二维码图片接口的入参  |
| getQrcodeResultApi  | string | 获取扫码结果的接口地址  |
| successCallback  | ?any | 扫码成功回调函数  |
| tip  | ?string | 二维码头部提示信息  |
| showResult  | boolean | 是否展示成功/失败结果内容  |
| timeDelay  | ?number | 轮询时间，默认为3s，当值小于1s时，算1s  |
