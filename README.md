# JOSP-accountManagerVue3

账户管理系统前端 - Vue 3 + Element Plus

## 技术栈

| 技术 | 版本 |
|-----|------|
| Vue | 3.5.32 |
| Vite | 8.0.9 |
| Element Plus | 2.13.6 |
| Vue Router | 5.0.4 |
| Pinia | 3.0.4 |
| Axios | 1.14.0 |
| TypeScript | 6.0.2 |

## 功能

- 用户分页查询 / 条件搜索
- 用户新增 / 编辑 / 删除 / 批量删除
- Axios 请求封装（Token 注入、统一错误处理）
- 路由守卫与代理配置

## 项目结构

```
src/
├── api/user.ts        # 用户 API
├── router/index.ts    # 路由配置
├── utils/request.ts   # Axios 实例封装
├── views/User.vue     # 用户管理页面
├── App.vue
└── main.ts
```

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 环境配置

编辑 `.env.development`:
```
VITE_APP_BASE_API=http://localhost:8088
```

## API 代理

Vite 开发服务器代理 `/api` 请求到 `http://localhost:8088`，避免跨域问题。

## 构建

```bash
npm run build   # 生产构建
npm run preview # 预览构建结果
```

## License

AGPL-3.0
