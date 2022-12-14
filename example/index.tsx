// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WeKeyQrcode from '../src/index';

const App = () => {
  return (
    <div>
      <WeKeyQrcode
        getImgApi="/weet/api/wekey/qrcode"
        timeDelay={3}
        ewmParams={{
          user_name: 'rikki.cao',
        }}
        getQrcodeResultApi="/weet/api/wekey/is-login"
        successCallback={() => {
          alert('success')
        }}
        showResult={false}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
