<template>
    <div>
        <h1>Zadejte odpoved</h1>
        <v-img v-if="imagePath" :max-width="400" :src="imagePath"/>
        <v-text-field
            v-for="x in labels.length"
            :key="'input'+x"
            :messages="labels[x-1]"
            :value="''"
            :background-color="'rgba(140,140,140,0.3)'"
            :clearable="true"
            :outlined="true"/>
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
    mounted(){
        
    }
}

</script>

<style>
    
</style>