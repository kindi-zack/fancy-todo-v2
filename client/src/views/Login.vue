<template>
  <section class="ftco-section bg-secondary">
		<div class="container mx-auto">
			<!-- <div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Login #07</h2>
				</div>
			</div> -->
			<div class="row justify-content-center">
				<div class="col-md-12 col-lg-10">
					<div class="wrap d-md-flex">
						<div class="bg-primary text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div class="text w-100">
								<h2>Welcome to login</h2>
								<p>Don't have an account?</p>
								<a @click.prevent="changeDisplayLogin" href="#" class="btn btn-white btn-outline-white">Sign Up</a>
						    </div>
			            </div>
						<div class="login-wrap p-4 p-lg-5">
			      	    <div class="d-flex">
			      	    	<div class="w-100">
			      	    		<h3 class="mb-4">Sign In</h3>
			      	    	</div>
					    	<div class="w-100">
					    		<p class="social-media d-flex justify-content-end">
					    			<a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-facebook"></span></a>
					    			<a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-twitter"></span></a>
					    		</p>
					    	</div>
			      	    </div>
                          
						<form @submit.prevent='login' action="#" class="signin-form">
			      			<div class="form-group mb-3">
			      				<label class="label" for="name">Email</label>
			      				<input type="text" v-model="loginEmail" class="form-control" placeholder="email@mail.com" required>
			      			</div>
		            		<div class="form-group mb-3">
		            			<label class="label" for="password">Password</label>
		            		  <input type="password" v-model="loginPswd" class="form-control" placeholder="Password" required>
		            		</div>
		            		<div class="form-group">
		            			<button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
		            		</div>
		            		<!-- <div class="form-group d-md-flex"> -->
		            			<!-- <div class="w-50 text-left">
			        		    	<label class="checkbox-wrap checkbox-primary mb-0">Remember Me
											  <input type="checkbox" checked>
											  <span class="checkmark"></span>
									</label>
								</div> -->
								<!-- <div class="w-50 text-md-right">
									<a href="#">Forgot Password</a>
								</div> -->
		            		<!-- </div> -->
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
import Swal from 'sweetalert2'
export default {
	components: {
		
	},
	data() {
		return {
			loginEmail : '',
			loginPswd : '',
		}
	},
	props: ['baseUrl', 'changeIsLogin', 'changeDisplayLogin'],
	methods : {
		login(){
			axios({
				method: 'POST',
				url: `${this.baseUrl}login`,
				data: {
					email : this.loginEmail,
					password: this.loginPswd
				}
			})
			.then(({data})=>{
				// console.log(data)
				localStorage.setItem('access_token', data.access_token)
				this.changeIsLogin(true)
			})
			.catch(err=>{
				Swal.fire(
					err.response.data.msg,
					'Try Again',
					'error'
				)
			})
		}
	}
}
</script>
    
<style>
	.container {
		/* border: 1px solid; */
		height: 100vh;
	}
</style>