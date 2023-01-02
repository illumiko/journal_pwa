<template>
    <modalUI class="z-20" @close-modal="this.modal = !this.modal" :visibility="this.modal">
        <div class="relative">
           <Month-Select-Field :list="calendar.MONTH_NAMES" v-model:month="monthSelect"></Month-Select-Field>
           <Form-Field @form-inputs="add" :selected-monthIndex="monthSelect.index" :enable-number="true"></Form-Field> 
           <p :class="{'scale-0': !this.ani}" class="transition-all bg-green-500 text-neutral-800 my-5 w-max -top-20 -right-6 rounded absolute px-5 py-2">Item added</p>
        </div>
    </modalUI>
        <button @click="this.modal = !this.modal"
            class="text-xl z-20 text-neutral-800 bottom-4 right-4 hover:bg-red-300 transition-colors px-3 absolute rounded-md bg-red-500 py-1"
            :class="[(this.modal) ? 'scale-0' : 'scale-100']"
        >+</button>
</template>
<script>
import ModalUI from '../components/slots/ModalUI.vue'
import FormField from "./formfields.vue"
import MonthSelectField from "./monthSelectField.vue"
import {Calendar} from "../components/calendar.js"
export default {
    components: {
        FormField,
        MonthSelectField,
        ModalUI
    },
    data() {
        return {
            modal: false,
            ani: false,
            calendar: Calendar,
            monthSelect: {},
        }
    },
    methods: {
        async add(passed) {
            const id = `${Calendar.TODAY_YEAR}-${this.monthSelect.index}-${passed.date}`//year-month-date
            const content = {
                note : passed.note,
                task : passed.task
            }
            const data = await this.$store.state.calendar.getItemsDB([id,id])
            if(Object.entries(data).length){
                const note = [...data[id].note,content.note[0]]
                const task = [...data[id].task,content.task[0]]
                const item = {
                    id: id,
                    note: note,
                    task: task,
                }
                this.$store.state.calendar.putItemsDB(item)
            }else{
                const item = {
                    id:id,
                    note: content.note,
                    task: content.task
                }
                this.$store.state.calendar.putItemsDB(item)
            }
            //for UI notification of task being added
            this.ani = !this.ani
            setTimeout(() => {
                this.ani = !this.ani
                this.$store.dispatch("getDataIDB") //update tasks
            }, 400);
        },
    },
}
</script>
<style scoped>
</style>
