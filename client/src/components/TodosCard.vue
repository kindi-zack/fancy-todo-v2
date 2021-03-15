<template>
<div id="board" class="row d-flex justify-content-center">
  <div class="col-sm-12 col-md-6 col-lg-3"  v-for="todo in todos" :key="todo.id">
    <div class="card">
        <div class="card-header">
          <h5 class="card-title">{{todo.title}}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">{{todo.description}}</p>
          <p class="card-text">{{todo.status}}</p>
          <p class="card-text">{{todo.due_date}}</p>
          <a href="#" class="btn btn-primary">Edit</a>
          <a href="#" @click.prevent="deleteTodo(todo.id)" class="btn btn-primary">Delete</a><br>
          <div style="text-align: right; margin: 0">
          <small>Created by. <br> {{todo.User.email}}</small>
          </div>
        </div>
        <!-- {{todos}} -->
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    props:['baseUrl', 'todos', 'getTodos'],
    data (){
        return {
            
        }
    },
    methods: {
      deleteTodo(id){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios({
              url: `${this.baseUrl}todos/${id}`,
              method: 'DELETE',
              headers: {
                token: localStorage.access_token
              }
            })
            .then(({data})=>{
              Swal.fire(
                  'Good job!',
                  data.msg,
                  'success'
              )
              this.getTodos()
            })
            .catch(err=>{
              console.log(err.response)
              Swal.fire(
                'Error',
                err.response.data.msg,
                'error'
              )
            })
          }
        })
      }
    }
       
}
</script>

<style>
    #board{
        margin-top: 20px
    }
</style>