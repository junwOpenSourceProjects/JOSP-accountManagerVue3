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

const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL || '/api'

  const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    params?: any
  ): Promise<T> => {
    const token = process.client ? localStorage.getItem('token') : null
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    let queryString = ''
    if (params) {
      queryString = '?' + new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null).map(([k, v]) => [k, String(v)])
      ).toString()
    }

    const response = await fetch(`${baseURL}${url}${queryString}`, options)
    const result = await response.json()

    if (result.code === 200 || result.code === 0) {
      return result as T
    } else {
      throw new Error(result.message || result.msg || '请求失败')
    }
  }

  return {
    get: <T>(url: string, params?: any) => request<T>('GET', url, undefined, params),
    post: <T>(url: string, data?: any) => request<T>('POST', url, data),
    put: <T>(url: string, data?: any) => request<T>('PUT', url, data),
    del: <T>(url: string, data?: any) => request<T>('DELETE', url, data)
  }
}

// 分页查询用户
export const getUserPage = (page: number, limit: number, username?: string, status?: number) => {
  return useApi().get<PageResult<User>>('/api/user/page', { page, limit, username, status })
}

// 根据ID查询用户
export const getUserById = (id: number) => {
  return useApi().get<{ code: number; message: string; data: User }>(`/api/user/${id}`)
}

// 新增用户
export const addUser = (data: User) => {
  return useApi().post<{ code: number; message: string }>('/api/user', data)
}

// 更新用户
export const updateUser = (data: User) => {
  return useApi().put<{ code: number; message: string }>('/api/user', data)
}

// 删除用户
export const deleteUser = (id: number) => {
  return useApi().del<{ code: number; message: string }>(`/api/user/${id}`)
}

// 批量删除用户
export const batchDeleteUser = (ids: number[]) => {
  return useApi().del<{ code: number; message: string }>('/api/user/batch', { data: ids })
}

export type { User, PageResult }