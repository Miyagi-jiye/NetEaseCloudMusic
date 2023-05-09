import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBilibiliStore = defineStore(
  'bilibili',
  () => {
    // state
    const bilibiliData = reactive({
    })
    // actions
    const getCalendar = async () => {
      const res = await axios.get('http://guowei.fun:9999/api/calendar')
    }

    return {
      bilibiliData,
    }
  },
  {
    persist: true,
  }
) 