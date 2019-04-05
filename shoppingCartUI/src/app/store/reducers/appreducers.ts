const appState = {};
export function appreducer(state:any=appState,action:any){
    switch(action.type){
        case 'ADDEDTOCART':
            return {...state, cart:{...state.cart,counter:state.cart.counter+1}}
        case 'REMOVEDFROMCART':
            return {...state, cart:{...state.cart,counter:state.cart.counter-1}}
        default:
            return state;        
    }        
}