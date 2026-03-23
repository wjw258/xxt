import httpInstance from "@/utils/http";
export function getbannerAPI(params={}){
    const {distributionSite='1'}=params
    return httpInstance({
        url:'/home/banner',
        params:{
            distributionSite
        }
    })
}
export function getnewlistAPI(){
    return httpInstance({
        url:'/home/new'
    })
}
export function gethotlistAPI(){
    return httpInstance({
        url:'/home/hot'
    })
}
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}