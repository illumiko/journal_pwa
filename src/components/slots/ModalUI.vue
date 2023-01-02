<template>
    <div class="bg-neutral-800 z-20 p-6 transition-all rounded-md absolute right-0" :class="[(this.visibility) ? 'scale-100' : 'scale-0' ]">
        <button @click="$emit('close-modal')" 
            class="text-xl text-neutral-800 hover:bg-red-300 transition-colors p-4 rounded-l-full relative -right-44 -top-4 rounded-md bg-red-500 py-1">X</button>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:['visibility'],
    data() {
        return {
        }
    },
}
</script>
