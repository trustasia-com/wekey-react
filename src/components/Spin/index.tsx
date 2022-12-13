// Spin 组件
import React from 'react';
import './index.css';

interface SpinProps {
  children?: any;
  spinning: boolean;
  tip?: string;
}
const Spin = (props: SpinProps) => {
  return (
    <div className='spin_box'>
      {props.children}
      {
        props.spinning &&
        <div className='spin_mask_box'>
          <img className='loading_icon' src={require('../../lib/images/loading.png')} alt={props.tip} />
          {props.tip && <p className='loading_tip'>{props.tip}</p>}
        </div>
      }
    </div>
  )
}
export default Spin;
