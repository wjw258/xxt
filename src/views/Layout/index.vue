<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFix from './components/LayoutFix.vue'
import {usecategoryStore} from '@/stores/usecategory'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const CarStore=useCartStore()
const categorystore=usecategoryStore()
onMounted(()=>{
  categorystore.getcategory()
  CarStore.updetaCart()
})
</script>

<template>
    <LayoutFix/>
    <LayoutNav/>
    <LayoutHeader/>
  <!--   <RouterView :key="$route.fullPath" /> -->
    <RouterView  />
    <LayoutFooter/>
     
</template>