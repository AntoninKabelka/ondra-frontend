<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col class="6">
                    <h1>
                        {{ 'Úkol: ' }}{{ this.$store.state.counter }}{{'. Krok: '}}{{this.$store.state.step }}{{'.'}}
                    </h1>
                    <p>
                        {{ data.note }} 
                    </p>
                </v-col>
                <v-col class="6">
                    <img v-if="data.resources.includes('mp3')" src="~/assets/listen.svg" />
                    <img v-if="data.requests.includes('txt')" src="~/assets/type.svg" />
                    <img v-if="data.requests.includes('mp3') || customComponent == 'CustomRecorder'" src="~/assets/speak.svg" />
                    <img v-if="data.requests.includes('png')" src="~/assets/paint.svg" />
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
                         ref="text"   
                         v-if="data.textOutputs.length > 0"
                         :labels="data.textOutputs"
                         :imagePath="imagePath"/>
                        <recorder 
                         ref="sound" 
                         v-if="data.requests.includes('mp3')"/>
                        <component
                         v-if="customComponent != ''"
                         :is="customComponent"
                         ref="customComponent"/>
                    </v-container>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-container v-if="customComponent != 'EndStep'">
                        <v-btn 
						class="nextButton"
						color="secondary"
						elevation="9"
						large
						x-large
                         v-if="data.nextStep" 
                         @click="nextStep()"
                         :key="disabled"
                         :disabled="disabled">
                            Další krok
                            </v-btn>
                        <v-btn 
						class="nextButton"
						color="secondary"
						elevation="9"
						large
						x-large
                         v-else 
                         @click="nextTask()"
                         :disabled="disabled">
                            Další Úkol
                        </v-btn>
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
import Recorder from '~/components/Recorder.vue'
import CustomRecorder from '~/components/CustomRecorder.vue'

export default {
    components: { Paint, InputFields, EndStep, ClickingStep, Recorder, CustomRecorder },
    data() {
        return {
            number: this.$store.state.counter,
            data: {
                category: '',
                note: '',
                requests: [],
                textOutputs: [],
                nextStep: false,
                resources:[],
                disabledTime: 1,
            },
            imagePath: '',
            soundPath:'',
            customComponent: '',
            inputRows: 2,
            step: 1,
            audioElement: null,
            disabled: true,
        }
    },
    mounted(){
        this.getTaskSettings(this.step-1);
        setTimeout(this.playSound, 1000) 
        
    },
    methods: {
        getTaskSettings(step){
            var json = require(`../static/${this.$store.state.version}/${this.$store.state.counter}/${this.$store.state.counter}.json`);
            this.data = json.data[step]   
            console.log(this.data)
            this.imagePath = this.data.resources.includes('png') ? `/${this.$store.state.version}/${this.$store.state.counter}/${this.step}.png` : ''
            this.soundPath = this.data.resources.includes('mp3') ? `/${this.$store.state.version}/${this.$store.state.counter}/${this.step}.mp3` : ''
            this.customComponent = this.data.custom.length > 0 ? this.customComponent = this.data.custom[0] : ''
            console.log(this.customComponent)
            let time = parseInt(this.data.disabledTime)*1000 + 1000
            console.log(time)
            setTimeout(this.activateButton, time)
        },
        activateButton(){
            this.disabled = false
        },
        nextStep(){
            this.disabled = true
            this.stopSound()
            console.log(this.data.requests)
            if (this.data.requests.includes('txt')) {
                this.$refs.text.saveText()
            }
            if (this.data.requests.includes('mp3')) {
                this.$refs.sound.saveData()
            }
            this.$store.commit('incrementStep')
            this.$forceUpdate()
            this.step = this.$store.state.step
            this.getTaskSettings(this.step-1)
            setTimeout(this.playSound, 1000)
            
        },
        nextTask(){
            this.disabled = true
            this.stopSound()

            if (this.data.requests.includes('png')) {
                this.$refs.picture.saveImage()
            }
            if (this.data.requests.includes('txt')) {
                this.$refs.text.saveText()
            }
            if (this.data.requests.includes('mp3')) {
                this.$refs.sound.saveData()
            }
            if (this.customComponent) {
                this.$refs.customComponent.saveData()
            }
            this.$store.commit('increment')

            this.step = 1
            this.$store.commit('resetStep')

            this.$forceUpdate()
            this.getTaskSettings(this.step-1);
            console.log(this.data.textOutputs)
            console.log(this.$store.state.step)
            console.log(this.$store.state.counter)
            this.imagePath = this.data.resources.includes("png") ? `/${this.$store.state.version}/${this.$store.state.counter}/${this.step}.png` : ''
            this.soundPath = this.data.resources.includes("mp3") ? `/${this.$store.state.version}/${this.$store.state.counter}/${this.step}.mp3` : ''
            setTimeout(this.playSound, 1000)
            
            console.log(this.imagePath);
        },
        playSound(){
            if(this.soundPath != ''){
                this.audioElement = new Audio(this.soundPath);
                this.audioElement.play();
            }
        },
        stopSound(){
            if (this.audioElement){
                this.audioElement.pause();
                this.audioElement = null;
            }
        }
    }
}
</script>

<style scoped>
h1
{
     margin:1rem;   
}
p
{
     margin-left: 1rem;
     font-size:20px;
}
img
{
	width: 40%;
	margin: 1rem;
}
button.nextButton {
	height: 4rem !important;
	width: auto !important;
	color: black;
	font-size: 1rem;
	background-color: white;
}
</style>