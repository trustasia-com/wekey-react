// Message 组件
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './messageComponent';

class Msg {
  refs: any;

  constructor() {
    if (typeof window !== 'undefined') {
      let myRef = { current: '' };
      const div = document.createElement('div')
      ReactDOM.render(<Message ref={myRef} />, div)
      document.body.append(div);
      this.refs = myRef;
    }
  }
  error(msg: string) {
    this.refs.current.create({
      type: 'error',
      content: msg
    })
  }
}

const getMsgInstance = (function () {
  let instance: any;
  return function () {
    if (!instance) {
      instance = new Msg()
    }
    return instance
  }
})();

const newMsg = getMsgInstance();
export default newMsg;