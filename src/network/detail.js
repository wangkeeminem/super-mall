
import {request2} from "./request"
export function getDetails(iid) {
  return request2({
    url:'/detail',
    params:{
      iid
    }
  })
}
export function getRecommend() {
  return request2({
    url:'/recommend',
  })
}

export class Goods{
  constructor(itemInfo,columns,shopInfo){
    this.title=itemInfo.title
    this.price=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discountDesc=itemInfo.discountDesc
    this.discountBgColor=itemInfo.discountBgColor
    this.columns=columns
    this.services=shopInfo.services
  }
}

export class Shop{
  constructor(shopInfo){
    this.name=shopInfo.name
    this.shopLogo=shopInfo.shopLogo
    this.cGoods=shopInfo.cGoods
    this.cSells=shopInfo.cSells
    this.score=shopInfo.score
  }

}

export class GoodInfo{
  constructor(detailInfo,detailImage){
    this.desc=detailInfo.desc
    this.key=detailImage[0].key
    this.imgList=detailImage[0].list
  }

}

export class GoodParam{
  constructor(ruleTables,infoSet){
    this.tables=ruleTables
    this.infoSet=infoSet
  }

}

export class UserComments{
  constructor(user,userinfo,images){
    this.uname=userinfo.uname
    this.avatar=userinfo.avatar
    this.images=images
    this.content=user.content
    this.time=user.created
    this.style=user.style
  }
}