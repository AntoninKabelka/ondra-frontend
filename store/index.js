export const state = () => ({
    counter: 11,
    step: 1,
    userId: '',
    version: '',
})
  
  export const mutations = {
    increment(state) {
      state.counter++
    },
    incrementStep(state) {
        state.step++
    },
    resetStep(state) {
        state.step = 1
    },
    setUserId(state, userId){
      state.userId = userId
    },
    setVersion(state, version) {
        state.version = version
    },
    resetState(state){
        state.counter = 1,
        state.stpe = 1,
        state.userId = '',
        state.version = ''
    }
}
