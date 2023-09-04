<script setup lang="ts">
import { API } from '@/utils/api';
import { ref, toRef, watch } from 'vue';

const props = defineProps<{
    mode: "add" | "edit"
    id?: string
    type?: string
    person?: string
    amount?: string
    description?: string
}>()

const error = ref("")
const mode = toRef(props.mode)
const id = toRef(props.id)
const type = toRef(props.type)
const person = toRef(props.person)
const amount = toRef(props.amount)
const description = toRef(props.description)

if (!id.value) {
  id.value = "transferModal"
}

function validateAmount() {
    const amountInt = parseInt(amount.value as string)
    if (Number.isNaN(amountInt)) {
        error.value = "Amount must be a number"
        return false
    }
    
    error.value = ""
    return true
}

function submitTransfer(e:any) {
    if (!validateAmount()) return

    if(mode.value === "add") {
        API.post("/transfers/add", {
            type: type.value,
            person: person.value,
            amount: parseInt(amount.value as string),
            description: description.value
        })

        type.value = ""
        person.value = ""
        amount.value = ""
        description.value = ""
    } else if (mode.value === "edit") {
        API.post("/transfers/edit", {
            id: id.value,
            type: type.value,
            person: person.value,
            amount: parseInt(amount.value as string),
            description: description.value
        })
    }
}

watch(amount, (newAmount) => {
    validateAmount()
})
</script>

<template>
<div class="modal fade" :id="id" tabindex="-1" aria-labelledby="transferModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">{{ mode.charAt(0).toUpperCase() + mode.slice(1) }} Transfer</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">Type</label>
            <select v-model="type" class="form-select" id="inputGroupSelect01">
                <option value="claim">Claim</option>
                <option value="debt">Debt</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input v-model="person" type="text" class="form-control" placeholder="Person" aria-label="Person">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">€</span>
            <input v-model="amount" type="text" class="form-control" placeholder="Amount" aria-label="Amount">
        </div>

        <div class="input-group">
            <span class="input-group-text">Description</span>
            <textarea v-model="description" class="form-control" aria-label="With textarea"></textarea>
        </div>

        <div v-if="error" style="color: red;"> {{ error }}</div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="submitTransfer" type="button" class="btn btn-success">Save</button>
      </div>
    </div>
  </div>
</div>

</template>