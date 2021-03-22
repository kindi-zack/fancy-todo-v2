<template>
  <div class="card">
      <form @submit.prevent="update(editTemp.id)" action="#" class="">
		<div class="form-group mb-3">
			<label class="label" for="title">Title</label>
			<input type="text" v-model="editTemp.title"  class="form-control" placeholder="todo title" >
		</div>
		<div class="form-group mb-3">
			<label class="label" for="description">Description</label>
		    <input type="text" v-model="editTemp.description" class="form-control" placeholder="todo description" required>
		</div>
        <div class="form-group mb-3">
		    <label class="label" for="status">Status</label>
		    <!-- <input type="text" v-model="editTemp.status" class="form-control" placeholder="todo Status" > -->
                <!-- <label for="exampleFormControlSelect1">Example select</label> -->
            <select v-model="editTemp.status" class="form-control" id="exampleFormControlSelect1">
              <option>false</option>
              <option>true</option>
            </select>
		</div>
        <div class="form-group mb-3">
			<label class="label" for="due_date">Date</label>
		    <input type="date" v-model="editTemp.due_date" class="form-control" placeholder="todo date" required>
		</div>
		<div class="form-group">
			<button type="submit" class="form-control btn btn-primary submit px-3">Update</button>
		</div>
	</form>
    <!-- <h1>{{editTemp.due_date}}</h1> -->
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    props: ['editTemp', 'baseUrl', 'getTodos'],
    data() {
        return {
            // editId : this.editTemp.id,
            // editTitle : this.editTemp.title,
            // editDesc : this.editTemp.description,
            // editStatus: this.editTemp.status,
            // editDate: this.editTemp.due_date
        }
    },
    methods: {
        update(id){
            axios({
                url: `${this.baseUrl}todos/${id}`,
                method: 'PATCH',
                headers: {
                    token: localStorage.access_token
                },
                data: {
                    title: this.editTemp.title,
                    description: this.editTemp.description,
                    status: this.editTemp.status,
                    due_date: this.editTemp.due_date
                }
            })
            .then(({data})=>{
                console.log(data)
                Swal.fire(
                    'Updated Success',
                    '',
                    'success'
                )
                this.getTodos()

                this.editTemp.title = ''
                this.editTemp.description = ''
                this.editTemp.status = ''
                this.editTemp.due_date = ''
            })
            .catch(err=>{
                console.log(err.response.data)
                let errors = err.response.data

                if(Array.isArray(errors)){
                    Swal.fire(
                        errors[0],
                        '',
                        'error'
                    )
                }else{
                    Swal.fire(
                        errors.msg,
                        '',
                        'error'
                    )
                }
                
            })
        }
    }
}
</script>

<style>

</style>