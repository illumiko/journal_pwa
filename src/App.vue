<template>
    <div id="container" class=" text-xl bg-scroll text-neutral-300 bg-neutral-900 h-screen m-0">
        <div class="bg-red-20 overflow-hidden overflow-y-scroll pt-4 px-2 h-full place-items-center">
            <Form></Form>
            <calendar-view ></calendar-view>
        </div>
    </div>
</template>

<script>
import CalendarView from './views/Calendar.vue'
import Form from './views/form.vue'
// import Task from "./views/Task.vue"

export default {
    name: 'App',
    components: {
        CalendarView,
        Form,
        // Task
    }
}
    
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow:hidden;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
::-webkit-scrollbar {
    width: 0.15em;
    @apply rounded-xl;
}
::-webkit-scrollbar-track {
    background: #4040409c;
}
/* ::-webkit-scrollbar-button {
    background: blue
} */
::-webkit-scrollbar-thumb {
    @apply bg-red-400 opacity-0
}
#container {
    background: url("./assets/default.png") no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
}
#container::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    right: 0;
    z-index: -1;
    @apply bg-neutral-900 opacity-60;
}
</style>
