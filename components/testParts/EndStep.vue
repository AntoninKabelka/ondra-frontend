<template>
    <div>
        <NuxtLink
         :to="url">
        <v-btn @click="endTest()">{{title}}</v-btn>
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
        
    },
    methods: {
        endTest(){
            console.log("Ending test - reseting vuex store")
            this.$store.commit('resetState')
        }
    }
}
</script>