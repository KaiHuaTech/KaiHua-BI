import { request } from 'ice';

export default {
  // 简单场景
  async login(data) {
    return await request.post('/api/session', data);
  },
};
