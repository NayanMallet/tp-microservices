import { http } from './http'
import type { User } from '@/types/user'

const API_GATEWAY_BASE_URL = 'http://localhost:3000'
const USER_SERVICE_BASE_URL = 'http://localhost:3002'

export async function fetchUsers(): Promise<User[]> {
  return http.get<User[]>(`${API_GATEWAY_BASE_URL}/api/users`)
}

export async function createUser(payload: { name: string; email: string }): Promise<User> {
  return http.post<User>(`${USER_SERVICE_BASE_URL}/users`, payload)
}
