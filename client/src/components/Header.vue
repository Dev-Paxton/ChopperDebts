<script setup lang="ts">
import router from '@/router';
import { API } from '@/utils/api';
import { onMounted, ref } from 'vue';

const navUl = ref<HTMLUListElement | null>(null)
const authenticated = ref(window.localStorage.getItem("authenticated"))

const availableRoutes = router.getRoutes().filter(route => {
	if(route.name === "404 Page") return
	if(authenticated.value === "true") return route
	else {
		if(route.name === "Login") {
			return route
		}
	}
})

function logOut() {
	API.post("/auth/logout").then( res => {
		window.localStorage.setItem("authenticated", "false")
		window.location.href="/"
	})
}

onMounted(() => {
  	if(navUl.value) {
    	for (const child of navUl.value.children) {
			if(window.localStorage.getItem("authenticated") === "true") {
				if(child.innerText === "Login") {
					child.children[0].classList.add("disabled")
				}
			}
		}
  	}
})
</script>

<template> 
<nav class="navbar bg-body-tertiary">
  	<div class="container-fluid">
    	<a class="navbar-brand" href="/">
    		<img src="../assets/img/chopper.jpeg" alt="Logo" width="30" class="d-inline-block align-text-top">
      		ChopperDebts
    	</a>

		<div>
			<button v-if="authenticated === 'true'" @click="logOut" class="btn btn-outline-danger me-2" style="height: 40px !important;" type="button">Logout</button>
		
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>

		<div class="collapse navbar-collapse" id="navbarNav">
			<ul ref="navUl" class="navbar-nav">
				<li v-for="route in availableRoutes" class="nav-item">
					<a v-bind:href=route.path class="nav-link" aria-current="page">{{ route.name }}</a>
				</li>
			</ul>
		</div>
  	</div>
</nav>
</template>