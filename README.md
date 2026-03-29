# JOSP-accountManagerVue3

![Vue](https://img.shields.io/badge/Vue-3.5.12-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.4.9-646CFF?style=flat-square&logo=vite)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.8.6-409EFF?style=flat-square&logo=element)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square)

> **账户管理系统前端** - Vue3 + Element Plus

## 📖 项目简介

JOSP-accountManagerVue3 是一个基于 Vue 3 的账户管理系统前端，提供用户管理、角色管理、部门管理等核心功能。

**后端项目**: [JOSP-accountManageJava](../JOSP-accountManageJava)

## 🚀 技术栈

| 技术 | 版本 | 说明 |
|-----|------|-----|
| Vue | 3.5.12 | 前端框架 |
| Vite | 5.4.9 | 构建工具 |
| Element Plus | 2.8.6 | UI组件库 |
| Vue Router | 4.4.5 | 路由管理 |
| Pinia | 2.2.4 | 状态管理 |
| Axios | 1.7.7 | HTTP请求 |
| TypeScript | 5.6.3 | 类型支持 |

## 📦 核心功能

- ✅ **用户管理** - 用户增删改查、分页查询、批量删除
- ✅ **角色管理** - 角色权限控制
- ✅ **部门管理** - 部门树形结构
- ✅ **统一请求封装** - axios拦截器、token管理
- ✅ **统一错误处理** - 自动提示错误信息
- ✅ **响应式布局** - 支持移动端

## 🔧 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/junwOpenSourceProjects/JOSP-accountManagerVue3.git
cd JOSP-accountManagerVue3
```

2. **安装依赖**
```bash
npm install
# 或
pnpm install
```

3. **修改API地址**
编辑 `.env.development`:
```env
VITE_APP_BASE_API=http://localhost:8088
```

4. **运行项目**
```bash
npm run dev
```

5. **访问项目**
- 前端地址: http://localhost:3000

## 📚 功能页面

### 用户管理

- 分页查询用户
- 新增/编辑用户
- 删除/批量删除用户
- 按条件搜索

## 📁 项目结构

```
JOSP-accountManagerVue3/
├── src/
│   ├── api/          # API接口
│   ├── components/   # 公共组件
│   ├── router/       # 路由配置
│   ├── store/        # 状态管理
│   ├── utils/        # 工具函数
│   ├── views/        # 页面组件
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── .env.development  # 开发环境配置
├── .env.production   # 生产环境配置
├── vite.config.ts    # Vite配置
└── package.json
```

## 🎨 功能截图

(待补充)

---

**创建时间**: 2026-03-29
**维护者**: junw
