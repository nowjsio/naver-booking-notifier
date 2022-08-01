import { CronJob } from 'cron';

export default class Scheduler {
  constructor(job) {
    this.status = 'INIT';
    this.resultCount = 0;
    this.unavailableCount = 0;
    this.scheduler = new CronJob('*/10 * * * * *', async () => {
      // this.scheduler = new CronJob('00 00 08,19 * * *', async () => {
      switch (this.status) {
        case 'RUNNING':
          //   console.debug(`status [${this.status}], so skip to run job`);
          break;
        case 'STOP':
          console.info(`status [${this.status}], so stop scheduler`);
          this.stop();
          break;
        default:
          //   console.info(
          //     `status [${this.status}], so start job, change statue [RUNNING]`,
          //   );
          this.status = 'RUNNING';
          try {
            const jobResult = await job();
            if (jobResult === true) {
              this.resultCount++;
            } else {
              this.unavailableCount++;
              if (this.unavailableCount > 9) {
                console.log(
                  `[${new Date()}]this.unavailableCount: ${
                    this.unavailableCount
                  }, reset count`,
                );
                this.unavailableCount = 0;
              }
            }

            if (this.resultCount > 4) {
              console.info(`jobResult: [${this.resultCount}], stop job`);
              this.status = 'STOP';
            } else {
              //   console.info(
              //     `job successd finishing job, so change status [WAITING]`,
              //   );
              this.status = 'WAITING';
            }
          } catch (e) {
            console.error(
              `Error occured, check your logic, change statue [STOP], so scheduler force stop job`,
            );
            console.error(e);
            this.status = 'STOP';
          }
      }
    });
  }

  start() {
    this.scheduler.start();
  }

  stop() {
    this.scheduler.stop();
  }
}
