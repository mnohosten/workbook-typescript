import { ImapReader } from './imap-reader';

describe('ImapReader', () => {
  describe('read', () => {
    it('should read valid mails', () => {
      const reader = new ImapReader();
      expect(reader).toBeInstanceOf(ImapReader);
    });
  });
});
