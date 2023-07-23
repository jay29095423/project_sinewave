import React, { useRef, useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/input';
import axios from 'axios';
import Member_data_password_change from './member_data_password_change';


const Member_data = props => {
     const [show_password_change_window, set_show_password_change_window] = useState(false)

     const toggle_password_change_window = () => {
          set_show_password_change_window(x => !x)
     }

     const [changing, setChanging] = useState(false);

     const data_change = () => {
          setChanging(x => !x)
     }

     const name_ref = useRef(null);
     const nickname_ref = useRef(null);
     const birthday_ref = useRef(null);
     const gender_ref = useRef(null);
     const email_ref = useRef(null);
     const phone_ref = useRef(null);
     const address_ref = useRef(null);

     const get_name = () => {
          if (name_ref.current) {
               const updated_name = name_ref.current.getState();
               return updated_name
          }
     }
     const get_nickname = () => {
          if (name_ref.current) {
               const updated_nickname = nickname_ref.current.getState();
               return updated_nickname;
          }
     };

     const get_birthday = () => {
          if (name_ref.current) {
               const updated_birthday = birthday_ref.current.getState();
               return updated_birthday;
          }
     };

     const get_gender = () => {
          if (name_ref.current) {
               const updated_gender = gender_ref.current.getState();
               return updated_gender;
          }
     }

     const get_email = () => {
          if (name_ref.current) {
               const updated_email = email_ref.current.getState();
               return updated_email;
          }
     };

     const get_phone = () => {
          if (name_ref.current) {
               const updated_phone = phone_ref.current.getState();

               return updated_phone;
          }
     };
     const get_address = () => {
          if (name_ref.current) {
               const updated_address = address_ref.current.getState();

               return updated_address;
          }
     }
     const [updated_pic, set_updated_pic] = useState(null);

     const pic_updated_handler = event => {
          set_updated_pic(event.target.files[0])
     }

     const user_data_submit = async event => {
          event.preventDefault();
          if (!changing) {

               let user_data_updated = {
                    name: get_name(),
                    nick_name: get_nickname(),
                    date_of_birth: get_birthday(),
                    gender: get_gender(),
                    email: get_email(),
                    phone: get_phone(),
                    address: get_address(),
                    id: props.user_data.id,
                    photo_path: props.user_data.photo_path
               };

               let data_to_server = new FormData();
               data_to_server.append('pic', updated_pic);

               for (const key in user_data_updated) {
                    data_to_server.append(key, user_data_updated[key])
               }


               let results = await axios.put('http://localhost:5500/user_data_updated',
                    data_to_server,
                    {
                         headers: {
                              'Content-Type': 'multipart/form-data'
                         }
                    })

               if (results.data.affectedRows === 1) {
                    alert('更新完成');

                    props.get_user_data();
               }
          }

     };
     // console.log(new Date(user_data.date_of_birth).toISOString().split('T')[0])
     const date_function = date => {
          let C_date = new Date(date)

          return C_date.toLocaleString();
     };
    
     const render_password_change = () => {
          if (+props.user_data.google_regi === 1) {
               return
          } else {

               return <Button type='button' onClick={toggle_password_change_window}>變更密碼</Button>
          }
     };




     return (
          <>
              {show_password_change_window? <Member_data_password_change cancel={toggle_password_change_window} id={props.user_data.id} />:''}
               <form encType="multipart/form-data" onSubmit={
                    user_data_submit
                    // test_submit
               } className='w-full flex flex-col border px-2' >
                    <h4 className='text-3xl relative w-full text-red-600 p-2 font-bold '>
                         會員基本資料
                         <Button onClick={data_change}
                              className={`
                         ${!changing ? 'bg-white' : 'bg-red-600'}
                                   absolute 
                                   right-2 
                                   rounded-sm 
                                   m-2 
                                   text-sm
                                   border-2 
                                   duration-150
                                 text-red-700 
                                   group
                      
                      `}>
                              <span className={`
                         group-hover:bg-red-700 
                         group-hover:text-white 
                         duration-150
                          w-full 
                          h-full
                          ${!changing ? 'bg-white text-red-700' : 'bg-red-600 text-white'}
                           `}>{changing ? '儲存' : '變更資料'}</span></Button>
                    </h4>
                    <hr />
                    <div className={`${changing ? 'border-red-600 border-2' : ''} pt-9 w-full flex `}>


                         <div className='w-1/4 flex flex-col items-center justify-center'>
                              <img src={props.user_data.photo_path} className={`${changing ? ' aspect-square w-[45%]' : 'aspect-square w-[50%]'} m-[12.5%] rounded-full object-cover `} />
                              {changing ?
                                   <div className='w-full p-2 hover:shadow-xl'>
                                        <label className=' text-2xl text-red-900 font-normal' htmlFor='pic'>請上傳圖片</label>
                                        <br />
                                        <input
                                             className={`mt-2 w-full ${changing ? 'border-2 rounded' : ''}`}
                                             id='pic'
                                             type='file'
                                             disabled={changing ? false : true}
                                             name='pic'
                                             onChange={pic_updated_handler}
                                        />
                                   </div>
                                   : ''}
                         </div>
                         <div className=' w-1/4'>
                              <Input
                                   value={props.user_data.name}
                                   enable={changing}
                                   label='姓名'
                                   input={{
                                        type: 'input',
                                        id: 'name'
                                   }}
                                   ref={name_ref} />
                              <Input
                                   value={props.user_data.nick_name}
                                   enable={changing}
                                   label='暱稱'
                                   input={{
                                        type: 'input',
                                        id: 'nickname'
                                   }}
                                   ref={nickname_ref}
                              />
                              <Input
                                   value={new Date(props.user_data.date_of_birth).toISOString().split('T')[0]} //轉換日期格式
                                   enable={changing}
                                   label='生日'
                                   input={{
                                        type: 'date',
                                        id: 'birthday'
                                   }}
                                   ref={birthday_ref}
                              />
                              <Input
                                   value={props.user_data.gender}
                                   enable={changing}
                                   label='性別'
                                   input={{
                                        type: 'input',
                                        id: 'gender'
                                   }}
                                   ref={gender_ref}
                              />
                         </div>

                         <div className=' w-1/4'>
                              <Input
                                   value={props.user_data.email}
                                   enable={changing}
                                   label='電子郵件'
                                   input={{
                                        type: 'email',
                                        id: 'email'
                                   }}
                                   ref={email_ref}
                              />
                              <Input
                                   value={props.user_data.phone}
                                   enable={changing}
                                   label='電話'
                                   input={{
                                        type: 'input',
                                        id: 'phone'

                                   }}
                                   ref={phone_ref}
                              />
                              <Input
                                   value={props.user_data.address}
                                   enable={changing}
                                   label='地址'
                                   input={{
                                        type: 'input',
                                        id: 'address'
                                   }}
                                   ref={address_ref}
                              />

                         </div>
                         <div className=' w-1/4 hover:shadow-xl h-full'>
                              <h2 className='p-2 bg-red-400 text-2xl text-white font-normal'>密碼專區</h2>
                              {props.user_data.google_regi ? '' : <div className='p-2'>
                                   <h3 className='my-2'>上次變更時間 :</h3>
                                   <span>{date_function(props.user_data.last_password_change)}</span>
                              </div>}
                              <div className='p-2'>
                                   <h3 className='my-2'>上次登入時間 :</h3>
                                   <span>{date_function(props.user_data.last_login)}</span>
                              </div>
                              <div className='p-2'>
                                   <h3 className='my-2'>帳號建立時間 :</h3>
                                   <span>{
                                        date_function(props.user_data.registration_date)
                                   }</span>

                              </div>
                              <div className='flex items-center justify-center mb-2'>
                                   {render_password_change()}

                              </div>

                         </div>





                    </div>

               </form>
          </>

     )
}

export default Member_data