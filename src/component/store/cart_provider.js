import { useReducer } from "react";
import cart_context from "./cart_context";

const defaultCartState = {
     items: [],
     totalAmount: 0
}

const cart_reducer = (state, action) => {

     let updatedItemList = [...state.items];;
     let updateTotalAmount;

     if (action.type === "ADD_CART_ITEM") {

          updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;

          const existingCartItemIndex =
               state.items.findIndex(
                    item => item.id === action.item.id && item.option === action.item.option
               );
          const existingCartItem = state.items[existingCartItemIndex];


          if (existingCartItem) {

               if (action.item.status) {
                    
                    updateTotalAmount=state.totalAmount

               }
               else {

                    const updatedItem = {
                         ...existingCartItem,
                         amount: +existingCartItem.amount + +action.item.amount
                    }

                    updatedItemList[existingCartItemIndex] = updatedItem;

               }


          } else {

               updatedItemList = state.items.concat(action.item)
          }

     } else if (action.type === 'REDUCE_CART_ITEM') {

          const existingCartItemIndex =
               state.items.findIndex(
                    item => item.id === action.item.id && item.option === action.item.option
               );

          const existingCartItem = state.items[existingCartItemIndex];

          updateTotalAmount = state.totalAmount

          if (+existingCartItem.amount === 1) {

               updatedItemList = [...state.items]

          } else if (existingCartItem.amount > 1) {

               updateTotalAmount = state.totalAmount - existingCartItem.price;

               const updatedItem = { ...existingCartItem, amount: +existingCartItem.amount - 1 }

               updatedItemList = [...state.items];

               updatedItemList[existingCartItemIndex] = updatedItem;
          };

     } else {
          // console.log(action.item)

          updateTotalAmount = state.totalAmount - (+action.item.price * +action.item.amount)

          const existingCartItemIndex =
               state.items.findIndex(
                    item => item.id === action.item.id && item.option === action.item.option
               );

          updatedItemList = [...state.items];

          updatedItemList.splice(existingCartItemIndex, 1);


     }

     return ({
          items: updatedItemList,
          totalAmount: updateTotalAmount
     })


}

const CartProvider = props => {

     const [cartState, dispatchCartAction] = useReducer(cart_reducer, defaultCartState);

     const addToCart = item => {

          dispatchCartAction({ type: 'ADD_CART_ITEM', item: item })

     };

     const reduceFromCart = item => {

          dispatchCartAction({ type: 'REDUCE_CART_ITEM', item: item })

     };

     const deleteFromCart = item => {
          dispatchCartAction({ type: 'DELETE_CART_ITEM', item: item })
     }

     const myCart = {
          items: cartState.items,
          totalAmount: cartState.totalAmount,
          addItem: addToCart,
          reduceItem: reduceFromCart,
          deleteItem: deleteFromCart,
     };



     // console.log('----myCart.items---------------')
     // console.log(myCart.items)
     // console.log('-------------------')
     return (
          <cart_context.Provider value={myCart}>
               {props.children}
          </cart_context.Provider>
     )
}

export default CartProvider;