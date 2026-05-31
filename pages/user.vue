<template>
  <div class="user-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="font-display">用户管理</h1>
      <p class="text-muted">管理系统用户账户</p>
    </div>

    <!-- 搜索栏 -->
    <div class="card search-card">
      <div class="search-form">
        <div class="search-item">
          <label class="search-label">用户名</label>
          <UInput 
            v-model="queryParams.username" 
            placeholder="请输入用户名" 
            class="search-input"
          />
        </div>
        <div class="search-item">
          <label class="search-label">状态</label>
          <USelect 
            v-model="queryParams.status" 
            :items="statusOptions" 
            placeholder="请选择状态"
            class="search-input"
            clearable
          />
        </div>
        <div class="search-actions">
          <UButton color="primary" @click="handleQuery">查询</UButton>
          <UButton variant="soft" @click="handleReset">重置</UButton>
        </div>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="actions-bar">
      <UButton color="primary" @click="handleAdd">
        <template #leading>
          <UIcon name="i-ph-plus" />
        </template>
        新增
      </UButton>
      <UButton 
        color="error" 
        @click="handleBatchDelete" 
        :disabled="selectedRows.length === 0"
      >
        <template #leading>
          <UIcon name="i-ph-trash" />
        </template>
        批量删除
      </UButton>
    </div>

    <!-- 数据表格 -->
    <div class="card table-card">
      <UTable 
        :data="tableData" 
        :columns="columns" 
        :loading="loading"
        v-model:selection="selectedRows"
        class="user-table"
      >
        <template #gender="{ row }">
          <UBadge 
            :color="row.gender === 1 ? 'primary' : row.gender === 2 ? 'error' : 'neutral'"
            variant="subtle"
          >
            {{ row.gender === 1 ? '男' : row.gender === 2 ? '女' : '未知' }}
          </UBadge>
        </template>
        
        <template #status="{ row }">
          <UBadge 
            :color="row.status === 1 ? 'success' : 'error'"
            variant="subtle"
          >
            {{ row.status === 1 ? '启用' : '禁用' }}
          </UBadge>
        </template>

        <template #actions="{ row }">
          <div class="action-buttons">
            <UButton variant="ghost" size="sm" @click="handleEdit(row)">
              <UIcon name="i-ph-pencil" />
              编辑
            </UButton>
            <UButton variant="ghost" size="sm" color="error" @click="handleDelete(row)">
              <UIcon name="i-ph-trash" />
              删除
            </UButton>
          </div>
        </template>
      </UTable>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <UPagination 
          v-model:page="queryParams.page" 
          v-model:page-size="queryParams.limit"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          @update:page-size="handleQuery"
        />
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <UModal v-model:open="dialogVisible" :title="dialogTitle" size="lg">
      <div class="dialog-content">
        <div class="form-grid">
          <div class="form-item">
            <label class="form-label">用户名 <span class="required">*</span></label>
            <UInput 
              v-model="form.username" 
              placeholder="请输入用户名"
              :disabled="!!form.id"
            />
          </div>
          <div class="form-item">
            <label class="form-label">昵称 <span class="required">*</span></label>
            <UInput v-model="form.nickname" placeholder="请输入昵称" />
          </div>
          <div class="form-item">
            <label class="form-label">邮箱</label>
            <UInput v-model="form.email" placeholder="请输入邮箱" />
          </div>
          <div class="form-item">
            <label class="form-label">手机号</label>
            <UInput v-model="form.phone" placeholder="请输入手机号" />
          </div>
          <div class="form-item">
            <label class="form-label">性别</label>
            <URadioGroup v-model="form.gender" :items="genderOptions" />
          </div>
          <div class="form-item">
            <label class="form-label">状态</label>
            <URadioGroup v-model="form.status" :items="statusRadioOptions" />
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <UButton variant="soft" @click="dialogVisible = false">取消</UButton>
          <UButton color="primary" @click="handleSubmit">确定</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { User } from '~/composables/useUserApi'

