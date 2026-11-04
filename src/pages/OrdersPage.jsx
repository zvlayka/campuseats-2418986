import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">No orders yet. <Link to="/">Browse vendors</Link>.</p>
  }

  return (
    <section>
      <h2>My orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card">
          <p><strong>{order.name}</strong> · Mahallah {order.mahallah} · pickup {order.pickupTime}</p>
          <ul>
            {order.lines.map((line) => (
              <li key={line.item.id}>{line.qty} × {line.item.name}</li>
            ))}
          </ul>
          <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </section>
  )
}

export default OrdersPage