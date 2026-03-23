import { onMounted, ref } from 'vue'
import { getbannerAPI } from '@/apis/Home'
export function usebanner(){
 const banner=ref([])
const getbanner=async()=>{

    const res=await getbannerAPI({
        distributionSite:'2'
    })
    banner.value=res.result
}
onMounted(()=>getbanner())
return({
    banner
})
}