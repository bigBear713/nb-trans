import { INbTransParams } from "../../models";

export const handleSentenceWithParamsTestData: {
  title: string;
  test: { trans: string; params?: INbTransParams; };
  expect: { result: string };
}[] = [
    { title: 'no params', test: { trans: 'test trans', params: undefined, }, expect: { result: 'test trans' } },
    { title: 'empty params', test: { trans: 'test trans', params: {} }, expect: { result: 'test trans' } },
    { title: '2 params', test: { trans: 'a {{p1}} {{p2}}', params: { p1: '123', p2: 'abc' } }, expect: { result: 'a 123 abc' } },
    { title: 'start with params', test: { trans: '{{p1}} and {{p2}}', params: { p1: '123', p2: 'abc' } }, expect: { result: '123 and abc' } },
    { title: 'params are in middle', test: { trans: 'a {{p1}} b {{p2}} c', params: { p1: '123', p2: 'abc' } }, expect: { result: 'a 123 b abc c' }, },
    { title: 'params value is same with param key', test: { trans: '{{p1}}{{p2}}', params: { p1: '{{p2}}', p2: '{{p2}}' } }, expect: { result: '{{p2}}{{p2}}' }, },
    { title: 'err params format:{}', test: { trans: 'test {p1}', params: { p1: '123' } }, expect: { result: 'test {p1}' } },
    { title: 'err params format:{{{}}}', test: { trans: 'test {{{p1}}}', params: { p1: '123' } }, expect: { result: 'test {123}' } },
    { title: 'err params format:[]', test: { trans: 'test [p1]', params: { p1: '123' } }, expect: { result: 'test [p1]' } },
    { title: 'err params format:[[]]', test: { trans: 'test [[p2]]', params: { p2: '123' } }, expect: { result: 'test [[p2]]' } }
  ];