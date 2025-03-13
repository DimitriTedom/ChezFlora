import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface CartItem{
    id:number;
    name:string;
    quantity:number;
    price:number;
}

interface CartState{
    items:CartItem[];
    total:number;
}

const initialState:CartState={
    items:[],
    total:0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem: (state, action:PayloadAction<CartItem>)=>{
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.items.push({...action.payload,quantity:1});
            }
            state.total += action.payload.price;
        },
        removeItem: (state,action: PayloadAction<number>) =>{
            const itemToRemove = state.items.find((item) => item.id === action.payload);
            if(itemToRemove){
                state.total -= itemToRemove.price * itemToRemove.quantity;
                if(itemToRemove.quantity > 1){
                    itemToRemove.quantity -= 1;
                }else{
                    state.items = state.items.filter((item) => item.id !== action.payload);
                }
            }
        }
    }
})

export const {addItem,removeItem} = cartSlice.actions;
export default cartSlice.reducer