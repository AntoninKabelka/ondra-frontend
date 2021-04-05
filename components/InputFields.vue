<template>
    <div>
        <h2>Vyplňte odpověd: </h2>
        <v-img class="img" v-if="imagePath" :max-width="400" :src="imagePath"/>
        <div class="inputs">
            <v-text-field
            v-for="(input, index) in inputs"
            v-model="input.answer"
            :key="input.label + index"
            :messages="input.label"
            :value="''"
            :background-color="'rgba(140,140,140,0.3)'"
            :outlined="true"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'InputFieilds',
    props: {
        inputCount: Number,
        labels: Array,
        imagePath: String,
    },
    watch: {
        labels: function() {
            this.resetItems()
        }
    },
    data() {
        return{
            inputs: [],
        }
        
    },
    mounted(){
        let inputs = []
        console.log(this.labels)
        this.labels.forEach(item => {
            this.inputs.push({label: item, answer: ''})
        })
    },
    methods: {
        saveText(){
            console.log('Saving data')
            console.log(this.inputs)
            let string = JSON.stringify(this.inputs)
            let axios = this.$axios
            let userId = this.$store.state.userId
            
            let blob = new Blob([string], {type: "text/plain;charset=utf-8"})
            let filename = this.$store.state.counter + "-" + this.$store.state.step

            const formData = new FormData();
            formData.append('file', blob, `${filename}.txt`);

            axios.post(`http://localhost:5000/api/v1/file/upload/${userId}`, formData)

            // reset labels
            this.resetItems()
        },
        resetItems(){
            this.inputs = []
            this.labels.forEach(item => {
            this.inputs.push({label: item, answer: ''})
            })
        }
    }
    
}

</script>

<style>
    .img{
        margin-bottom: 1rem;
    }
    .inputs {
        display: flex;
    }
</style>