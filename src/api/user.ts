import { get, post, put, del } from '@/utils/request'

interface User {
  id?: number
  username: string
  password?: string
  nickname: string
  email?: string
  phone?: string
  avatar?: string
  gender?: number
  status?: number
  deptId?: number
}

interface PageResult<T> {
  code: number
  message: string
  data: {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
  }
}

// 分页查询用户
export function getUserPage(page: number, limit: number, username?: string, status?: number) {
  return get<PageResult<User>>('/api/user/page', { page, limit, username, status })
}

// 根据ID查询用户
export function getUserById(id: number) {
  return get<{ code: number; message: string; data: User }>(`/api/user/${id}`)
}

// 新增用户
export function addUser(data: User) {
  return post<{ code: number; message: string }>('/api/user', data)
}

// 更新用户
export function updateUser(data: User) {
  return put<{ code: number; message: string }>('/api/user', data)
}

// 删除用户
export function deleteUser(id: number) {
  return del<{ code: number; message: string }>(`/api/user/${id}`)
}

// 批量删除用户
export function batchDeleteUser(ids: number[]) {
  return del<{ code: number; message: string }>('/api/user/batch', { data: ids })
}
