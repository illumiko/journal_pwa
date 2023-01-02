<template>
    <div class="grid grid-cols-3 gap-2">
        <div
            :key="month.value"
            v-for="month in this.months"
            class="rounded-md border w-28"
            :class="[month.selected ? 'border-red-500' : 'border-neutral-300', 'cursor-pointer transition-all']"
            @click="select"
            >
            {{month.value}}
        </div>
    </div>
</template>
<script>
import {Calendar} from "../components/calendar.js"
export default {
    props: ['month', 'list'],
    emit: ['update:month'],
    data() {
        return {
            calendar: Calendar,
            months:this.list.map((i,index) => {return {value:i, index:index, selected: false}})
        }
    },
    mounted() {
        //sets the current month automatically
        const currentMonth = {value: `${Calendar.MONTH_NAMES[Calendar.TODAY_MONTH]}`,index:Calendar.TODAY_MONTH,selected:true}
        this.months.filter((i,index) => {
            i.selected = false
            if (i.index == currentMonth.index){
                i.selected = !i.selected
                this.$emit("update:month", i)
            }
        })
        
    },
    methods: {
        select(e){
            const got = e.target.innerText
            this.months.filter((i,index) => {
                i.selected = false
                if (i.value == got){
                    i.selected = !i.selected
                    this.$emit("update:month", i)
                }
            })
        }
    },
}
</script>
