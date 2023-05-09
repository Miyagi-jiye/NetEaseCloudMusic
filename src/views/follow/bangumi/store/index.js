import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useBangumiStore = defineStore(
  'bangumi',
  () => {
    // state
    const bangumiData = reactive({
      calendar: [],
    })
    // actions
    const getCalendar = async () => {
      const res = await axios.get('https://api.bgm.tv/calendar')
      bangumiData.calendar = res.data
      console.log('bangumi每日放送', res.data)
    }

    return {
      bangumiData,
      getCalendar,
    }
  },
  {
    persist: true,
  }
) 