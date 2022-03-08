export const translationSyncTestData = [
  { title: 'options is undefined', test: { key: 'trans.key', options: undefined, }, expect: { result: 'trans.key' }, },
  { title: 'options is {}', test: { key: 'trans.key', options: {}, }, expect: { result: 'trans.key' }, },
  { title: 'returnKeyWhenEmpty is false', test: { key: 'trans.key', options: { returnKeyWhenEmpty: false }, }, expect: { result: '' }, },
  { title: 'returnKeyWhenEmpty is true', test: { key: 'trans.key', options: { returnKeyWhenEmpty: true }, }, expect: { result: 'trans.key' }, },
  { title: 'prefix is "prefix"', test: { key: 'trans.key', options: { prefix: 'prefix' }, }, expect: { result: 'prefix.trans.key' }, },
  { title: 'prefix is "prefix."', test: { key: 'trans.key', options: { prefix: 'prefix.' }, }, expect: { result: 'prefix..trans.key' }, },
  { title: 'prefix is " prefix "', test: { key: 'trans.key', options: { prefix: ' prefix ' }, }, expect: { result: ' prefix .trans.key' }, },
  { title: 'prefix is "content"', test: { key: 'helloWorld', options: { prefix: 'content' }, }, expect: { result: '你好，世界' }, },
];