import React from 'react';
import Modal from 'react-modal';
import ProxyIframe from './ProxyIframe';

Modal.setAppElement('#root');
// const frame = document.getElementById('iframe');
// frame.contentWindow.postMessage('Your message', 'http://localhost:5000');

const getFormattedDate = () => {
  const nowTime = new Date();
  const year = nowTime.getFullYear();
  const month = (nowTime.getMonth() + 1).toString().padStart(2, '0');
  const day = nowTime.getDate().toString().padStart(2, '0');
  const hours = nowTime.getHours().toString().padStart(2, '0');
  const minutes = nowTime.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const CustomModal = ({ isOpen, onRequestClose, sessionVGroups, airQualityDatas, sessionName }) => {
  if(airQualityDatas==null) return ;
  const airQualityStandard = {'CO':9,'NO2':0.03,'O3':0.06,'PM10':50,'PM25':15,"SO2":0.02}
  var overList=[]
  if(airQualityDatas!=null){
  for (const [key, value] of Object.entries(airQualityDatas)) {
    if(airQualityStandard[key]<=value){
      overList.push(key)
    }
  }
  var memo = (
    <div style={{}}>
      <h3 style={{ color: "white"}}>안녕하세요!🖐 <span style={{ color: "green"}}>{sessionName}</span>님,</h3>
      {overList != null ? (
        <h4 style={{ color: "white"}}>{getFormattedDate().toLocaleString()} 기준 {airQualityDatas.MSRSTE_NM}은 <span style={{ color: "tomato"}}>{overList.join(', ')}의 농도가 기준치 이상</span>으로 검출되었습니다.</h4>
      ) : (
        <h4 style={{ color: "white"}}>{getFormattedDate().toLocaleString()} 기준 {airQualityDatas.MSRSTE_NM}은 대기환경이 청정한 상태입니다.</h4>
      )}
      {sessionVGroups != null && <h4 style={{ color: "white"}}><div>추가로 <span style={{ color: "green"}}>{sessionName}</span>님은 취약계층 중 <span style={{ color: "aqua"}}>{sessionVGroups}</span>에 속하시므로</div> 다른 분들에 비해 <span style={{ color: "aqua"}}>환경물질에 취약한 상태</span>이심을 전합니다.</h4>}
      
    </div>
  );
}

  const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '50%',
      height: '50%',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background: 'rgba(12, 12, 12, 0.9)',
      overflow: 'auto',
      borderRadius: "20px"
    },
  };  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      style={customModalStyles}
    >
      <div style={{ textAlign: 'center' }}>
        {/* <div style={{ overflow: 'hidden' }}>
          <ProxyIframe/>
        </div> */}
        <iframe src='http://localhost:5173/' width={"100%"} height={"300px"} scrolling='no'></iframe>
        {memo}
      </div>
    </Modal>
  );
};

export default CustomModal;
