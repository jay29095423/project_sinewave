import React from 'react'
import ReactDOM from 'react-dom';
import Button from './Button';

const Backdrop = props => {
     return (
          <div className=' w-screen h-[100vh] fixed z-20 bg-black bg-opacity-75' onClick={props.comfirm}></div>
     )
}

const Message = props => {
     return (


          <div className={`${props.className} z-30 fixed w-[50%] left-[25%] top-[20vh]  `}>
               
               {props.children}

          </div>
     )
};

const rootElement = document.getElementById('overlay-root');

const MessageBox = props => {


     return (
          <>
               {ReactDOM.createPortal((<Backdrop comfirm={props.comfirm} ></Backdrop>), rootElement)}
               {ReactDOM.createPortal(
                    <Message className={props.className} >
                         <h1 className='w-full bg-red-600 text-white text-2xl p-1 font-semibold '>系統訊息</h1>
                         <div className='w-full p-10 text-xl font-bold'>{props.children}</div>
                         <Button onClick={props.comfirm} className=' bottom-5 right-5 absolute'>確定</Button>
                    </Message>, rootElement)}
          </>
     )
}

export default MessageBox