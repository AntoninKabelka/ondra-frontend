<template>
    <div>
        {{ log() }}
        <test-start v-if="this.$store.state.userId == ''"/>
        <test-task v-else/>
    </div>
</template>

<script>
import TestStart from '~/components/TestStart.vue'
import TestTask from '~/components/TestTask.vue'
export default {
    components:{TestStart, TestTask},
    methods: {
        log(){
            console.log("meme" + this.$store.state.userId)
        }
    }
}
</script>
