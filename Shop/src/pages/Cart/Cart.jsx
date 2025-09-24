import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState({
    nurseName: '',
    nurseId: '',
    department: '',
    hospital: ''
  });
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to a backend
    console.log('Order placed:', { items: cartItems, details: orderDetails });
    setOrderDetails({
      nurseName: '',
      nurseId: '',
      department: '',
      hospital: ''
    });
    setShowForm(false);
    navigate('/success');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some items to your cart to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      {!showForm ? (
        <>
          <h1>Shopping Cart</h1>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FaPlus />
                  </button>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button 
              className="proceed-button"
              onClick={() => setShowForm(true)}
            >
              Proceed to Order
            </button>
          </div>
        </>
      ) : (
        <div className="order-container">
          <h2>Complete Your Order</h2>
          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Order Details</h3>
              <p>Please fill in your information to complete the order</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Hospital Name</label>
                <input
                  type="text"
                  value={orderDetails.hospital}
                  onChange={(e) => setOrderDetails({...orderDetails, hospital: e.target.value})}
                  required
                  placeholder="Enter hospital name"
                />
              </div>

              <div className="form-group">
                <label>Nurse Name</label>
                <input
                  type="text"
                  value={orderDetails.nurseName}
                  onChange={(e) => setOrderDetails({...orderDetails, nurseName: e.target.value})}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Nurse ID</label>
                <input
                  type="text"
                  value={orderDetails.nurseId}
                  onChange={(e) => setOrderDetails({...orderDetails, nurseId: e.target.value})}
                  required
                  placeholder="Enter your ID"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={orderDetails.department}
                  onChange={(e) => setOrderDetails({...orderDetails, department: e.target.value})}
                  required
                  placeholder="Enter department name"
                />
              </div>
            </div>

            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name}</span>
                    <span>×{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" onClick={() => setShowForm(false)}>
                Back to Cart
              </button>
              <button type="submit">
                Place Order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;