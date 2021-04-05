<template>
    <div>
        <div id="painting">
            <canvas id="myCanvas"></canvas>
        </div>
    </div>
</template>

<script>

export default {
    props: ['imageUrl'],
    mounted(){
        this.createCanvas()
    },
    methods: {  
        saveImage(){
            console.log("sending image from paint")
            let canvas = document.getElementById('myCanvas') 
            let axios = this.$axios
            let filename = this.$store.state.counter
            let userId = this.$store.state.userId

            canvas.toBlob(function(blob) {
                const formData = new FormData();
                formData.append('file', blob, `${filename}.png`);

                axios.post(`http://localhost:5000/api/v1/file/upload/${userId}`, formData);
            });
        },
        createCanvas(){
            let canvas = document.getElementById('myCanvas')
            let cntx = canvas.getContext("2d")
            let painting = document.getElementById('painting')
            let paintStyle = getComputedStyle(painting)
            
            canvas.width = parseInt(paintStyle.getPropertyValue("width"))
            canvas.height = parseInt(paintStyle.getPropertyValue("height"))
    
            cntx.fillStyle = "white";
            cntx.fillRect(0, 0, canvas.width, canvas.height);

            if (this.imageUrl.length > 0){
                let baseImage = new Image();
                baseImage.src = this.imageUrl;
                baseImage.onload = function(){
                    cntx.drawImage(baseImage, canvas.width/2, 0);
                }  
            }
            var mouse = {x: 0, y: 0}
            canvas.addEventListener('mousemove', function(e){
                mouse.x = e.layerX
                mouse.y = e.layerY  
            }, false)
        
            // window.addEventListener('click', function(e){
            //     console.log(`mouse: ${mouse.x},${mouse.y}; offset: ${painting.offsetLeft},${painting.offsetTop},`);
            // })

            cntx.lineWidth = 5
            cntx.lineJoin = 'round'
            cntx.lineCap = 'round'

            canvas.addEventListener('mousedown', function(e) {
                cntx.beginPath()
                cntx.moveTo(mouse.x,mouse.y)
                canvas.addEventListener('mousemove',onPaint, false)
            }, false)

            canvas.addEventListener('mouseup', function() {
                canvas.removeEventListener('mousemove', onPaint, false)
            })

            var onPaint = function(){
                cntx.lineTo(mouse.x, mouse.y)
                cntx.stroke()
            }
        }
    }
}

</script>

<style>
    #myCanvas {
        cursor:crosshair;
    }
    #painting {
        width: 100%;
        height: 400px;
    }
</style>