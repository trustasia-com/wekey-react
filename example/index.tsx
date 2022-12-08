// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WeKeyQrcode } from '../src/index';

const App = () => {
  return (
    <WeKeyQrcode
      getImgApi="/ta-demo/wekey/login/qrcode"
      ewmParams={{ email: '401240139@qq.com' }}
      getQrcodeResultApi="/ta-demo/wekey/login/result"
      successCallback={() => {
        alert('扫码成功！！！！！');
      }}
      showResult={false}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
