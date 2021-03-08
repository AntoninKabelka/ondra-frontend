<template>
  <v-card elevation="2">
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
              <v-card color="ligth">
                  <v-container>
                    <h1>Vyplňte údaje</h1>        
                    <test-form/>
                  </v-container>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-card>
</template>

<script>
import TestForm from './TestForm.vue'
export default {
  components: { TestForm },

}
</script>

<style>

</style>