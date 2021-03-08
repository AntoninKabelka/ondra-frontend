export const state = () => ({
    counter: 7,
    userId: '',
    
})
  
  export const mutations = {
    increment(state) {
      state.counter++
    },
    setUserId(state, userId){
      state.userId = userId
    }
}
