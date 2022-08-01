import axios from 'axios';
import config from '../../config.js';

export default class Scraper {
  constructor() {}

  async scrap() {
    try {
      const response = await axios.get(config.naverBookingURL, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
          Referer: config.naverBookingRefererURL,
        },
      });
      const statusCode = response?.status;
      if (statusCode >= 200 && statusCode < 300) {
        if (Array.isArray(response.data)) {
          return response.data;
        }
        throw new Error(`StatusCodeException: ${response.status}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  parseData(dataList) {
    const availableList = dataList.reduce((acc, item) => {
      if (item.isUnitSaleDay === true) {
        acc.push({ available: true, time: item.unitStartTime });
      }
      return acc;
    }, []);

    return availableList;
  }
}
