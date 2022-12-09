import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './messageComponent.css';

const MessageComponent = (_: any, ref: any) => {
  //将以下方法暴露给父组件
  useImperativeHandle(ref, () => ({
    create,
  }));

  const [id, setId] = useState(0);
  const [messageArr, setMessageArr] = useState<any>([]);

  // 创建一个message
  const create = (options: any) => {
    let num = id;
    let msgs = [];
    let layer = {
      id: num++,
      ...options
    };
    layer.timer = setTimeout(() => {
      destory(layer)
    }, 2000);
    msgs.push(layer)
    setId(num);
    setMessageArr(msgs)
  }

  // 销毁一个message
  const destory = (layer: any) => {
    clearTimeout(layer.timer)
    let msgs = messageArr.filter((item: any) => item.id !== layer.id)
    setMessageArr(msgs)
  };

  return (
    messageArr.map((item: any) =>
      <div
        className={`message_box ${item.type}`}
        key={item.id}
      >
        {
          item.type == 'success' ?
            <img className='icon' src={require('../../images/success.png')} alt="" /> :
            <img className='icon' src={require('../../images/error.png')} alt="" />
        }
        <span>{item.content}</span>
      </div>
    )
  )
}

export default forwardRef(MessageComponent);