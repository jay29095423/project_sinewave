import React from "react";

const cart_context = React.createContext({

     items: [],
     totalAmount: 0,
     addItem: (item) => { },
     reduceItem: (item) => { },
     deleteItem: (item) => { }


})

export default cart_context;