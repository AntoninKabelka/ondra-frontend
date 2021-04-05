<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null,
        }
    },
    mounted() {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            // audio.srcObject = stream
            
            this.mediaRecorder.start();

            this.mediaRecorder.addEventListener("dataavailable", event => {
                this.audioChunks.push(event.data)
            })
            this.mediaRecorder.addEventListener("stop", () => {
                this.audioBlob = new Blob(this.audioChunks, { 'type' : 'audio/wav' })
                let userId = this.$store.state.userId
                
                //debugging - playing back the sound in the browser works fine
                // const audioUrl = URL.createObjectURL(this.audioBlob);
                // const audio = new Audio(audioUrl);
                // audio.play();
                
                //adding the blob to the request
                let filename = this.$store.state.counter + "-" + this.$store.state.step
                const formData = new FormData();
                formData.append('file', this.audioBlob, `${filename}.wav`);
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                //sending it to my Flask API 
                let res = this.$axios.post(`http://localhost:5000/api/v1/file/upload/${userId}`, formData)
                console.log(this.audioBlob)
            })
        })
    },
    methods: {
        saveData(){
            this.mediaRecorder.stop()
        }
    }
}
</script>

<style>

</style>