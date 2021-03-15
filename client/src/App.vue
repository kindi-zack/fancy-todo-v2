<template >
  <div id='main' class="bg-secondary">
      <Login 
      :baseUrl="baseUrl"
      v-if="!isLogin"
      :changeIsLogin="changeIsLogin"
      :changeDisplayLogin="changeDisplayLogin"
      :class="displayLogin"
      >
      </Login>

      <Register 
      :class="displayRegsiter"
      :changeDisplayRegister="changeDisplayRegister"
      :baseUrl="baseUrl"
      v-if="!isLogin">
      </Register>

      <Home
      v-if="isLogin"
      :baseUrl="baseUrl"
      :changeIsLogin="changeIsLogin"
      >
      </Home>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
import Home from '../src/views/Home'
import Login from '../src/views/Login'
import Register from '../src/views/Register'
export default {
    data() {
        return {
            isLogin: false,
            message: 'Hello World',
            baseUrl: 'http://localhost:7000/',
            displayLogin: '',
            displayRegsiter: 'd-none'
        }
    },
    components: {
        Login,
        Register,
        Home
    },
    methods: {
        changeIsLogin(value){
            this.isLogin = value
        },

        changeDisplayLogin(){
            this.displayLogin = 'd-none'
            this.displayRegsiter = ''
        },

        changeDisplayRegister(){
            this.displayLogin = ''
            this.displayRegsiter = 'd-none'
        }
    },
    created(){
        if(localStorage.access_token){
            this.isLogin = true
        }
    }
}
</script>

<style>
    #main{
        min-height: 100vh
    }
</style>