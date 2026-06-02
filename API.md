# API 接口文档

本文档汇总前端项目（`src/api/`）中所有接口及其参数。

- **统一前缀**：`VITE_API_BASE`（环境变量，见 `src/lib/request.ts`）
- **鉴权**：自动携带 `Authorization: Bearer <token>`（token 存于 `localStorage.livejoy_token`）
- **请求/响应**：JSON。后端若返回 `{ code, data, message }`，会自动解包 `data`。

---

## 1. 认证模块 Auth (`src/api/auth.ts`)

| # | 方法 | 路径 | 函数 | 入参 | 返回 |
|---|---|---|---|---|---|
| 1 | POST | `/auth/login` | `login(payload)` | `LoginPayload` | `AuthResult` |
| 2 | POST | `/auth/register` | `register(payload)` | `RegisterPayload` | `AuthResult` |
| 3 | POST | `/auth/logout` | `logout()` | — | `void` |
| 4 | PATCH | `/auth/me` | `updateProfile(data)` | `Partial<User>` | `User` |

### 类型定义

```ts
interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  phone: string;
  email: string;
}

interface AuthResult {
  user: User;
  token: string;
}

interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  role: 'admin' | 'user';
}
```

---

## 2. 演出模块 Shows (`src/api/shows.ts`)

| # | 方法 | 路径 | 函数 | 入参 | 返回 |
|---|---|---|---|---|---|
| 1 | GET | `/shows` | `listShows(query?)` | `ShowQuery`（query string） | `Show[]` |
| 2 | GET | `/shows/:id` | `getShow(id)` | `id: string`（path） | `Show \| undefined` |
| 3 | POST | `/admin/shows` | `createShow(payload)` | `Omit<Show, 'id'>`（body） | `Show` |
| 4 | PUT | `/admin/shows/:id` | `updateShow(id, payload)` | `id: string` + `Partial<Show>` | `Show` |
| 5 | DELETE | `/admin/shows/:id` | `deleteShow(id)` | `id: string`（path） | `void` |

### 类型定义

```ts
interface ShowQuery {
  city?: string;
  type?: '演唱会' | 'Livehouse' | '音乐节' | '话剧展览' | '体育赛事' | '曲艺杂谈';
  keyword?: string;
}

interface Show {
  id: string;
  title: string;
  artist: string;
  date: string;
  venue: string;
  city: string;
  type: '演唱会' | 'Livehouse' | '音乐节' | '话剧展览' | '体育赛事' | '曲艺杂谈';
  price: number;
  status: '售票中' | '即将开票' | '已售罄';
  image: string;
  description: string;
  venueId: string;
}
```

---

## 3. 场馆模块 Venues (`src/api/venues.ts`)

| # | 方法 | 路径 | 函数 | 入参 | 返回 |
|---|---|---|---|---|---|
| 1 | GET | `/venues` | `listVenues(query?)` | `VenueQuery`（query string） | `Venue[]` |
| 2 | GET | `/venues/:id` | `getVenue(id)` | `id: string`（path） | `Venue \| undefined` |
| 3 | POST | `/admin/venues` | `createVenue(payload)` | `Omit<Venue, 'id'>`（body） | `Venue` |
| 4 | PUT | `/admin/venues/:id` | `updateVenue(id, payload)` | `id: string` + `Partial<Venue>` | `Venue` |
| 5 | DELETE | `/admin/venues/:id` | `deleteVenue(id)` | `id: string`（path） | `void` |

### 类型定义

```ts
interface VenueQuery {
  city?: string;
  keyword?: string;
}

interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  image: string;
  coordinates: { lat: number; lng: number };
  transport: string;
  notice: string;
  facilities: string[];
  lastBus: string;
  capacity?: number;
  description?: string;
}
```

---

## 4. 帖子模块 Posts (`src/api/posts.ts`)

| # | 方法 | 路径 | 函数 | 入参 | 返回 |
|---|---|---|---|---|---|
| 1 | GET | `/posts` | `listPosts()` | — | `Post[]` |
| 2 | POST | `/posts` | `createPost(payload)` | `CreatePostPayload`（body） | `Post` |
| 3 | DELETE | `/posts/:id` | `deletePost(id)` | `id: string`（path） | `void` |
| 4 | POST | `/posts/:id/like` | `likePost(id)` | `id: string`（path） | `{ likes: number }` |
| 5 | PUT | `/admin/posts/:id/approve` | `approvePost(id)` | `id: string`（path） | `Post` |
| 6 | PUT | `/admin/posts/:id/reject` | `rejectPost(id)` | `id: string`（path） | `Post` |

### 类型定义

```ts
interface CreatePostPayload {
  userId: number;
  username: string;
  content: string;
  images: string[];
}

interface Post {
  id: string;
  userId: number;
  username: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  time: string;
  status: '待审核' | '已通过' | '已拒绝';
}
```

---

## 5. 用户模块 Users (`src/api/users.ts`)

| # | 方法 | 路径 | 函数 | 入参 | 返回 |
|---|---|---|---|---|---|
| 1 | GET | `/admin/users` | `listUsers()` | — | `UserData[]` |
| 2 | PUT | `/admin/users/:id/status` | `updateUserStatus(id, status)` | `id: number`（path） + `{ status: '正常' \| '禁用' }`（body） | `UserData` |
| 3 | POST | `/users/:id/follow` | `follow(userId)` | `userId: number`（path） | `void` |
| 4 | DELETE | `/users/:id/follow` | `unfollow(userId)` | `userId: number`（path） | `void` |
| 5 | GET | `/users/me/following` | `listFollowing()` | — | `number[]` |
| 6 | GET | `/users/me/followers` | `listFollowers()` | — | `number[]` |
| 7 | GET | `/users?ids=1,2,3` | `listUsersByIds(ids)` | `ids: number[]`（query: `ids` 逗号分隔） | `UserData[]` |

### 类型定义

```ts
interface UserData {
  id: number;
  username: string;
  phone: string;
  email: string;
  registerTime: string;
  status: '正常' | '禁用';
  avatar: string;
}
```

---

## 接口数量汇总

| 模块 | 接口数 |
|---|---|
| Auth | 4 |
| Shows | 5 |
| Venues | 5 |
| Posts | 6 |
| Users | 7 |
| **合计** | **27** |

---

## 公共说明

- **请求工具**：`src/lib/request.ts` 中的 `http.get / post / put / patch / del`。
- **错误**：非 2xx 抛出 `ApiError`，包含 `status` 与 `payload`。
- **后台接口**：路径前缀 `/admin/*` 通常需要 `role === 'admin'`。
- **Mock 模式**：`VITE_USE_MOCK=true` 可让上层走本地 mock 数据（当前默认 `false`，走真实后端）。
