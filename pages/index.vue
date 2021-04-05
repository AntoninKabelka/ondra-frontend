<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h1>Montrealský kognitivní test</h1>
                    <div class="buttons">
                        <v-btn @click="startShortVersion"> Krátká verze</v-btn>
                        <v-btn @click="startLongVersion"> Standardní verze</v-btn>
                    </div>
                </v-col>
                <v-col cols="6"><img src="~/assets/home.svg" /></v-col>
            </v-row>
        </v-container>
  </div>
</template>

<script>
export default {
    async mounted() {
        let data = await this.$axios.get('http://localhost:5000/api/v1/get_file', {responseType: 'blob'})
        console.log(data)
        let blob = data.data
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
    },
    methods: {
        startShortVersion() {
            console.log("Spoustim kratkou verzi")
            // set vuex store data
            this.$store.commit('setVersion', 'short')
            return this.$router.push('/test')
        },
        startLongVersion() {
            console.log("Spoustim dlouhou verzi")
            // set vuex store data
            this.$store.commit('setVersion', 'long')
            return this.$router.push('/test')
        }
    },
}
</script>

<style scoped>
    .container {
        padding: 2rem;
    }
    h1 {
        margin: 1rem;
        text-align: center;
    }
    img{
        width: 100%;
    }
    .v-btn{
        display: block;
        margin: 1rem;
    }
    .buttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>