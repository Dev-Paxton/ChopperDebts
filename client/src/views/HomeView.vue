<script setup lang="ts">
import Header from "@/components/Header.vue"
import axios from "axios";
import { ref } from "vue";
import { marked } from "marked"


const readme = ref()

axios.get("https://raw.githubusercontent.com/DevGoro/ChopperDebts/main/README.md").then( response => {
    response.data = response.data.replace("./client", "./")
    readme.value = marked(response.data)
})
</script>

<template>
    <Header/>
    <main>
        <div v-html="readme"></div>
    </main>
</template>