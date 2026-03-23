// 封装购物车模块

import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { addCartAPI,getCartListAPI,delCartAPI } from '@/apis/cart'
import { ElStep } from 'element-plus'
export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - cartList
  const cartList = ref([])
  const userStore=useUserStore()
const islogin=computed(()=>userStore.userInfo.token)
const updetaCart=async()=>{
  const res=await getCartListAPI() 
cartList.value=res.result
}
  // 2. 定义action - addCart
  const addCart = async(goods) => {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const {skuId,count}=goods
    if(islogin.value){
      
await addCartAPI({skuId,count})
updetaCart()
 
    }else{
      const item = cartList.value.find( (item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count=item.count+goods.count
    } else {
      // 没找到
      cartList.value.push(goods)
      console.log(cartList)
    }
    }
    
  }
  const delCart = async (skuId) => {
    if (islogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
    updetaCart()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  
const singleCheck=(skuId,selected)=>{
  const item=cartList.value.find((item)=>item.skuId===skuId)
  item.selected=selected
}
const allCheck=(selected)=>{
  cartList.value.forEach(item=>item.selected=selected)
}
const clearCart=()=>{
  cartList.value=[]
}

  const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
  const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
  const allin=computed(()=>cartList.value.every((item)=>item.selected))
  const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
  const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
  const checkinfo=computed(()=>cartList.value.filter(item=>item.selected))
  return {
    cartList, 
    allCount,
    allPrice,
    allin,
    selectedCount,
    selectedPrice,
    checkinfo,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updetaCart

  
  }
}, {
  persist: true,
})