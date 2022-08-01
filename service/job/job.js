import TeamsManager from '../teams-manager/teams-manager.js';
import Scraper from '../scrap/scrap.js';

const _Scraper = new Scraper();

export async function job() {
  try {
    const data = await _Scraper.scrap();
    const parsedDataList = _Scraper.parseData(data);
    if (Array.isArray(parsedDataList) && parsedDataList.length > 0) {
      await TeamsManager.notifyWebHooks(JSON.stringify(parsedDataList));
      return true;
    } else {
      return false;
      // unavailableDataList
    }
  } catch (e) {
    console.error('[job] Exception');
    console.error(e);
  }
}
