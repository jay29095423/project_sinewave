import React from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const data = [
     { p_id: 2, p_name: '拜耳入耳式耳機', p_price: 7999, create_time: '2023-07-03 21:17:58 ', sell_time: '2023-07-08 11:17:58', shipping_method: '面交', delivery_charge: 0, buyer_id: 88 },
     { p_id: 7, p_name: 'Taylor 814ce 全單電木吉他 印度玫瑰木 九成新', p_price: 79000, create_time: '2023-07-03 21:17:58 ', sell_time: '2023-07-08 11:17:58', shipping_method: '面交', delivery_charge: 0, buyer_id: 8 },
     { p_id: 503, p_name: 'Gbison Les Paul StaR 虎皮楓木電吉他 正常使用痕跡', p_price: 49999, create_time: '2023-07-01 00:17:01 ', sell_time: '2023-07-3 11:11:18', shipping_method: '面交', delivery_charge: 0, buyer_id: 76 },
     { p_id: 12, p_name: 'Katana 音箱 60W ', p_price: 23999, create_time: '2023-06-09 13:17:58 ', sell_time: '2023-07-08 12:00:58', shipping_method: '宅配', delivery_charge: 60, buyer_id: 143 },

];
const Download_excel = props => {

     const generateExcelData = () => {
          // 處理資料轉換的邏輯，返回要轉換為 Excel 的資料陣列
          // 例如：將 data 轉換成符合 Excel 要求的格式
          return data.map(item => ({
               '商品編號(ID)': item.p_id,
               '商品名稱': item.p_name,
               '售價':item.p_price,
               '建立時間':item.create_time,
               '售出時間':item.sell_time,
               '運送方式':item.shipping_method,
               '運費':item.delivery_charge,
               '買家編號':item.buyer_id


          }));
     };

     const saveAsExcelFile = (excelFile, fileName) => {
          const dataBlob = new Blob([excelFile], { type: 'application/octet-stream' });
          saveAs(dataBlob, fileName);
     };
     const handleDownload = () => {
          const excelData = generateExcelData(); // 處理資料轉換的邏輯，返回要轉換為 Excel 的資料陣列
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(excelData);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
          const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

          saveAsExcelFile(excelFile, 'data.xlsx'); // 執行下載，'data.xlsx' 是下載的檔案名稱
     }
     return (

          <button className={props.className} onClick={handleDownload}>下載 Excel</button>


     )
}

export default Download_excel