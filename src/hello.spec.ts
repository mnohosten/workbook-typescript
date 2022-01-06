import { Hello } from './hello';

describe('Hello', () => {
  describe('getHello', () => {
    it('should say Hello World!', () => {
      const hello = new Hello();
      expect(hello.getHello()).toBe('Hello World!');
    });
  });
  describe('getFoo', () => {
    it('should say Bar!', () => {
      const hello = new Hello();
      expect(hello.getFoo()).toBe('Bar!');
    });
  });
});
