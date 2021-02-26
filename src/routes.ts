import Home from '@/pages/Home';
import EmotionPage from '@/pages/Emotion';
import DemoGrid from '@/pages/DemoGrid';

const routerConfig = [
  {
    path: '/',
    component: Home,
    exact: true,
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
