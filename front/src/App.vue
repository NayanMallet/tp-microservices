<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'

import type { User, Item } from '@/types/api'
import { fetchUsers, createUser } from '@/services/users.service'
import { fetchItems, createItem } from '@/services/items.service'

import UserForm from '@/components/forms/UserForm.vue'
import ItemForm from '@/components/forms/ItemForm.vue'
import UsersList from '@/components/users/UsersList.vue'
import ItemsList from '@/components/items/ItemsList.vue'

const users = ref<User[]>([])
const items = ref<Item[]>([])

const loadingUsers = ref(false)
const loadingItems = ref(false)

async function loadUsers() {
  try {
    loadingUsers.value = true
    users.value = await fetchUsers()
  } catch (err) {
    console.error(err)
    toast('Unable to load users', {
      description: 'Check that the API gateway is running on port 3000.',
    })
  } finally {
    loadingUsers.value = false
  }
}

async function loadItems() {
  try {
    loadingItems.value = true
    items.value = await fetchItems()
  } catch (err) {
    console.error(err)
    toast('Unable to load items', {
      description: 'Check that the API gateway is running on port 3000.',
    })
  } finally {
    loadingItems.value = false
  }
}

async function handleCreateUser(payload: { name: string; email: string }) {
  try {
    await createUser(payload)
    await loadUsers()
  } catch (err) {
    console.error(err)
    toast('Error while creating user', {
      description: 'Check that the user-service is running on port 3002.',
    })
  }
}

async function handleCreateItem(payload: { name: string }) {
  try {
    await createItem(payload)
    await loadItems()
  } catch (err) {
    console.error(err)
    toast('Error while creating item', {
      description: 'Check that the item-service is running on port 3003.',
    })
  }
}

onMounted(() => {
  loadUsers()
  loadItems()
})
</script>

<template>
  <main class="min-h-screen bg-muted/40 text-foreground">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            Microservices Playground
          </h1>
          <p class="text-sm text-muted-foreground sm:text-base">
            Create users and items through your Node microservices and inspect
            what is returned by the API gateway.
          </p>
        </div>
      </header>

      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <UserForm @submit="handleCreateUser" />
          <UsersList
            :users="users"
            :loading="loadingUsers"
            @refresh="loadUsers"
          />
        </div>

        <div class="space-y-4">
          <ItemForm @submit="handleCreateItem" />
          <ItemsList
            :items="items"
            :loading="loadingItems"
            @refresh="loadItems"
          />
        </div>
      </div>
    </div>
  </main>
</template>
