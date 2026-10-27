import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const product = prevState.cartList.find(item => item.id === id)

      if (product.quantity === 1) {
        return {
          cartList: prevState.cartList.filter(item => item.id !== id),
        }
      }

      return {
        cartList: prevState.cartList.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        ),
      }
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedList = cartList.filter(item => item.id !== id)

    this.setState({cartList: updatedList})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductExist = cartList.find(item => item.id === product.id)

    if (isProductExist) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