definePageMeta({
  layout: 'default'
})

// 状态
const loading = ref(false)
const tableData = ref<User[]>([])
const total = ref(0)
const selectedRows = ref<User[]>([])
const dialogVisible = ref(false)
const dialogTitle = ref('')

// 查询参数
const queryParams = reactive({
  page: 1,
  limit: 10,
  username: '',
  status: null as number | null
})

// 表单
const form = reactive<User>({
  id: undefined,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  gender: 0,
  status: 1
})

// 选项
const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

const statusRadioOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '未知', value: 0 }
]

// 表格列
const columns = [
  { type: 'selection', width: 55 },
  { key: 'id', label: 'ID', width: 80 },
  { key: 'username', label: '用户名' },
  { key: 'nickname', label: '昵称' },
  { key: 'email', label: '邮箱' },
  { key: 'phone', label: '手机号' },
  { key: 'gender', label: '性别', width: 80 },
  { key: 'status', label: '状态', width: 80 },
  { key: 'createTime', label: '创建时间', width: 180 },
  { key: 'actions', label: '操作', width: 180, fixed: 'right' }
]

// 查询
const handleQuery = async () => {
  loading.value = true
  try {
    const res = await getUserPage(
      queryParams.page, 
      queryParams.limit, 
      queryParams.username || undefined, 
      queryParams.status ?? undefined
    )
    tableData.value = res.data.records
    total.value = res.data.total
  } catch (error) {
    console.error('查询失败:', error)
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  queryParams.username = ''
  queryParams.status = null
  queryParams.page = 1
  handleQuery()
}

// 新增
const handleAdd = () => {
  dialogTitle.value = '新增用户'
  Object.assign(form, {
    id: undefined,
    username: '',
    nickname: '',
    email: '',
    phone: '',
    gender: 0,
    status: 1
  })
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row: User) => {
  dialogTitle.value = '编辑用户'
  Object.assign(form, row)
  dialogVisible.value = true
}

// 提交
const handleSubmit = async () => {
  try {
    if (form.id) {
      await updateUser(form)
      useToast().add({ title: '更新成功', color: 'success' })
    } else {
      await addUser(form)
      useToast().add({ title: '新增成功', color: 'success' })
    }
    dialogVisible.value = false
    handleQuery()
  } catch (error: any) {
    useToast().add({ title: error.message || '操作失败', color: 'error' })
  }
}

// 删除
const handleDelete = async (row: User) => {
  try {
    await useConfirm().confirm('确定要删除该用户吗？', '提示')
    await deleteUser(row.id!)
    useToast().add({ title: '删除成功', color: 'success' })
    handleQuery()
  } catch (error: any) {
    if (error.message !== 'cancel') {
      useToast().add({ title: error.message || '删除失败', color: 'error' })
    }
  }
}

// 批量删除
const handleBatchDelete = async () => {
  try {
    await useConfirm().confirm(`确定要删除选中的 ${selectedRows.value.length} 个用户吗？`, '提示')
    const ids = selectedRows.value.map(item => item.id!)
    await batchDeleteUser(ids)
    useToast().add({ title: '批量删除成功', color: 'success' })
    handleQuery()
  } catch (error: any) {
    if (error.message !== 'cancel') {
      useToast().add({ title: error.message || '批量删除失败', color: 'error' })
    }
  }
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped>
.user-page {
  padding-bottom: 64px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.search-card {
  margin-bottom: 24px;
  border-radius: 20px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-end;
}

.search-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.search-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.search-actions {
  display: flex;
  gap: 12px;
}

.actions-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.table-card {
  border-radius: 20px;
  overflow: hidden;
}

.user-table {
  border-radius: 20px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px 0 8px;
}

.dialog-content {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.required {
  color: #dc2626;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  
  .search-item {
    width: 100%;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>