<script setup lang="ts">
import Header from '@/components/Header.vue';
import TransferModal from "@/components/TransferModal.vue"
import { API } from '@/utils/api';
import { ref } from 'vue';
const claim = ref('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>')
const debt =  ref('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>')

API.get("/transfers/debts").then( res => {
    let debtAmount: number = 0
    res.data.forEach((d:any) => {
        debtAmount += d.amount
    })
    debt.value = debtAmount.toString() + " €"
})

API.get("/transfers/claims").then( res => {
    let claimAmount: number = 0
    res.data.forEach((c:any) => {
        claimAmount += c.amount
    })
    claim.value = claimAmount.toString() + " €"
})
</script>

<template>
    <TransferModal :mode="'add'" />
    <Header />
    <main>
        <div class="balanceWrapper">
            <div class="btn btn-info">Claim: <div v-html="claim"></div></div>
            <div class="btn btn-danger">Debt: <div v-html="debt"></div></div>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#transferModal">Add</button>
        </div>
    </main>
</template>

<style>
main div.balanceWrapper div.btn,
main div.balanceWrapper button.btn {
    display: inline-block;
    margin: 0 5px;
    height: 70px;
    width: 70px;
}
</style>