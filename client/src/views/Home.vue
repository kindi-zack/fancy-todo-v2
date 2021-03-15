<template>
    <div>
        <Navbar
        :changeIsLogin="changeIsLogin">
        </Navbar>

        <div style="text-align: center; margin-top:10px" v-if="showCreate">
            <h1 @click.prevent="showCreateForm(false)" class='btn btn-primary'>Create Todo</h1>
        </div>
         <div style="text-align: center; margin-top:10px" v-if="!showCreate">
            <h1 @click.prevent="showCreateForm(true)" class='btn btn-primary'>Show Todo</h1>
        </div>

        <CreateForm
        :getTodos="getTodos"
        :showCreateForm="showCreateForm"
        :baseUrl="baseUrl"
        v-if="!showCreate">
        </CreateForm>

        <Todos
        :getTodos="getTodos"
        :baseUrl="baseUrl"
        :todos="todos"
        v-if="showCreate">
        </Todos>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import CreateForm from '../components/CreateForm'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Todos from '../components/TodosCard'
export default {
    data(){
        return {
            todos: '',
            // todoTitle: '',
            // todoDesc: '',
            // todoDate: '',
            // todoStatus: '',
            showCreate: true
        }
    },
    components: {
        Todos,
        Navbar,
        CreateForm
    },
    props:['baseUrl', 'changeIsLogin'],
    methods: {
         getTodos(){
            axios({
                method: 'GET',
                url: `${this.baseUrl}todos`,
                headers: {
                    token: localStorage.access_token
                }
            })
            .then(({data})=>{
                // console.log(data)
                this.todos = data
            })
            .catch(err=>{
                console.log(err.response.data)
            })
        },

        showCreateForm(val){
            /*
            Swal.fire({
                title: 'Create Todo',
                html: `
                    <input type="text" id="title" class="swal2-input" placeholder="Title">
                    <input type="text" id="description" class="swal2-input" placeholder="Description">
                    <input type="text" id="status" class="swal2-input" placeholder="status">
                    <input type="date" id="due_date" class="swal2-input" placeholder="Date">
                    `,
        
                }).then((result) => {
                    console.log(result)
                Swal.fire(
                    result
                )
            })
            */

           this.showCreate = val
        },

    },
    created(){
        this.getTodos()
    }
}
</script>

<style>

</style>