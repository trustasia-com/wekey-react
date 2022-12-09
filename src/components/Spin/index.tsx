// Spin 组件
import React from 'react';
import './index.css';

const Spin = (props: any) => {
  return (
    <div className='spin_box'>
      {props.children}
      {
        props.spinning &&
        <div className='spin_mask_box'>
          <img className='loading_icon' src={require('../../images/loading.png')} alt={props.tip} />
          <p className='loading_tip'>{props.tip}</p>
        </div>
      }
    </div>
  )
}
export { Spin };
