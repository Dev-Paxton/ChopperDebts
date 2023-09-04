<script setup lang="ts">
import Header from '@/components/Header.vue';
import TransferModal from "@/components/TransferModal.vue"
import { API } from '@/utils/api';
import { ref } from 'vue';
import {Modal} from "bootstrap"

const transfers = ref<any>(null)
API.get("/transfers").then( res => {
    transfers.value = res.data
})

function editTransfer(e: Event) {
    const target = e.target as HTMLButtonElement
    const liElement = target.parentElement?.parentElement as HTMLLIElement
    const modal = new Modal(`#${liElement.getAttribute("mongoID")}`)
    modal.show()
}

function deleteTransfer(e: Event) {
    const target = e.target as HTMLButtonElement
    const liElement = target.parentElement?.parentElement as HTMLLIElement
    liElement.style.display = "hidden"
    API.delete("/transfers/delete", {
        data: {
            id: liElement.getAttribute("mongoID")
        }   
    })
}
</script>

<template>
    <TransferModal :mode="'edit'" v-for="transfer in transfers" :id="transfer._id" :type="transfer.type" :person="transfer.person" :amount="String(transfer.amount)" :description="transfer.description" />
    <Header />

    <ul class="list-group">
        <li v-for="transfer in transfers" :key="transfer.created" :mongoID="transfer._id" :type="transfer.type" :person="transfer.person" :amount="transfer.amount" :description="transfer.description" class="list-group-item">
            <span v-if="transfer.type === 'debt'" class="badge bg-danger">Debt</span>
            <span v-if="transfer.type === 'claim'" class="badge bg-success">Claim</span>
            
            Person: {{ transfer.person }} | 
            Amount: {{ transfer.amount }} | 
            Created: {{ new Date(transfer.created).toString() }} | 
            Last edit: {{ new Date(transfer.lastEdit).toString() }}
            
            <div v-if="transfer.description">Description: {{ transfer.description }}</div>
            
            <div class="editWrapper">
                <button @click="editTransfer" type="button" class="btn btn-primary btn-sm">✏️</button>
                <button @click="deleteTransfer" type="button" class="btn btn-danger btn-sm">🗑️</button>
            </div>
        </li>
    </ul>
</template>

<style>
.editWrapper {
    position: absolute;
    right: 5px;
    top: 5px;
}

.editWrapper button {
    opacity: 0;
    margin: 0 5px;
}

li:hover .editWrapper button {
    opacity: 1;
}
</style>