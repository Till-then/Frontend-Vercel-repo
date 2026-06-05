
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
  ticketUrl?: string;
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
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/ac0e194a50df400b911c3a5c7b35925b.jpg#desc=Jay%20Chou%20Concert',
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
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/2ed13784d59c4662a34491fe68639827.jpg#desc=Accusefive%20Shanghai',
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
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/e4355e9d494549fabf81375651c8c736.jpg#desc=Strawberry%20Music%20Festival',
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
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/15fe53d352f747e1ae8e194ded6b1cab.jpg#desc=Omnipotent%20Youth%20Society',
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
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/4b9fab4a0e2846ac900c2be6f87d5ae6.jpg#desc=%E4%B8%80%E5%BC%A0%E9%AB%98%E8%B4%A8%E9%87%8F%E3%80%81%E8%A7%86%E8%A7%89%E7%B2%BE%E7%BE%8E%E3%80%81%E7%AE%80%E7%BA%A6%E9%A3%8E%E6%A0%BC%E7%9A%84%E7%A4%BA%E4%BE%8B%E5%9B%BE%E7%89%87%EF%BC%8C%E7%AC%A6%E5%90%88%E7%8E%B0%E4%BB%A3%20Web%20%E8%AE%BE%E8%AE%A1%E5%AE%A1%E7%BE%8E',
    coordinates: { lat: 32.008, lng: 118.721 },
    transport: '地铁10号线奥体中心站直达',
    notice: '严禁携带易燃易爆物品，请提前2小时入场',
    facilities: ['停车场', '饮水机', '寄存处', '地铁直达', '可容纳6万人'],
    lastBus: '23:30',
    capacity: 60000,
    description: '南京奥体中心体育场是南京奥林匹克体育中心的主要场馆之一，是江苏省规模最大的体育场。它不仅是各类大型体育赛事的举办地，也是众多国际知名艺人巡回演唱会的首选场地。\n\n该体育场设计先进，拥有完善的配套设施。其独特的建筑风格已成为南京城市的标志性景观之一。场馆内视野开阔，音响效果极佳，能为观众提供震撼的视听体验。\n\n多年来，这里举办过全运会、亚青会、青奥会等多项重大赛事，以及周杰伦、陈奕迅、五月天等知名艺人的演唱会。'
  },
  {
    id: 'v2',
    name: '上海梅赛德斯-奔驰文化中心',
    city: '上海',
    address: '上海市浦东新区世博大道1200号',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/e5ddf34b5aa54582b2f1017470d8157f.jpg#desc=Mercedes-Benz%20Arena',
    coordinates: { lat: 31.191, lng: 121.491 },
    transport: '地铁8号线中华艺术宫站',
    notice: '禁止携带专业摄影器材',
    facilities: ['商场', '餐饮', '母婴室', '配备VIP包厢', '地铁直达'],
    lastBus: '23:00',
    capacity: 18000,
    description: '上海梅赛德斯-奔驰文化中心坐落于上海世博园区，是全球顶级的娱乐、体育综合场馆之一。其独特的外形被人们亲切地称为“飞碟”。\n\n场馆拥有先进的舞台设施和音响系统，可以根据不同的演出需求灵活调整场地配置。无论是大型演唱会、体育比赛还是商业活动，都能在这里得到完美的呈现。\n\n作为上海的文化地标，奔驰中心每年都会举办数百场精彩纷呈的活动，吸引着来自世界各地的观众。周边配套设施完善，包括购物中心、影院、餐饮等，为观众提供了一站式的娱乐体验。'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 101,
    username: '音乐狂人',
    content: '周杰伦南京站终于要来了！期待值拉满！这次一定要抢到票！有没有组队的小伙伴？',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-05-28/5dd03605be674eb98be7ef709cbbe5fa.jpg#desc=JayChouPost'],
    likes: 120,
    comments: 45,
    time: '2024-05-20 10:00',
    status: '已通过'
  },
  {
    id: 'p2',
    userId: 102,
    username: 'Livehouse爱好者',
    content: '万青的现场真的绝了，合肥站有人一起吗？上次在上海看的时候真的被震撼到了，那种氛围感无与伦比。',
    images: [],
    likes: 85,
    comments: 12,
    time: '2024-05-21 14:30',
    status: '已通过'
  },
  {
    id: 'p3',
    userId: 1,
    username: 'demo_user',
    content: '今天去看了告五人的演唱会，真的超级有趣！现场气氛太好了，大家一起合唱的感觉真棒。',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-05-28/424765c1f5f846ca8e92f028b67f6f9e.jpg#desc=AccusefivePost'],
    likes: 50,
    comments: 8,
    time: '2024-05-22 22:00',
    status: '已通过'
  },
  {
    id: 'p4',
    userId: 101,
    username: '音乐狂人',
    content: '南京奥体中心的交通还是挺方便的，就是散场的时候人太多，建议大家提前规划好路线。',
    images: [],
    likes: 30,
    comments: 5,
    time: '2024-05-23 09:00',
    status: '已通过'
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
  },
  {
    id: 102,
    username: 'Livehouse爱好者',
    phone: '13766667777',
    email: 'live@livejoy.com',
    registerTime: '2024-03-10',
    status: '正常',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=live'
  }
];
