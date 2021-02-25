import Home from '@/pages/Home';
import EmotionPage from '@/pages/Emotion';

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
];

export default routerConfig;
