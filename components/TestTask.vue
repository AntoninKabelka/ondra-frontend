<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col clas="12">
                    <h1>
                        {{ 'Ukol:' }}{{ number }}
                    </h1>
                    <p>
                        {{ data.note }} 
                    </p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <paint 
                         :key="this.$store.state.counter"
                         ref="picture" 
                         v-if="data.requests.includes('png')"
                         :imageUrl="imagePath"/>
                        <input-fields
                         ref="inputFields"   
                         v-if="data.textOutputs.length > 0"
                         :labels="data.textOutputs"
                         :imagePath="imagePath"/>
                        <component
                         v-if="customComponent != ''"
                         :is="customComponent"/>
                    </v-container>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-container>
                        <button 
                         v-if="data.nextStep" 
                         @click="nextStep()">
                            Další krok
                            </button>
                        <button 
                         v-else 
                         @click="nextTask()">
                            Další
                        </button>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Paint from '~/components/paint/Paint.vue'
import InputFields from '~/components/InputFields.vue'
import EndStep from '~/components/testParts/EndStep.vue'
import ClickingStep from '~/components/testParts/ClickingStep.vue'

export default {
    components: { Paint, InputFields, EndStep, ClickingStep },
    data() {
        return {
            number: this.$store.state.counter,
            data: {
                category: '',
                note: '',
                requests: [],
                textOutputs: [],
                nextStep: false,
            },
            imagePath: '',
            soundPath:'',
            customComponent: '',
            inputRows: 2,
            step: 1
        }
    },
    mounted(){
        this.getTaskSettings(this.step-1);
        this.playSound()  
    },
    computed: {
        taskImageUrl() {
            console.log('computed'+this.taskNumber);
        }
    },
    methods: {
        getTaskSettings(step){
            var json = require(`../static/tasks/${this.$store.state.counter}/${this.$store.state.counter}.json`);
            this.data = json.data[step]   
            this.imagePath = this.data.resources.includes('png') ? `/tasks/${this.$store.state.counter}/${this.step}.png` : ''
            this.soundPath = this.data.resources.includes('mp3') ? `/tasks/${this.$store.state.counter}/${this.step}.mp3` : ''
            this.customComponent = this.data.custom.length > 0 ? this.customComponent = this.data.custom[0] : ''
            console.log(this.customComponent)
        },
        nextStep(){
            let step = this.step
            this.step = 1 + step
            this.getTaskSettings(this.step-1)
            this.playSound()
        },
        nextTask(){
            //this.$refs.picture.saveImage()
            this.$store.commit('increment')
            this.number = this.$store.state.counter
            this.step = 1
            this.$forceUpdate()
            this.getTaskSettings(0);
            this.imagePath = this.data.resources.includes("png") ? `/tasks/${this.$store.state.counter}/${this.step}.png` : ''
            this.soundPath = this.data.resources.includes("mp3") ? `/tasks/${this.$store.state.counter}/${this.step}.mp3` : ''
            this.playSound()
            
            console.log(this.imagePath);
        },
        playSound(){
            if(this.soundPath != ''){
                var audioElement = new Audio(this.soundPath);
                audioElement.play();
            }
        }
    }
}
</script>

<style>

</style>