function fetchData(input: { ok: boolean }): Promise<{ ok: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ok: input.ok });
    }, 50);
  });
}

const dataProvider = [{ ok: true }, { ok: false }];

describe.each(dataProvider)('testing promises', (input) => {
  it(`should test valid ${input.ok} promise response`, () => {
    return fetchData(input).then((data) => {
      expect(data.ok).toBe(input.ok);
    });
  });
});
