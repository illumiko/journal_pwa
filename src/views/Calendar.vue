<template>
    <div class="">
        <div class="title py-2 pb-6 select-none">
            <svg @click="this.prevMonth()" xmlns="http://www.w3.org/2000/svg" class="transition-all inline cursor-pointer hover:fill-neutral-300 fill-neutral-400 rotate-180" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            <p class="inline px-8 text-neutral-50"> <span class="pr-2">{{this.$store.state.indexedYear}}</span> {{calendar.MONTH_NAMES[this.$store.state.indexedMonth]}}</p>
            <svg  @click="this.nextMonth()" xmlns="http://www.w3.org/2000/svg" class="transition-all inline cursor-pointer hover:fill-neutral-300 fill-neutral-400" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        </div>
        <div class="calendar_container">
            <div 
            :key="index"
            v-for="(days,index) in weekdays"
            :class="[index == 0 || index == 6 ?'text-red-500':'text-neutral-100']"
            >
                {{days}}
            </div>
            <div class="cursor-pointer select-none" 
            :key="index" @click="updateIndexedDate"
            v-for="(date,index) in monthdays(this.$store.state.indexedYear,this.$store.state.indexedMonth)"
            :class="['transition-all',calendar.isToday(this.$store.state.indexedYear,this.$store.state.indexedMonth,date) ? 'underline underline-offset-4':'',
                calendar.isWeekend(this.$store.state.indexedYear,this.$store.state.indexedMonth,date) ? 'text-red-500':'text-neutral-300',
                (this.$store.state.selectedDate == date && this.$store.state.selectedMonth == this.$store.state.indexedMonth && this.$store.state.selectedYear == this.$store.state.indexedYear) ? 'text-violet-400':'']" 
            :style="[index == 0 ?{'grid-column-start': new Date(this.$store.state.indexedYear,this.$store.state.indexedMonth,date).getDay() + 1}: {}]"
            >
                {{date}}
            </div>
        </div>
        <Task :notes="this.$store.state.indexedNote" :tasks="this.$store.state.indexedTask"></Task>
    </div>
</template>
<script>
import {Calendar} from "../components/calendar.js"
import Task from "./Task.vue"
export default {
    components: {Task},
    data() {
        return {
            calendar: Calendar,
        }
    },
    computed: {
        weekdays(){
            return Calendar.WEEKDAY_NAMES_SHORT
        },
    },
    mounted() {
        this.$store.dispatch("getDataIDB")
        
    },
    methods: {
        async updateIndexedDate(e){
            const date = e.target.textContent
            Promise.resolve(this.$store.commit("updateIndexedDate", {date: date})).then(i => {
                this.$store.dispatch("getDataIDB")
                // this.getDataIDB()
            })
        },
        async getDataIDB() {
            console.log("i ran mom")
            const date = this.$store.state.selectedDate
            const month = this.$store.state.selectedMonth
            const year = this.$store.state.selectedYear
            const id = `${year}-${month}-${date}`
            const data = await this.$store.state.calendar.getItemsDB([id,id])
            Promise.resolve(data).then( i => {
                if(Object.entries(data).length){ //checks to see if data has any data xD
                    console.log(i[id])
                    this.note = i[id].note
                    this.task = i[id].task
                }else {
                    this.note = []
                    this.task = []
                }
            })

        },
        monthdays(year,month){
            const getMonthDays = this.calendar.getMonthDays(year,month)
            const got = this.calendar.createMonthsArray(getMonthDays)
            return got

        },
        nextMonth() {
            this.$store.commit("nextMonth")
        },
        prevMonth() {
            this.$store.commit("prevMonth")
        }
    },
}
</script>
<style scoped>
.calendar_container{
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(7,50px);
}
</style>
