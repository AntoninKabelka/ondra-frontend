<template>
    <validation-observer
    ref="observer"
    v-slot="{ invalid }">
    <form @submit.prevent="submit">
        <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:35">
            <v-text-field
            v-model="name"
            :counter="35"
            :error-messages="errors"
            label="Jméno"
            required />
        </validation-provider>
        <v-select
        v-model="select"
        :items="gender"
        :error-messages="errors"
        label="Pohlaví"
        data-vv-name="select"
        required />
        <v-text-field
        v-model="age"
        :error-messages="errors"
        label="Věk"
        required />
        <v-slider
        v-model="skill"
        color="blue"
        label="Zručnost s počítačem"
        hint="1 = nejsem zručný, 10 = ovládám perfektně"
        min="1"
        max="10"
        thumb-label />
        <v-btn
		color="secondary"
			elevation="9"
			large
			x-large
        class="mr-4"
        type="submit"
        :disabled="invalid">
        Začít test
        </v-btn>
    </form>
  </validation-observer>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
        errors: [],
      name: '',
      skill: '',
      age: '',
      select: '',
      gender: [
        'Muž',
        'Žena',
      ],
      checkbox: null,
    }),

    methods: {
      async submit () {
        this.$refs.observer.validate()

        let res = await this.$axios.post('http://localhost:5000/api/v1/test', {
            name: this.name,
            version: this.$store.state.version,
            skill: this.skill,
            gender: this.select,
            age: this.age
        })
        console.log(res.data.test_id)
        let userId = res.data.test_id
        this.$store.commit('setUserId', userId)
        this.$forceUpdate()
      },
    },
  }
</script>
