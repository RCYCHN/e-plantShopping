import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const costNumber = parseFloat(cost.replace('$', '')); // Convert to number
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item => 
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item
          ),
          totalQuantity: state.totalQuantity + 1, // Increment totalQuantity
        };
      } else {
        return {
          ...state,
          items: [...state.items, { name, image, cost, quantity: 1 }],
          totalQuantity: state.totalQuantity + 1, // Increment totalQuantity
        };
      }
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.name !== action.payload),
        totalQuantity: state.totalQuantity - (itemToRemove ? itemToRemove.quantity : 0), // Decrement totalQuantity
      };
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      const previousQuantity = itemToUpdate ? itemToUpdate.quantity : 0; // Get previous quantity
      
      return {
          ...state,
          items: state.items.map(item => 
              item.name === name ? { ...item, quantity } : item
          ),
          totalQuantity: state.totalQuantity - previousQuantity + quantity, // Adjust totalQuantity
      };
    },
  },
})
  

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;

export default CartSlice.reducer;
