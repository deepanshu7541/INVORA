import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Inventory.css';

const initialInventory = [
  { 
    id: 1, 
    name: 'Surgical Scissors', 
    category: 'Basic Tools',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format'
  },
  { 
    id: 2, 
    name: 'Forceps', 
    category: 'Basic Tools',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&auto=format'
  },
  { 
    id: 3, 
    name: 'Scalpel', 
    category: 'Cutting Tools',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format'
  },
  { 
    id: 4, 
    name: 'Retractor', 
    category: 'Surgical Tools',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&auto=format'
  },
  { 
    id: 5, 
    name: 'Surgical Clamps', 
    category: 'Basic Tools',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format'
  },
];

function Inventory() {
  const [inventory] = useState(initialInventory);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');
  const { addToCart } = useCart();

  const filteredInventory = categoryFilter
    ? inventory.filter(item => item.category === categoryFilter)
    : inventory;

  return (
    <div className="inventory">
      <h1>{categoryFilter || 'All Instruments'}</h1>

      <div className="inventory-grid">
        {filteredInventory.map(item => (
          <div key={item.id} className="inventory-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;