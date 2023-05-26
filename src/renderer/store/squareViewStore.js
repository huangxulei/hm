import { defineStore } from 'pinia'
import { usePlatformStore } from './platformStore'

export const useSquareViewStore = defineStore('squareView', {
    state:()=>({
        categoryMap: new Map(),
        currentCategoryItem:{//当前分类
            data:{key:'默认', value:''},
            row:0,
            col:0
        }
    }),
    getters:{
        currentPlatformCode(state){//平台编码
            const plateform = usePlatformStore()
            return plateform.currentPlatformCode
        },
        currentCategoryCode(state){//分类编码
            return state.currentCategoryItem.data.value
        }
    },
    actions:{
        putCategory(key, value){
            this.categoryMap.set(key, value)
        },
        putCurrentCategory(value){
            this.putCategory(this.currentCategoryCode, value)
        },
        getCategory(key){
            return this.categoryMap.get(key)
        },
        currentCategory(){
            return this.getCategory(this.currentPlatformCode)
        },
        currentVender(){
            const platform = usePlatformStore()
            return platform.currentVender()
        },
        updateCurrentCategoryItem(data, row, col){
            this.currentCategoryItem.data = data
            this.currentCategoryItem.row = row
            this.currentCategoryItem.col = col
        },
        resetCurrentCategoryItem(){
            this.updateCurrentCategoryItem({key:'默认', value:''}, 0, 0)
        }

    }
})