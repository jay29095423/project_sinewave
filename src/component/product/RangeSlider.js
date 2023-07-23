import React, { useState } from 'react'
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';

// section true = 二手賣場 false = 品牌賣場

const RangeSlider = props => {

     const [value, setValue] = useState([props.min, props.max]);
// console.log(value)
     const handleChange = (event, newValue) => {
          setValue(newValue);
          props.price_filter(newValue[0], newValue[1])
     }
     const left_value_change = (event) => {
          const updatedValue = [...value];
          updatedValue[0] = Number(event.target.value);
          setValue(updatedValue);

          props.price_filter(event.target.value, value[1])
     };
     const right_value_change = (event) => {

          const updatedValue = [...value];
          updatedValue[1] = Number(event.target.value);
          setValue(updatedValue);

          props.price_filter(value[0], event.target.value)
     };
     return (
          <div className='flex justify-center mt-5'>
               <input

                    step={1000}
                    min={props.min}
                    max={value[1]}
                    type='number'
                    value={value[0]}
                    onChange={left_value_change}
                    className='p-1 w-[17.5%] border rounded inline-block mr-[3%] text-sm' />
               <Box sx={{ width: '60%', display: 'inline-block', }}>
                    <Slider
                         getAriaLabel={() => 'Temperature range'}
                         value={value}
                         onChange={handleChange}
                         valueLabelDisplay="auto"
                         size="small"
                         step={1000}
                         min={props.min}
                         max={props.max}
                         sx={{
                              color: '#C70A0A',
                              '& .MuiSlider-thumb': {
                                   borderRadius: '1px',
                              },
                         }}
                    />
               </Box>
               <input
                    step={1000}
                    min={value[0]}
                    max={props.max}
                    type='number'
                    value={value[1]}
                    onChange={right_value_change}
                    className='p-1 w-[17.5%] border rounded inline-block ml-[3%] text-sm' />
          </div>
     )
}

export default RangeSlider