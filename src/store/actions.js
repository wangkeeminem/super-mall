import {ADD_COUNT,ADD_PRODUCT} from "./mutation-types" 
export default {
  addCart({state,commit},payload){
    // let addproduct=state.cartlist.find((item)=>{return item.iid==payload.iid})//判断是否已存在该产品，并返回该产品
    // if (!addproduct){
    //   commit(ADD_PRODUCT,payload)
    // }
    // else{
    //   commit(ADD_COUNT,addproduct)
    //     }
    return new Promise((res,rej)=>{
    let addproduct=state.cartlist.find((item)=>{return item.iid==payload.iid})//判断是否已存在该产品，并返回该产品
    if (!addproduct){
      commit(ADD_PRODUCT,payload)
      // console.log('添加到购物车');
      res('已添加到购物车')
    }
    else{
      commit(ADD_COUNT,addproduct)
      // console.log('添加商品数');
      res('当前的商品数+1')
        } 
    })
  },

}