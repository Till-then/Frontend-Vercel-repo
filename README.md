# 启动方式：
在对应文件夹下启动终端\
输入
npm install\
npm run dev\
然后进入Vite对应的本地地址（通常是 http://localhost:5173）


TODO：
1. 复制环境变量：cp .env.example .env，并把 VITE_API_BASE 改成你后端的真实地址。
  2. 保证后端实现这些路由（按统一返回 { code, data, message } 或直接返回数据均可，request.ts 都能解包）：
    - POST /auth/login POST /auth/register POST /auth/logout PATCH /auth/me
    - GET /shows GET /shows/:id POST /admin/shows PUT /admin/shows/:id DELETE /admin/shows/:id
    - GET /venues GET /venues/:id POST /admin/venues PUT /admin/venues/:id DELETE /admin/venues/:id
    - GET /posts POST /posts DELETE /posts/:id POST /posts/:id/like
    - PUT /admin/posts/:id/approve PUT /admin/posts/:id/reject
    - GET /admin/users PUT /admin/users/:id/status GET /users?ids=1,2
    - POST /users/:id/follow DELETE /users/:id/follow GET /users/me/following GET /users/me/followers
  3. 跑 npm install && npm run dev 验证。

  如需临时退回 mock 数据：把 .env 里 VITE_USE_MOCK=true，并解注释相应文件中的 // --- 原本地逻辑 --- 段即可。


# 更新日志

## 2026-06-02 version 3.1:

改动汇总

  1. src/lib/request.ts — USE_MOCK 默认值从 true 翻为 false，原值以注释保留。

  2. API 层（src/api/*.ts） — shows / venues / posts / users / auth 的每个函数都去掉了 if (USE_MOCK) {...} 分支，只保留真实后端调用；mock 分支整段以注释保留在函数注释里。
  - 同时新增了 users.updateUserStatus / users.listUsersByIds / posts.approvePost / posts.rejectPost，用于后台用户状态切换、按 ID 拉取用户、帖子审核。

  3. src/context/AppContext.tsx — 重大变更：
  - 新增全局 shows / venues 数组 + addShow / editShow / removeShow / addVenue / editVenue / removeVenue / refreshShows / refreshVenues。
  - 启动时自动 GET /shows 与 GET /venues，让首页 / 搜索 / 详情 / 后台共用同一份数据。
  - 移除 MOCK_POSTS / [101] / [102] 等兜底，改为返回空数组（兜底以注释保留）。

  4. 页面（消费侧） — 全部改为读 Context 而不是直接 import { SHOWS / VENUES / MOCK_POSTS / MOCK_USERS } from '../data/mockData'：
  - Home.tsx、ShowList.tsx、ShowDetail.tsx、ProfileSubPages.tsx（MyFavorites）→ 用 shows
  - VenueList.tsx、VenueDetail.tsx → 用 venues
  - AdminDashboard.tsx → 用 shows / venues / posts，用户数走 usersApi.listUsers()
  - AdminPosts.tsx、AdminUsers.tsx → 改为页面 useEffect 拉取并 API 改写状态/审核/删除
  - ProfileSubPages.tsx（MyFollowing / MyFollowers）→ 改为 usersApi.listUsersByIds(following/followers)

  5. 后台编辑页（生产侧）：
  - AdminShows.tsx / AdminVenues.tsx 的 useState<Show[]>(SHOWS) 局部副本改成 Context 全局 → 新增/编辑/删除立刻在首页和搜索页生效（这正是上一条问题的根因解决）。

  6. .env.example — VITE_USE_MOCK=false，并加了一行注释说明默认已切真实后端。
   
### 在完成后端接入前，前端将不会再更新。

## 2026-05-29 version 3.0:
### 超级大更新
新增 / 修改的文件：

| 文件 | 作用 |
| --- | --- |
| .env.example | VITE_API_BASE、VITE_USE_MOCK 配置示例 |
| src/vite-env.d.ts | import.meta.env 类型声明 |
| src/lib/request.ts | fetch 封装：baseURL / Bearer Token / 错误统一处理 / {data} 解包 |
| src/api/index.ts | API 模块聚合导出 |
| src/api/auth.ts | login / register / logout / updateProfile |
| src/api/shows.ts | 演出 CRUD + 列表筛选 |
| src/api/venues.ts | 场馆 CRUD + 列表筛选 |
| src/api/posts.ts | 帖子列表 / 创建 / 删除 / 点赞 |
| src/api/users.ts | 关注 / 取关 / 关注列表 / 粉丝列表 |
| src/context/AppContext.tsx | 全部业务函数改为 async，调用 api 模块；原本地逻辑保留为注释 |
| src/pages/Login.tsx | handleSubmit 改 async，await login(...) |
| src/pages/Register.tsx | handleSubmit 改 async，await register(...) |

  设计要点

  1. 双模式开关：VITE_USE_MOCK=true 时所有 api 函数走本地 mock 分支（保留原本地测试逻辑）；改为 false 即调用真实后端。无需改业务代码。
  2. 原本地函数保留方式：在 auth.ts / posts.ts / AppContext.tsx 等关键位置，每个函数顶部都用 JSDoc 注释保留了 原本地测试逻辑 段落，方便对照与回退。
  3. 乐观更新 + 回滚：toggleFollow / toggleLike / deletePost 在网络请求失败时自动回滚 UI 状态。
  4. Token 持久化：登录后 token 存 localStorage（key=livejoy_token），request.ts 自动附加到 Authorization 头。
  5. 后端协议假设：默认后端返回 { code, data, message } 包装结构，request 自动解包 data。如果后端直接返回原对象也兼容。

  接入真实后端的步骤

  1. 复制 .env.example → .env，填写 VITE_API_BASE，将 VITE_USE_MOCK 改为 false。
  2. 后端按照各 api 文件中标注的路径与方法实现接口（如 POST /auth/login、GET /shows 等）。
  3. 如果后端响应结构不同，调整 src/lib/request.ts 中的解包逻辑即可，业务层无感知。

## 2026-05-28 version 2.1:
- 新增了搜索栏实时联想（首页的联想逻辑还未完善，故暂不实现）
- B端采取了Modal弹窗实现新增/编辑演出和场馆，删除逻辑等待实现。
- 个人主页实现了收藏、关注、评价的查看
- 实现了手机号、邮箱、密码的修改，账号安全模块中添加了“关于我们”与“问题反馈”
- 个人头像个性化，可以根据本地图像更改头像
- 在演出详情和场馆详情页面添加了相关帖子的推荐与入口
- 场馆详情新增了对场馆的介绍
- 完善了用户发布动态的功能，支持上传图片


## 2026-05-28 version 2.0:

- 修改了背景色
- 添加了用户的登陆、注册、关注、收藏功能，目前已经用本地node和mock数据通过demo测试。测试者可以自行注册账号体验。
- 添加了B端，即管理员端，可以对整体、演出、场馆、帖子和用户进行管理。

**管理员账号用户名：admin**\
**密码：admin123**

- 为了方便接口调试，我在/src/pages的每个文件的顶部都添加了对应的api接口的注释，方便后续对接。
- B端的演出、场馆等添加功能暂未实现，目前在考虑是实现手动输入还是自动导入类型。