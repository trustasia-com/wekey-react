// Result 组件
import React from 'react';
import './index.css';

interface ResultProps {
  status: string;
  title: string;
}
const Result = ({ status, title }: ResultProps) => {
  return (
    <div className='result_box'>
      <img className='icon' src={status == 'success' ? require('../../images/success.png') : require('../../images/error.png')} alt="" />
      <h3 className='title'>{title}</h3>
    </div>
  )
}
export default Result;
