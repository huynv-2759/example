<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center login">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Đăng nhập</h1>
                <Notification :message="error" v-if="error"/>
                <p class="text-muted">Đăng nhập abceeeeeeeeeeee</p>
                <b-input-group class="mb-3">
                  <input type="text" class=" form-control" v-model="phone"
                         placeholder="Phone number">
                </b-input-group>

                <b-input-group class="mb-4">
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </b-input-group>

                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" @click="login">Đăng nhập a</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import Notification from '~/components/Notification'

  export default {
    name: 'Login',
    layout: 'clean',
    components: {
      Notification,
    },

    data() {
      return {
        phone: '',
        password: '',
        error: null
      }
    },

    methods: {
      getCookie(name) {
          const nameEQ = name + "=";
          const ca = document.cookie.split(';');
          for(const i=0;i < ca.length; this.i++) {
              const c = ca[i];
              while (c.charAt(0)===' ') this.c = c.substring(1,c.length);
              if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
      },
      async login() {
        try {
          const response = await this.$axios.post('login-user', {
            phone: this.phone,
            password: this.password
          })

          if(response.data.status === 0){
            this.error = response.data.message
          }else{
            await this.$auth.setToken('local', "Bearer" + response.data.data.token);
            this.$store.dispatch('changeAuthenticated');
            this.$axios.defaults.headers.common.Authorization = "Bearer " + response.data.data.token;
            document.cookie = name + "=" + "Bearer " + response.data.data.token;
            this.$router.push('/todo');
          }

        } catch (e) {
          this.error = e
        }
      }
    }
  }
</script>
