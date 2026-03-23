import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'
import { ref } from 'vue'

export const usecategoryStore = defineStore('category', () => {
 const categorylist=ref([])
const getcategory =async()=>{
  const res=await getCategoryAPI()
  categorylist.value=res.result
}

  return { 
    categorylist,
    getcategory
   }
})
