import { http } from './http'
import type { Item } from '@/types/item'

const API_GATEWAY_BASE_URL = 'http://localhost:3000'
const ITEM_SERVICE_BASE_URL = 'http://localhost:3003'

export async function fetchItems(): Promise<Item[]> {
  return http.get<Item[]>(`${API_GATEWAY_BASE_URL}/api/items`)
}

export async function createItem(payload: { name: string }): Promise<Item> {
  return http.post<Item>(`${ITEM_SERVICE_BASE_URL}/items`, payload)
}
