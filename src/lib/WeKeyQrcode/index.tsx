// WeKey 扫码
import React, { useEffect, useState } from 'react';
import QRcode from 'qrcode';
import Spin from '../../components/Spin';
import Result from '../../components/Result';
import message from '../../components/Message'
import './index.css';
import reloadImg from '../../images/reload.png';
import successImg from '../../images/success.png';

let timer: any;
type WeKeyQrcodeProps = {
  // 生成二维码图片到接口地址
  getImgApi: string;
  // 获取二维码图片接口的入参
  ewmParams?: any;
  // 获取扫码结果的接口地址
  getQrcodeResultApi: string;
  // 扫码成功回调函数
  successCallback?: any;
  // 提示信息
  tip?: string;
  // 是否展示成功/失败结果内容
  showResult: boolean;
  // 轮询时间
  timeDelay?: number;
};
const WeKeyQrcode = ({
  ewmParams,
  successCallback,
  getImgApi,
  getQrcodeResultApi,
  tip,
  showResult = false,
  timeDelay = 3,
}: WeKeyQrcodeProps) => {
  const [imgLoading, setImgLoading] = useState(false);
  // 二维码数据
  const [qrImgData, setQrImgData] = useState<any>(null);
  // 二维码是否超时
  const [isOut, setIsOut] = useState(false);
  // 扫码结果
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    getQRcodeFn();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 获取扫码登录的二维码
  const getQRcodeFn = async () => {
    setImgLoading(true);
    fetch(`${getImgApi}`, {
      method: 'POST',
      body: JSON.stringify({ ...ewmParams }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setImgLoading(false);
        if (res?.code == 0) {
          QRcode.toDataURL(res?.data?.url, {
            type: 'image/png', //类型
            quality: 0.5, //图片质量A Number between 0 and 1
            width: 160, //高度
            height: 160, //宽度
            errorCorrectionLevel: 'L', //容错率
            margin: 1, //外边距
            color: {
              dark: '#000000', //前景色
              light: '#ffffff', //背景色
            },
          })
            .then((imgData: any) => {
              getqrResult(res?.data);
              setQrImgData({
                ...(res?.data || {}),
                imgUrl: imgData,
              });
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          message.error(res?.error);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(
          err?.response?.data?.error || '服务器内部错误，请联系管理员'
        );
        setImgLoading(false);
      });
  };

  // 获取二维码扫码结果
  const getqrResult = async (data: any) => {
    clearTimeout(timer);
    fetch(`${getQrcodeResultApi}?msg_id=${data?.msg_id || data?.url.substr(data.url.indexOf('#') + 1)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res?.code == 0) {
          setResultData(res?.data);
          if (
            res?.data.status === 'init' ||
            res?.data?.status === 'bind'
          ) {
            setIsOut(false);
            timer = setTimeout(() => {
              if (data?.expired_at * 1000 - new Date().getTime() < 0) {
                setIsOut(true);
                clearTimeout(timer);
                return;
              }
              getqrResult(data);
            }, (timeDelay ? (timeDelay < 1 ? 1 : timeDelay) : 3) * 1000);
          }
          if (res?.data?.status == 'success') {
            clearTimeout(timer);
            if (successCallback) successCallback(res?.data);
          }
          if (!showResult && res?.data?.status == 'refuse') {
            // message.error(res?.data?.error_msg || '用户已拒绝失败');
            clearTimeout(timer);
            reloadEwm();
          }
          if (
            res?.data?.status == 'fail' ||
            res?.data?.status == 'timeout'
          ) {
            setIsOut(true);
            message.error(res?.data?.error_msg || '认证失败');
            clearTimeout(timer);
          }
        } else {
          clearTimeout(timer);
          message.error(res?.error);
        }
      })
      .catch((err: any) => {
        console.log(err);
        message.error(
          err.response?.data?.error || '服务器内部错误，请联系管理员'
        );
        clearTimeout(timer);
      });
  };

  // 刷新二维码
  const reloadEwm = () => {
    setResultData(null);
    getQRcodeFn();
  };

  return (
    <div className='wekey_qrcode_box'>
      {(resultData &&
        (resultData.status == 'success' || resultData.status == 'fail' || resultData.status == 'refuse')) &&
        showResult ? (
        <Result
          status={resultData?.status === 'success' ? 'success' : 'error'}
          title={resultData?.status === 'success' ? '添加成功' : (resultData?.status === 'fail' ? '添加失败' : '用户已拒绝')}
        />
      ) :
        <>
          {tip && <p className="tip">{tip}</p>}
          <div className="ewm_box">
            {isOut && (
              <div className="mask_box" onClick={() => reloadEwm()}>
                {
                  !imgLoading ?
                    <>
                      <img className='icon' src={reloadImg} alt="点击刷新" />
                      <p>超时，点击刷新</p>
                    </> :
                    <Spin spinning={imgLoading} tip="加载中...">
                    </Spin>
                }
              </div>
            )}
            {qrImgData && (
              <img src={qrImgData?.imgUrl} alt="" width={160} height={160} />
            )}
          </div>
          <p className="desc_tip">
            {resultData?.wekey_nickname ? (
              <>
                <img className='icon' src={successImg} alt="点击刷新" />
                <span>{resultData.wekey_nickname + '已扫码'}</span>
              </>
            ) : (
              '使用WeKey扫码认证'
            )}
          </p>
        </>
      }
    </div>
  );
};
export default WeKeyQrcode;
