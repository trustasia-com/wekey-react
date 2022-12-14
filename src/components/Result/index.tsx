// Result 组件
import React from 'react';
import './index.css';
import successImg from '../../images/success.png';
import errorImg from '../../images/error.png';

interface ResultProps {
  status: string;
  title: string;
}
const Result = ({ status, title }: ResultProps) => {
  return (
    <div className='result_box'>
      <img className='icon' src={status == 'success' ? successImg : errorImg} alt="" />
      <h3 className='title'>{title}</h3>
    </div>
  )
}
export default Result;
