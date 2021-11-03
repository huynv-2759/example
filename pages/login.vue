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
                <p class="text-muted">Đăng nhập với tài khoản</p>
                <b-input-group class="mb-3">
                  <input type="text" class=" form-control" v-model="phone"
                         placeholder="Số điện thoại">
                </b-input-group>

                <b-input-group class="mb-4">
                  <input type="password" class="form-control" v-model="password" placeholder="Mật khẩu">
                </b-input-group>

                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" @click="login">Đăng nhập</b-button>
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
    middleware: ['auth'],
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
      async login() {
        try {
          const response = await this.$axios.post('login-user', {
            phone: this.phone,
            password: this.password
          })
          console.log(response.data)
          if(response.data.status === 0){
            this.error = response.data.message
          }else{
            await this.$auth.setToken('local', "Bearer" + response.data.data.token);
            await this.$auth.setRefreshToken('local', response.data.data.token);
            await this.$auth.setUserToken(response.data.data.token);
            this.$store.dispatch('changeAuthenticated');
            // console.log(this.$store.getters.isAuthenticated)
            this.$router.push('/todo')
          }

        } catch (e) {
          this.error = e
        }
      }
    }
  }
</script>
