import Scheduler from './service/scheduler/scheduler.js';
import { job } from './service/job/job.js';

try {
  const _Scheduler = new Scheduler(job);
  _Scheduler.start();
} catch (e) {
  console.error('[main] Exception');
  console.error(e);
}
