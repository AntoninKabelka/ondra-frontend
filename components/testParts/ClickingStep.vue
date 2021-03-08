<template>
    <div> 
        <v-btn 
         @click="saveClick()">
            {{title}}
        </v-btn>
        <v-btn @click="log()"/>
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
            return JSON.stringify(this.clicks);
        },
        log(){
            console.log(this.exportData())
        }
    }
}
</script>