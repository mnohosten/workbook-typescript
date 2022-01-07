import Imap from 'imap';
import { simpleParser } from 'mailparser';
jest.setTimeout(15000);

export class ImapReader {
  private readonly imap: Imap;
  constructor(config: Imap.Config) {
    this.imap = new Imap(config);
  }

  async *read(criteria: any[]) {
    this.imap.connect();
    const ready = this.imapEvent('ready');
    const boxes = await ready.then(() => this.getBoxes());
    const messages = await ready.then(() =>
      this.searchMessageUids(criteria, boxes),
    );
    for await (const uidData of messages()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      yield this.fetchMessageByUidData(uidData);
    }
    this.imap.end();
  }

  private fetchMessageByUidData(uidData: { uid: number; box: string }) {
    return new Promise((resolve) => {
      const f = this.imap.fetch(uidData.uid, { bodies: '' });
      f.on('message', (msg) => {
        msg.on('body', async (stream) => {
          const parsed = await simpleParser(stream);
          const { headers, from, subject, textAsHtml, text } = parsed;
          resolve({
            uid: uidData.uid,
            mailboxName: uidData.box,
            headers: headers,
            from: from?.value ?? null,
            subject: subject ?? null,
            textAsHtml: textAsHtml ?? null,
            text: text ?? null,
          });
        });
      });
    });
  }

  private searchMessageUids(criteria, boxes): Promise<GeneratorFunction> {
    return new Promise(async (resolve) => {
      const imap = this.imap;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolve(async function* () {
        for (const box in boxes) {
          const getUidData = new Promise((resolve) => {
            imap.openBox(box, () => {
              imap.search(criteria, (error, uids) =>
                resolve({
                  box: box,
                  uids: uids,
                }),
              );
            });
          });
          const uidsData = <{ box: string; uids: number[] }>await getUidData;
          for (const uid of uidsData.uids) {
            yield {
              uid: uid,
              box: uidsData.box,
            };
          }
        }
      });
    });
  }

  private getBoxes() {
    return new Promise((resolve, reject) => {
      this.imap.getBoxes((error, boxes) => {
        if (error) reject(error);
        resolve(boxes);
      });
    });
  }

  private imapEvent(type) {
    return new Promise((resolve) => this.imap.on(type, resolve));
  }
}
