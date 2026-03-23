import { defineStore } from 'pinia'
import {ref} from 'vue'
import {getloginAPI} from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore=defineStore('user',()=>{
    const CartStore=useCartStore()
const userInfo=ref({})
const getUserInfo=async({account,password})=>{
   const res= await getloginAPI({account,password})
   userInfo.value=res.result
   await mergeCartAPI(CartStore.cartList.map(item=>{
    return{
    skuId:item.skuId,
    selected:item.selected,
    count:item.count,

    }
    
   }))
   CartStore.updetaCart()
}
 
const clearUserInfo=()=>{
    userInfo.value={}
    CartStore.clearCart()
}
return{
    userInfo,
    getUserInfo,
    clearUserInfo
}
},{
    persist:true,
})