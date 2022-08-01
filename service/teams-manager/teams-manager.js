import axios from 'axios';
import config from '../../config.js';
export default class TeamsManager {
  constructor() {}

  static async notifyWebHooks(message) {
    try {
      const response = await axios.post(
        config.teamsAppURL,
        { summary: 'hairBot', text: `${message}` },
        { headers: { 'Content-Type': 'application/json' } },
      );
      if (response?.status < 200 || response?.status >= 300) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
