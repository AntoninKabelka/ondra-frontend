<template>
    <div>
        <NuxtLink
         :to="url" class="buttonss">
        <v-btn color="secondary"
			elevation="9"
			large
			x-large 
			
			@click="endTest()">{{title}}</v-btn>
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

<style scoped>
.buttonss span{
	text-decoration: none;
}
</style>