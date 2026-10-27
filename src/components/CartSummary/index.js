import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const grandTotal = cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )

      const cartLength = cartList.length

      return (
        <div className="cart-summary-container">
          <h1 className="total-cost">
            Order Total: <span>Rs {grandTotal}</span>
          </h1>
          <p className="cart-length">{cartLength} items in cart</p>
          <button type="button" className="checkout-btn">
            checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
