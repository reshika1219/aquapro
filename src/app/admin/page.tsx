'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import styles from './Admin.module.css';

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'orders' | 'products'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aquapro_admin_token');
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (view === 'orders') fetchOrders();
      if (view === 'products') fetchProducts();
    }
  }, [token, view]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('aquapro_admin_token', password);
      setToken(password);
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aquapro_admin_token');
    setToken(null);
    setOrders([]);
    setProducts([]);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setOrders(await res.json());
      else if (res.status === 401) handleLogout();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setProducts(await res.json());
      else if (res.status === 401) handleLogout();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
      }
    } catch (e) {
      alert('Failed to update order');
    }
  };

  if (!token) {
    return (
      <div className={styles.loginWrapper}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h2>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />
          <Button type="submit" fullWidth>Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${view === 'orders' ? styles.activeTab : ''}`}
          onClick={() => setView('orders')}
        >
          Orders
        </button>
        <button 
          className={`${styles.tab} ${view === 'products' ? styles.activeTab : ''}`}
          onClick={() => setView('products')}
        >
          Products
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading data...</div>
      ) : view === 'orders' ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign: 'center'}}>No orders found.</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <Badge variant={order.status === 'completed' ? 'in-stock' : order.status === 'cancelled' ? 'out-of-stock' : 'new'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={styles.select}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={5} style={{textAlign: 'center'}}>No products found.</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>
                      <Badge variant={product.availability}>
                        {product.availability}
                      </Badge>
                    </td>
                    <td>{product.type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
            <p style={{ color: 'var(--gray-500)', fontSize: 'var(--text-sm)' }}>Edit products directly in `src/data/products.json` or implement a full form here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
