import React, { useEffect, useState } from 'react'
// import { useState } from 'react'

const Product_checkbox = props => {
     const [is_checked, set_is_checked] = useState(true);

     const checked_handler = event => {

          set_is_checked(event.target.checked);
     }

     useEffect(() => {

          const update_data = async () => {
               // console.log(props.type_update?'type_update有':'type_update無');
               // console.log(props.type_delete?"type_delete有":"type_delete無");
               // console.log(props.status_update?"status_update有":'status_update無');
               // console.log(props.status_delete?'status_delete有':'status_delete無');
               if (is_checked) {
                    if (props.type_update) {
                       
                         props.type_update(props.input.label);


                    } else if (props.status_update) {
                         props.status_update(props.input.label);

                    }
               } else {

                    if (props.type_delete) {
                         props.type_delete(props.input.label)
                    } else if (props.status_delete) {
                         props.status_delete(props.input.label)
                    }

               }
               props.price_filter(props.min, props.max);
          };

          update_data()


     }, [is_checked]);

     return (
          <div className='m-[1px] hover:border '>
               <input  {...props.input}
                    onChange={checked_handler}
                    checked={is_checked}
               />
               <label className='ml-2' htmlFor={props.input.id}>{props.input.label}</label>
          </div>
     )
}

export default Product_checkbox