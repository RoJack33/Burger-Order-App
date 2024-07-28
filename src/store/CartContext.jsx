import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: ()=> {}
});

function cartReducer(state, action){
  if (action.type === "ADD_ITEM"){
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id)
    
    const updatedItems = [...state.items]

    //findIndex method will return -1 if there didnt find an item
    if(existingCartItemIndex > -1){
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity +1 
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.payload, quantity: 1})
    }

    if(action.type === 'CLEAR_CART') {
      return{...state, items:[]};
    }

    return {...state, items: updatedItems};
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload)

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if(existingCartItem.quantity === 1){
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity -1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {...state, items: updatedItems}
  }

  return state;
}

export function CartContextProvider ({children}) {
  const [ cart, dispatchCartAction] = useReducer(cartReducer, { items:[] } );

  const contextValue = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart
  }

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      payload: item
    })
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      payload: id
    })
  }

  function clearCart(){
    dispatchCartAction({
      type: "CLEAR_CART"
    })
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartContext;