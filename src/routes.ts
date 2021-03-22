import Home from '@/pages/Home';
import EmotionPage from '@/pages/Emotion';
import DemoGrid from '@/pages/DemoGrid';
import LoginPage from '@/pages/Login';

const routerConfig = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/emotion',
    component: EmotionPage,
  },
  {
    path: '/demogrid',
    component: DemoGrid,
  },
];

export default routerConfig;
