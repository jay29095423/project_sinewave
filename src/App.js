
import Product_detial from "./component/product/product_detial";
import Footer from "./component/footer/footer";
import Header from "./component/header/header";
import Main from "./component/main/main";

import Member from "./component/member/member";
import Product from "./component/product/Product";
import CartProvider from "./component/store/cart_provider";
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>

        <CartProvider>
          <Header />
          <Routes>

            <Route path="" element={<Main />} />
            <Route path="/member" element={<Member />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product_detail" element={<Product_detial />} />
           

          </Routes>

          {/* <Footer /> */}
        </CartProvider>


      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
