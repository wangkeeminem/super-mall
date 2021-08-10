
import request from "./request"
// 针对home中的请求封装到homejs中，可以封装多个函数。
export function getHomeMultidate(){
  return request({
    url:'/home/multidata',
  })

}
import {request2} from "./request"
export function getHomeGoods(type,page) {
  return request2({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}