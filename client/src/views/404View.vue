<script setup lang="ts">
import Header from "@/components/Header.vue"

if (!window.location.href.endsWith("/404")) window.location.href="/404"
</script>

<template>
    <Header/>
    <main>
        <img src="../assets/img/undraw_page_not_found.svg">
        <h1>Page not found</h1>
    </main>
</template>

<style>
main {
    flex-direction: column;
}

h1 {
    margin-top: 30px;
}
</style>