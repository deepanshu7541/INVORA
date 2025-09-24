import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Inventory from './pages/Inventory/Inventory';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Logout from './pages/Logout';
import Success from './components/Success/Success';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/shop" element={<Inventory />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;