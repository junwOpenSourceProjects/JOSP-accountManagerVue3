# JOSP-accountManagerVue3 Specification

## 1. Project Overview

**Name:** JOSP-accountManagerVue3
**Type:** Vue 3 Frontend Application
**Description:** Account management system frontend built with Vue 3 and Element Plus, providing user management features (CRUD + pagination).
**Backend:** [JOSP-accountManageJava](https://github.com/wo1261931780/JOSP-accountManageJava)

## 2. Technical Stack

| Package | Version | Role |
|---------|---------|------|
| vue | ^3.5.32 | Framework |
| vite | ^8.0.9 | Build tool |
| element-plus | ^2.13.6 | UI component library |
| vue-router | ^5.0.4 | Routing |
| pinia | ^3.0.4 | State management |
| axios | ^1.14.0 | HTTP client |
| @element-plus/icons-vue | ^2.3.2 | Icons |
| typescript | ^6.0.2 | Type support |

## 3. Project Structure

```
src/
├── api/
│   └── user.ts          # User API layer (CRUD + pagination)
├── components/          # (reserved for future common components)
├── router/
│   └── index.ts         # Vue Router config, single route: /user
├── store/               # (reserved for future Pinia stores)
├── utils/
│   └── request.ts       # Axios instance with interceptors
├── views/
│   └── User.vue         # User management page
├── App.vue              # Root component
└── main.ts              # Entry point
```

## 4. Features

### 4.1 User Management (Current)
- [x] Paginated user list query
- [x] Add new user
- [x] Edit existing user
- [x] Delete single user
- [x] Batch delete users
- [x] Search by username and status

### 4.2 API Layer (`src/api/user.ts`)
- `getUserPage(page, limit, username?, status?)` - Paginated query
- `getUserById(id)` - Get user by ID
- `addUser(data)` - Create user
- `updateUser(data)` - Update user
- `deleteUser(id)` - Delete user
- `batchDeleteUser(ids)` - Batch delete

### 4.3 HTTP Layer (`src/utils/request.ts`)
- Axios instance with configurable baseURL (env: VITE_APP_BASE_API)
- Request interceptor: injects `Authorization: Bearer {token}` from localStorage
- Response interceptor: unified error handling with Element Plus ElMessage
- Exports: `get`, `post`, `put`, `del` helper functions

### 4.4 Routing
- `/` → redirects to `/user`
- `/user` → User management page (lazy-loaded)

## 5. Configuration

### Environment Variables
- `.env.development`: `VITE_APP_BASE_API=http://localhost:8088`
- `.env.production`: production API address

### Vite Config (`vite.config.ts`)
- `@` alias → `src/`
- Dev server port: 3000
- Proxy: `/api` → `http://localhost:8088`

## 6. Build & Dev

```bash
npm install
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## 7. Architecture Notes

- Single-page application with one view (User management)
- UI state managed locally in `User.vue` (no Pinia stores yet)
- API responses follow `{ code: number, message: string, data: any }` format
- Token stored in `localStorage` under key `token`
