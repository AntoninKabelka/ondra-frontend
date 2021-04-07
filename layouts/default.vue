<template>
  <v-app>
    <v-app-bar
      app
      color="blue"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>Montrealský kognitivní test</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet>
              <nuxt/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
