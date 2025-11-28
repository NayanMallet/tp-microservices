import { http } from './http'
import type { Item } from '@/types/item'
import { apiEndpoints } from '@/config/api'

export async function fetchItems(): Promise<Item[]> {
  return http.get<Item[]>(apiEndpoints.items.list)
}

export async function createItem(payload: { name: string }): Promise<Item> {
  return http.post<Item>(apiEndpoints.items.create, payload)
}
