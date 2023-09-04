<script setup lang="ts">
import { API } from '@/utils/api';
import { ref } from 'vue';

const name = ref("")
const password = ref("")
const response = ref("")

function submitCredentials(e: any) {
    e.preventDefault()
    API.post("/auth/login", {
        username: name.value,
        password: password.value
    }).then( res => {
        response.value = res.data.message
        window.localStorage.setItem("authenticated", "true")
        window.location.href="/"
    }).catch( error => {
        response.value = "Invalid credentials"
    })
}
</script>

<template>
<main>
    <div class="card">
        <img src="../assets/img/chopper.jpeg" class="card-img-top">
        
        <form class="card-body" action="http://10.0.3.145:3010/login" method="post">
            <h1 class="card-title">Login</h1>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">👤</span>
                <input v-model="name" name="username" type="text" class="form-control" placeholder="Name" aria-label="username" aria-describedby="addon-wrapping">
            </div>

            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">🔑</span>
                <input v-model="password" name="password" type="password" class="form-control" placeholder="Password" aria-label="password" aria-describedby="addon-wrapping">
            </div>
            
            <p v-if="response" style="color: red;">{{ response }}</p>

            <button @click="submitCredentials" type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</main>
</template>

<style>
main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    width: 300px;
    text-align: center;
}

button {
    margin-top: 10px;
}
</style>