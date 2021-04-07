<template>
    <div> 
        <v-btn 
         @click="saveClick()">
            {{title}}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'EndStep',
    data() {
        return {
            title: 'Stiskněte když slyšíte A',
            startTime: Date.now(),
            clicks: []
        }
    },
    methods: {
        saveClick(){
            this.clicks.push(
                {
                    click: Date.now()
                }
            )
        },
        exportData(){
            let data = {startTime: this.startTime, clicks: this.clicks}
            return JSON.stringify(data);
        },
        saveData(){
            let axios = this.$axios
            let userId = this.$store.state.userId
            
            let blob = new Blob([this.exportData()], {type: "text/plain;charset=utf-8"})
            let filename = this.$store.state.counter + "-" + this.$store.state.step

            const formData = new FormData();
            formData.append('file', blob, `${filename}.txt`);

            axios.post(`http://localhost:5000/api/v1/file/upload/${userId}`, formData)

            console.log(this.exportData())
        }
    }
}
</script>