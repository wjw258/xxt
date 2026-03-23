import { getCateAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import {useRoute} from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
export function usecate(){
const cate=ref({})
const route=useRoute()
const getcate=async (id=route.params.id)=>{
    const res=await getCateAPI(id)
    cate.value=res.result
}
onMounted(()=>getcate())
onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getcate(to.params.id)
  })
return({
    cate
})
}