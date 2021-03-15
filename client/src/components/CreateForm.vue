<template>
  <div class="card">
      <form @submit.prevent="createTodo" action="#" class="">
		<div class="form-group mb-3">
			<label class="label" for="title">Title</label>
			<input type="text" v-model="createTitle"  class="form-control" placeholder="todo title" required>
		</div>
		<div class="form-group mb-3">
			<label class="label" for="description">Description</label>
		    <input type="text" v-model="createDesc" class="form-control" placeholder="todo description" required>
		</div>
        <div class="form-group mb-3">
		    <label class="label" for="status">Status</label>
		    <input type="text" v-model="createStatus" class="form-control" placeholder="todo Status" >
		</div>
        <div class="form-group mb-3">
			<label class="label" for="due_date">Date</label>
		    <input type="date" v-model="createDate" class="form-control" placeholder="todo date" required>
		</div>
		<div class="form-group">
			<button type="submit" class="form-control btn btn-primary submit px-3">Create</button>
		</div>
	</form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    props: ['baseUrl', 'showCreateForm', 'getTodos'],
    data() {
        return {
            createTitle: '',
            createDesc: '',
            createDate: '',
            createStatus: '',
        }
    },
    methods: {
        createTodo(){
            
            axios({
                method: 'POST',
                url: `${this.baseUrl}todos`,
                data: {
                    title: this.createTitle,
                    description: this.createDesc,
                    status: this.createStatus,
                    due_date: this.createDate
                },
                headers: {
                    token : localStorage.access_token
                }
            })
            .then(({data})=>{
                // console.log(data)
                Swal.fire(
                    'Good job!',
                    data.msg,
                    'success'
                )
            })
            .catch(err=>{
                // console.log(err.response)
                let errors = err.response.data
        
                console.log(errors)
                Swal.fire(
                    'Error',
                    errors[0],
                    'error'
                )
            })
            .then(_=>{
                this.createTitle= ''
                this.createDesc=''
                this.createDate=''
                this.createStatus=''
                this.getTodos()
                // this.showCreateForm(true)
            })
        }
    }
}
</script>

<style>

</style>