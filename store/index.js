export const state = () => ({
    counter: 1,
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
