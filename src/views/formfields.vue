<template>
    <div class="">
        <form @submit.prevent="$emit('form-inputs',{date: parseFloat(this.date), task: [this.task], note: [this.note]})"> 
            <div v-if="enableNumber" class="pt-12 flex focus-within:text-red-500">
                <label for="data" class="pr-4">Date:</label>
                <input
                    v-model="date" type="number" name="date" min="1" 
                    class="w-full bg-neutral-800 border-b-neutral-500 font-thin border-b  text-white"
                    :class="['focus:outline-none','focus:border-b-red-500']"
                    id="date" required
                    :max="calendar.getMonthDays(calendar.TODAY_Year,selectedMonthIndex)" 
                >
            </div>
            <div class="flex py-4 focus-within:text-red-500">
                <label for="task" class="pr-4">Task:</label>
                <input v-model="task" type="text" name="task" id="task" required
                    class="w-full bg-neutral-800 border-b-neutral-500 font-thin border-b  text-white"
                    :class="['focus:outline-none','focus:border-b-red-500']"
                >
            </div>
            <div class="flex focus-within:text-red-500">
                <label for="note" class="pr-4">Note:</label>
                <input v-model="note" type="text" name="note" id="note" required
                    class="w-full bg-neutral-800 border-b-neutral-500 font-thin border-b  text-white"
                    :class="['focus:outline-none','focus:border-b-red-500']"
                >
            </div>
            <button class="mt-8 py-1 text-xl rounded-md text-neutral-800 px-3 bg-red-500">Add</button>
        </form>
    </div>
</template>
<script>
import {Calendar} from "../components/calendar.js"
export default {
    props: ["enableNumber","selectedMonthIndex"],
    emits: ["form-inputs"],
    data() {
        return {
            calendar: Calendar,
            date: Calendar.TODAY_DATE,
            task: "",
            note: "",

        }
    },
    mounted() {
        // this.date = this.calendar.TODAY_DATE // to set current day with monthSelect having proper value
    },
}
</script>
<style scoped>

</style>
