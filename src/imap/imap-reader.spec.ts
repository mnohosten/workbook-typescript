import { ImapReader } from './imap-reader';

describe('ImapReader', () => {
  describe('read', () => {
    it('should read valid mails', async () => {
      const reader = new ImapReader({
        user: 'martin.krizan@airway.cz',
        password: '***REMOVED***',
        host: 'email.active24.com',
        port: 993,
        tls: true,
      });
      const N_DAYS_AGO = 2;
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - N_DAYS_AGO);
      const criteria = ['ALL', ['SINCE', sinceDate], ['SUBJECT', '| wuI']];
      for await (const msg of reader.read(criteria)) {
        console.log(msg);
      }
    });
  });
});
