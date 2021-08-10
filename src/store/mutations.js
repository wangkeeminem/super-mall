import {ADD_COUNT,ADD_PRODUCT} from "./mutation-types" 
export default {
  addCart(state,payload){
    let addproduct=state.cartlist.find((item)=>{return item.iid==payload.iid})//判断是否已存在该产品，并返回该产品
    if (!addproduct){
      payload.count=1
      state.cartlist.push(payload)
    }
    else{
      addproduct.count+=1
        }
   //  console.log(product);  
  },
  [ADD_PRODUCT](state,payload){
    payload.count=1
    state.cartlist.push(payload)
  },
  [ADD_COUNT](state,payload){
    payload.count+=1},

  changechoice(state,payload){
    payload.isActive=!payload.isActive 
  
  },


}