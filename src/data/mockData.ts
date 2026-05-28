
export interface Show {
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

export interface Venue {
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

export interface Post {
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

export interface UserData {
  id: number;
  username: string;
  phone: string;
  email: string;
  registerTime: string;
  status: '正常' | '禁用';
  avatar: string;
}

export const CITIES = ['上海', '南京', '杭州', '苏州', '合肥'];

export const SHOWS: Show[] = [
  {
    id: '1',
    title: '2024 周杰伦 [嘉年华] 世界巡回演唱会-南京站',
    artist: '周杰伦',
    date: '2024.10.26-10.27',
    venue: '南京奥体中心体育场',
    city: '南京',
    type: '演唱会',
    price: 580,
    status: '即将开票',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/85d7a08bb1914ada81e3e1d8f851a325.jpg#desc=Jay%20Chou%20Concert',
    description: '周杰伦嘉年华世界巡回演唱会，带你回味经典。',
    venueId: 'v1'
  },
  {
    id: '2',
    title: '告五人 [宇宙超有趣] 2024 巡回演唱会-上海站',
    artist: '告五人',
    date: '2024.09.15',
    venue: '上海梅赛德斯-奔驰文化中心',
    city: '上海',
    type: '演唱会',
    price: 380,
    status: '售票中',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/0d5b2d985ee34ce5aecdeca00d6cc161.jpg#desc=Accusefive%20Shanghai',
    description: '告五人带你进入有趣的音乐宇宙。',
    venueId: 'v2'
  },
  {
    id: '3',
    title: '草莓音乐节 2024-杭州站',
    artist: '群星',
    date: '2024.11.02-11.03',
    venue: '杭州大运河音乐公园',
    city: '杭州',
    type: '音乐节',
    price: 480,
    status: '售票中',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/350d2d3440a44568bab720fcd94c0828.jpg#desc=Strawberry%20Music%20Festival',
    description: '草莓音乐节，年轻人的狂欢。',
    venueId: 'v3'
  },
  {
    id: '4',
    title: '万能青年旅店 [冀西南林家铺子] 巡演-合肥站',
    artist: '万能青年旅店',
    date: '2024.08.20',
    venue: '合肥 ON THE WAY',
    city: '合肥',
    type: 'Livehouse',
    price: 280,
    status: '已售罄',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/3de949b11e2342c2872eb326d23f360e.jpg#desc=Omnipotent%20Youth%20Society',
    description: '万能青年旅店现场演出。',
    venueId: 'v4'
  }
];

export const VENUES: Venue[] = [
  {
    id: 'v1',
    name: '南京奥体中心体育场',
    city: '南京',
    address: '江苏省南京市建邺区江东中路222号',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/97693845014644789547d6be20677465.jpg#desc=Nanjing%20Olympic%20Sports%20Center',
    coordinates: { lat: 32.008, lng: 118.721 },
    transport: '地铁10号线奥体中心站直达',
    notice: '严禁携带易燃易爆物品，请提前2小时入场',
    facilities: ['停车场', '饮水机', '寄存处'],
    lastBus: '23:30',
    capacity: 60000,
    description: '南京最大的综合性体育场。'
  },
  {
    id: 'v2',
    name: '上海梅赛德斯-奔驰文化中心',
    city: '上海',
    address: '上海市浦东新区世博大道1200号',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-26/660c1d68694b43f9a700fbe99a674151.jpg#desc=Mercedes-Benz%20Arena',
    coordinates: { lat: 31.191, lng: 121.491 },
    transport: '地铁8号线中华艺术宫站',
    notice: '禁止携带专业摄影器材',
    facilities: ['商场', '餐饮', '母婴室'],
    lastBus: '23:00',
    capacity: 18000,
    description: '上海最现代化的演出场馆之一。'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 101,
    username: '音乐狂人',
    content: '周杰伦南京站终于要来了！期待值拉满！',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-05-28/b6779c59112746e88608307879c20952.jpg#desc=JayChouPost'],
    likes: 120,
    comments: 45,
    time: '2024-05-20 10:00',
    status: '已通过'
  },
  {
    id: 'p2',
    userId: 102,
    username: 'Livehouse爱好者',
    content: '万青的现场真的绝了，合肥站有人一起吗？',
    images: [],
    likes: 85,
    comments: 12,
    time: '2024-05-21 14:30',
    status: '待审核'
  }
];

export const MOCK_USERS: UserData[] = [
  {
    id: 1,
    username: 'demo_user',
    phone: '13800138000',
    email: 'demo@livejoy.com',
    registerTime: '2024-01-01',
    status: '正常',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
  },
  {
    id: 101,
    username: '音乐狂人',
    phone: '13911112222',
    email: 'music@livejoy.com',
    registerTime: '2024-02-15',
    status: '正常',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music'
  }
];
