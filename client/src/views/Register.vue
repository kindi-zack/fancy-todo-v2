<template>
  <section class="ftco-section">
		<div class="container">
			<!-- <div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Login #07</h2>
				</div>
			</div> -->
			<div class="row justify-content-center">
				<div class="col-md-12 col-lg-10">
					<div class="wrap d-md-flex">
						<div class="bg-primary text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-first">
							<div class="text w-100">
								<h2>Welcome to Register</h2>
								<p>Already have an account?</p>
								<a @click.prevent="changeDisplayRegister" href="#" class="btn btn-white btn-outline-white">Sign In</a>
						    </div>
			            </div>
						<div class="login-wrap p-4 p-lg-5">
			      	    <div class="d-flex">
			      	    	<div class="w-100">
			      	    		<h3 class="mb-4">Sign Up</h3>
			      	    	</div>
			      	    </div>
                          
						<form @submit.prevent='register' action="#" class="signin-form">
			      			<div class="form-group mb-3">
			      				<label class="label" for="name">Email</label>
			      				<input v-model="regEmail"  type="text" class="form-control" placeholder="email@mail.com" required>
			      			</div>
		            		<div class="form-group mb-3">
		            			<label class="label" for="password">Password</label>
		            		  	<input v-model="regPswd" type="password" class="form-control" placeholder="Password" required>
		            		</div>
		            		<div class="form-group">
		            			<button type="submit" class="form-control btn btn-primary submit px-3">Sign Up</button>
		            		</div>
		          		</form>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
	props: ['changeDisplayRegister', 'baseUrl'],
	data () {
		return {
			regEmail: '',
			regPswd: ''
		}
	},
	methods: {
		register(){
			axios({
				method: 'POST',
				url: `${this.baseUrl}register`,
				data: {
					email: this.regEmail,
					password: this.regPswd
				}
			})
			.then(({data})=>{
				// console.log(data)
				swal.fire(
					'Register is Success',
					'',
					'success'
				)
			})
			.then(_=>{
				this.regEmail = ''
				this.regPswd = ''
				this.changeDisplayRegister()
			})
			.catch(err=>{
				console.log(err.response)
				if(err.response.data[0] === 'email must be unique')
				swal.fire(
					'Email is Already Taken',
					'Try Again',
					'error'
				)
				// console.log(err.response.data)
			})
		}
	},
}
</script>
    
<style>
	section {
		border: 1px solid;
		height: 100vh;
	}
</style>