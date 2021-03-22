<template>
    <div>
        <Navbar
        :changeIsLogin="changeIsLogin">
        </Navbar>

        <div style="text-align: center; margin-top:10px" v-if="showCreate && showEdit">
            <h1 @click.prevent="showCreateForm(false)" class='btn btn-primary'>Create Todo</h1>
        </div>
         <div style="text-align: center; margin-top:10px" v-if="!showCreate || !showEdit">
            <h1 @click.prevent="showCreateForm(true) || showEditForm(true)" class='btn btn-primary'>Show Todo</h1>
        </div>

        <CreateForm
        :getTodos="getTodos"
        :showCreateForm="showCreateForm"
        :baseUrl="baseUrl"
        v-if="!showCreate">
        </CreateForm>

        <EditForm
        :getTodos="getTodos"
        :baseUrl="baseUrl"
        v-if="!showEdit"
        :editTemp="editTemp">
        </EditForm>

        <Todos
        :editTemp="editTemp"
        :getTodos="getTodos"
        :showEditForm="showEditForm"
        :baseUrl="baseUrl"
        :todos="todos"
        v-if="showCreate && showEdit">
        </Todos>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import EditForm from '../components/EditForm'
import CreateForm from '../components/CreateForm'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Todos from '../components/TodosCard'
export default {
    data(){
        return {
            editTemp : '',
            todos: '',
            // todoTitle: '',
            // todoDesc: '',
            // todoDate: '',
            // todoStatus: '',
            showCreate: true,
            showEdit: true,
        }
    },
    components: {
        Todos,
        Navbar,
        CreateForm,
        EditForm
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
                // let dateFormat = data
               let dataTemp = data.map(el=>{
                     let dateFomat = new Date(el.due_date)
                     el.due_date = `${dateFomat.getFullYear()}/${dateFomat.getMonth()+1}/${dateFomat.getDate()}`
                     return el
                })
                // console.log(dataTemp)
                this.todos = data
            })
            .catch(err=>{
                console.log(err.response.data)
            })
        },

        showEditForm(val, id){
            this.showEdit = val

            if(id){
                axios({
                url:`${this.baseUrl}todos/${id}`,
                method: 'get',
                headers: {
                    token: localStorage.access_token
                }
            })
            .then(({data})=>{
                let dateFormat = new Date(data.due_date)
             
                let bulan = `${dateFormat.getMonth()+1}`
                    console.log(bulan.length , '<<<<<<<<<<<<<<<<<<<<<<<<')
                    if(bulan.length === 1) bulan = `0${bulan}`
                let tgl = `${dateFormat.getDate()}`
                    if(tgl.length === 1) tgl = `0${tgl}`
            
                let newDate = `${dateFormat.getFullYear()}-${bulan}-${tgl}`
                data.due_date = newDate
                this.editTemp = data
 

            })
            .catch(err=>{
                console.log(err.response.data)
            })
            }
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