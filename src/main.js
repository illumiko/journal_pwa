import { createApp } from 'vue'
import {createStore} from "vuex"
import App from './App.vue'
import './registerServiceWorker'
import './assets/tailwind.css'
import {Calendar} from "./components/calendar.js"
import {IDB} from "./components/idb.js"
const store = createStore({
    state(){
        return {
            calendar: new Calendar(),
            indexedMonth: Calendar.TODAY_MONTH,
            indexedYear: Calendar.TODAY_YEAR,
            selectedDate: Calendar.TODAY_DATE,
            selectedMonth: Calendar.TODAY_MONTH,
            selectedYear: Calendar.TODAY_YEAR,
            //current set of loded tasks and note
            indexedNote: [],
            indexedTask: [],
        }
    },
    actions: {
        async getDataIDB(context) {
            const date = context.state.selectedDate
            const month = context.state.selectedMonth
            const year = context.state.selectedYear
            const id = `${year}-${month}-${date}`
            const data = await context.state.calendar.getItemsDB([id,id])
            Promise.resolve(data).then(i => {
                context.commit("getDataIDB", {data: i, id:id})
            })
        },
    },
    mutations: {
        getDataIDB(state,payload) {
            Promise.resolve(payload.data).then( i => {
                if(Object.entries(payload.data).length){ //checks to see if data has any data xD
                    state.indexedNote = i[payload.id].note
                    state.indexedTask = i[payload.id].task
                }else {
                    state.indexedNote = []
                    state.indexedTask = []
                }
            })
        },
        updateIndexedDate(state,payload) {
            state.selectedDate = payload.date
            state.selectedMonth = state.indexedMonth
            state.selectedYear = state.indexedYear
        },
        nextMonth(state) {
            if(state.indexedMonth === 11){
                state.indexedMonth = 0
                state.indexedYear++
            }else {state.indexedMonth++}
        },
        prevMonth(state) {
            if(state.indexedMonth === 0){
                state.indexedMonth = 11
                state.indexedYear--
            }else {state.indexedMonth--}
        },
    },
})
store.state.calendar.openDB().then(e => {
    // store.state.calendar.getItemsDB([1,4]).then(e => console.log(e))
    const app = createApp(App)
    app.use(store)
    app.mount("#app")
})
