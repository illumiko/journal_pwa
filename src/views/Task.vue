<template>
    <div 
    :class="[`h-max w-full before:content-[''] before:opacity-70 mt-8 before:-left-0 relative before:absolute before:-z-10 before:w-full before:bg-black before:h-full`]" 
    >
        <div v-if="!this.$store.state.indexedNote.length" class="h-64 overflow-y-hidden">
            <p class="text-2xl px-2 py-4">No data</p>
        </div>
        <div v-else class="" >
            <div :key="taskI" v-for="(task,taskI) in this.$store.state.indexedTask">
                <div :id="taskI" class="relative break-words border-b text-left px-2 mt-8 py-8">
                    <div>
                        <p class="text-red-400">{{task}}</p>
                        <p class="text-violet-400">{{this.$store.state.indexedNote[taskI]}}</p>
                    </div>
                    <div class="flex absolute right-3 bottom-2">
                        <svg @click="this.toggleComplete" class="hover:fill-emerald-300 active:fill-emerald-300 cursor-pointer fill-emerald-400 m-0 stroke-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                        <svg @click="this.delete" class="hover:fill-red-300 active:fill-red-300 cursor-pointer fill-red-400 mx-2 stroke-1 m-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                        <svg @click="this.toggleEdit" class="hover:fill-amber-300 active:fill-amber-300 cursor-pointer fill-amber-400 m-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"/></svg>
                    </div>
                </div>
            </div>
            <!-- <p :key="noteI" v-for="(note,noteI) in notes">{{note}}</p> -->
        </div>
    </div>

    <ModalUI class="z-20 absolute top-1/3" @close-modal="this.modal = !this.modal" :visibility="this.modal">
        <div class="relative">
           <Form-Field @form-inputs="edit" :enable-number="false"></Form-Field> 
           <p :class="{'scale-0': !this.ani}" class="transition-all bg-green-500 text-neutral-800 my-5 w-max -top-20 -right-6 rounded absolute px-5 py-2">Edited</p>
        </div>
    </ModalUI>
</template>
<script>
import {Calendar} from "../components/calendar.js"
import ModalUI from '../components/slots/ModalUI.vue'
import FormField from "./formfields.vue"
export default {
    props: ["notes","tasks"],
    components: { 
        ModalUI,
        FormField,

    },
    data() {
        return {
            modal: false,
            ani: false,
            selectedDate: this.$store.state.selectedDate,
            calendar: Calendar,
            taskIndexForEdit: NaN,
        }
    },
    updated() {
    },
    methods: {
        getInfoOnTask(e) {
            return {
                taskIndex: parseFloat(e.currentTarget.parentElement.parentElement.id),
                selectedDate: this.$store.state.selectedDate,
                selectedMonth: this.$store.state.selectedMonth,
                selectedYear: this.$store.state.selectedYear,
            }
        },
        toggleComplete(e){
            const targettedTask = e.currentTarget.parentElement.parentElement.firstChild
            targettedTask.childNodes.forEach(i => {
                i.classList.toggle("text-neutral-400")
            })

        },
        toggleEdit(e) {
            this.taskIndexForEdit = this.getInfoOnTask(e).taskIndex
            this.modal = !this.modal
        },
        async edit(emits) {
            const formInputNote = emits.note[0]
            const formInputTask = emits.task[0]
            const taskId = `${this.$store.state.selectedYear}-${this.$store.state.selectedMonth}-${this.$store.state.selectedDate}`
            const data = await this.$store.state.calendar.getItemsDB([taskId,taskId])
            Promise.resolve(data).then(i => {
                const notes = i[taskId].note
                const tasks = i[taskId].task
                notes[this.taskIndexForEdit] = formInputNote
                tasks[this.taskIndexForEdit] = formInputTask
                const editedTask = {
                    id: taskId,
                    task: tasks,
                    note: notes,
                }
                this.$store.state.calendar.putItemsDB(editedTask)
                this.$store.dispatch("getDataIDB")

            })
            //for UI inidication of task add
            this.ani = !this.ani
            setTimeout(() => {
                this.ani = !this.ani
                this.modal = !this.modal
            }, 400);
        },
        async delete(e) {
            const info = this.getInfoOnTask(e)
            const taskId = `${info.selectedYear}-${info.selectedMonth}-${info.selectedDate}`
            const data = await this.$store.state.calendar.getItemsDB([taskId,taskId])
            Promise.resolve(data).then(i => {
                const tasks = i[taskId].task
                const notes = i[taskId].note
                const filteredTasks = tasks.filter((_,i) => i == info.taskIndex ? !_ : [])
                const filteredNotes = notes.filter((_,i) => i == info.taskIndex ? !_ : [])
                const filteredItem = {
                    id: taskId,
                    task: filteredTasks,
                    note: filteredNotes
                }
                this.$store.state.calendar.putItemsDB(filteredItem)
                this.$store.dispatch("getDataIDB") 
            })
        }

    },
}
</script>
<style scoped>
.completed{
    @apply line-through underline overline;
}

</style>
