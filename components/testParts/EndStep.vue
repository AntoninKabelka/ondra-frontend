<template>
    <div>
        <NuxtLink
         :to="url">
        <v-btn>{{title}}</v-btn>
        </NuxtLink>
        
    </div>
</template>

<script>
export default {
    name: 'EndStep',
    data() {
        return {
            url: '/thanks',
            title: 'Ukončit test'
        }
    },
    mounted(){
        
    }
}
</script>