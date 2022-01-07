function fetchData(cb) {
  setTimeout(() => {
    cb('whatever!');
  }, 100);
}

// Wrong: This test don't assert as you should expect
test('wrong way to test callback', () => {
  function callback(data) {
    expect(data).toBe('this will be correct and it is mistake!');
  }
  fetchData(callback);
});

// Good: This correct way to test callbacks
// Disclaimer: Add `done` argument, in this case test will wait
// - try change 'whatever!' and test will fail
test('correct way to test callback', (done) => {
  const callback = (data) => {
    expect(data).toBe('whatever!');
    done();
  };
  fetchData(callback);
});
