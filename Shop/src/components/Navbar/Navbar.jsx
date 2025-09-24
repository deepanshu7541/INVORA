import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
          <button 
            className="search-icon"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search instruments..."
            className={`search-input ${isSearchExpanded ? 'show' : ''}`}
          />
        </div>
      </div>
      <div className="navbar-right">
        <button className="cart-button" onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;