import React from 'react'
import MainPic from '../media/sineWave.png'
import Carousel from './carousel';
import axios from 'axios';
import Headphone from '../media/headphone.jpg';
import Headphone2 from '../media/headphone2.jpg';
import band from '../media/band.jpg';
import monkey from '../media/monkey.jpg';
import album from '../media/album.jpg'
import Products_preview from './Products_preview';
import { useState } from 'react';
import { useMemo } from 'react';


const Main = () => {

     const news_data = [
          {
               id: 1,
               type: '最新消息',
               title: 'Sine Wave創辦人驚爆是人類?!',
               context: 'Sine Wave音樂平台的創辦人驚人地揭曉自己實際上是一位男性，這引起了許多討論和關注。這個消息打破了對平台的刻板印象，引發了對性別平等的更深思考。這位創辦人的勇氣和坦誠值得讚賞，他的行動將促使我們更加關注才華和貢獻，而不僅僅是性別。'
               , pic: monkey,
          },
          {
               id: 2,
               type: '產品評測',
               title: 'SineWave最新監聽耳機HR-4到底有沒有跟宣傳的一樣好?',
               context: 'Sine HR-4 在舒適性方面做出了令人印象深刻的努力。它採用輕量化設計和柔軟的耳罩材質，使得佩戴起來非常舒適，即使長時間使用也不會感到不適。耳罩的設計也考慮到了通風性，以確保長時間使用時的透氣性和舒適度。此外，可調節式的頭帶設計讓您能夠根據個人需求進行調整，以獲得更好的貼合感。'
               , pic: Headphone2
          },
          {
               id: 3,
               type: '樂團專訪',
               title: '新世代獨立樂團"番茄蛋"',
               context: '番茄蛋是一支新興的獨立樂團，以其獨特的音樂風格吸引了眾多樂迷。他們將搖滾、流行和實驗音樂融合在一起，創造出令人耳目一新的聲音。番茄蛋的音樂充滿了能量和情感，他們的舞台表演充滿了活力和激情。這個年輕的樂團帶著創新的精神和對音樂的熱愛，將為音樂界帶來新的可能性和驚喜。'
               , pic: band
          },
          {
               id: 4,
               type: '新曲放送',
               title: 'DemonDice Hazyskyscraper',
               context: '「BlurBuilding」是一首令人驚艷的新曲。它融合了多種音樂風格，帶來了獨特的聽覺體驗。這首歌曲節奏強烈，旋律引人入勝。它展示了音樂創作的多樣性和創新性。「BlurBuilding」的發布將為音樂界注入新的活力，為聽眾帶來無盡的聽覺享受。'
               , pic: album
          },
          {
               id: 5,
               type: '新品上市',
               title: '新世代Sine HR-4 監聽耳機 給您不一樣的聽覺享受',
               context: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺'
               , pic: Headphone
          },
          {
               id: 6,
               type: '新品上市',
               title: '新世代Sine HR-4 監聽耳機 給您不一樣的聽覺享受',
               context: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺'
               , pic: Headphone
          },

     ];

     const [products, set_products] = useState([

          {
               id: 1,

               images: [Headphone],
               name: 'Sine HR-4 監聽耳機',
               intro: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: '0',
               options: ['black', 'white', 'red']
          },

     ])

     const [sec_products, set_sec_products] = useState([
          {
               id: 1,

               images: [Headphone],
               name: 'Sine HR-4 監聽耳機',
               intro: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: '九成新',
          },

     ])

     useMemo(() => {
          (async () => {

               let results=await axios.get('http://localhost:5500/products');

               // console.log(results)
               set_products(results.data.brand_new);
               set_sec_products(results.data.sec_product)

          })()
     },[])

     return (
          <>

               <div className='flex flex-col'>
                    <div className=' h-2/5 flex relative w-full mt-36 border-b border-gray-300 pb-20'>
                         <img src={MainPic} alt='mainPic'
                              className={`align-middle  justify-center w-3/4 mx-auto pt-10`} />
                         <div className={`h-full w-full flex absolute group hover:bg-black hover:bg-opacity-50 ease-in duration-500`}>
                              <p className=' h-1/6 font-bold text-2xl w-3/4  mx-auto relative top-48 text-transparent group-hover:text-white ease-out duration-500' >
                                   SineWave 是一個專為音樂人打造的綜合音樂設備交易平台。我們主要專注於提供安全、便利和快速的音樂設備買賣服務。

                                   在 SineWave 上，您可以輕鬆找到各種音樂設備，包括耳機、音響、樂器等，並進行買賣交易。我們致力於建立一個安全可靠的交易環境，確保您的交易過程安心無慮。

                                   此外，我們還提供音樂設備維修服務，如果您的音樂設備需要維修或保養，我們合作的專業維修專家將確保您的設備得到及時維修和周全照顧。
                                   SineWave 是一個全面的音樂交易平台，無論您是音樂愛好者、學生、專業音樂人或音樂設備愛好者，我們都致力於為您提供安全、便利和豐富的服務。加入 SineWave，體驗音樂交易的新潮流！
                              </p>
                         </div>

                    </div>
                    <h1 className='w-full text-center text-3xl font-extrabold text-red-600 my-12' >最新消息</h1>
                    <Carousel news_data={news_data} />
               </div>


               <Products_preview news_data={news_data} product_data={products} sec_products={sec_products} />



          </>
     )
}

export default Main