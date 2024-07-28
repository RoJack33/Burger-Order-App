import {currencyFormatter} from '../util/formatting.js';

export default function CartItem ({name, quantity, price, onIncease, onDecrease}){
  return(
    <li className="cart-item">
      <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <button>{quantity}</button>
        <button onClick={onIncease}>+</button>
      </p>
    </li>
  )
}