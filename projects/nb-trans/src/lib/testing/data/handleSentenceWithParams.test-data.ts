import { INbTransParams } from "../../models";

export const handleSentenceWithParamsTestData: {
  title: string;
  test: { trans: string; params?: INbTransParams; };
  expect: { result: string };
}[] = [
    { title: 'no params', test: { trans: 'test trans', params: undefined, }, expect: { result: 'test trans' } },
    { title: 'empty params', test: { trans: 'test trans', params: {} }, expect: { result: 'test trans' } },
    { title: '2 params', test: { trans: 'a {{p1}} {{p2}}', params: { p1: '123', p2: 'abc' } }, expect: { result: 'a 123 abc' } },
    { title: 'params key is upperCase, but params value is lowerCase', test: { trans: 'a {{P1}} {{p2}}', params: { p1: '123', p2: 'abc' } }, expect: { result: 'a {{P1}} abc' } },
    { title: 'params key is lowerCase, but params value is upperCase', test: { trans: 'a {{p1}} {{P2}}', params: { P1: '123', P2: 'abc' } }, expect: { result: 'a {{p1}} abc' } },
    { title: 'start with params', test: { trans: '{{p1}} and {{p2}}', params: { p1: '123', p2: 'abc' } }, expect: { result: '123 and abc' } },
    { title: 'params are in middle', test: { trans: 'a {{p1}} b {{p2}} c', params: { p1: '123', p2: 'abc' } }, expect: { result: 'a 123 b abc c' }, },
    { title: 'params value is same with param key', test: { trans: '{{p1}}{{p2}}', params: { p1: '{{p2}}', p2: '{{p2}}' } }, expect: { result: '{{p2}}{{p2}}' }, },
    { title: 'err params format:{}', test: { trans: 'test {p1}', params: { p1: '123' } }, expect: { result: 'test {p1}' } },
    { title: 'err params format:{ {}}', test: { trans: 'test { {p1}}', params: { p1: '123' } }, expect: { result: 'test { {p1}}' } },
    { title: 'err params format:{{   }}', test: { trans: 'test {{ p1 }}', params: { p1: '123' } }, expect: { result: 'test {{ p1 }}' } },
    { title: 'err params format:{{{}}}', test: { trans: 'test {{{p1}}}', params: { p1: '123' } }, expect: { result: 'test {123}' } },
    { title: 'err params format:[]', test: { trans: 'test [p1]', params: { p1: '123' } }, expect: { result: 'test [p1]' } },
    { title: 'err params format:[[]]', test: { trans: 'test [[p2]]', params: { p2: '123' } }, expect: { result: 'test [[p2]]' } },
    { title: 'param key contain with $', test: { trans: 'This is {{$p1}} and {{p2$}} and {{p$p}}', params: { $p1: '123', p2$: 'abc', p$p: 'test' } }, expect: { result: 'This is 123 and abc and test' } },
    { title: 'param key contain with _', test: { trans: 'This is {{_p1}} and {{p2_}} and {{p_p}}', params: { _p1: '123', p2_: 'abc', p_p: 'test' } }, expect: { result: 'This is 123 and abc and test' } },
    { title: 'param key contain with number', test: { trans: 'This is {{1p1}} and {{p22}}', params: { '1p1': '123', p22: 'abc' } }, expect: { result: 'This is {{1p1}} and abc' } },
    {
      title: 'param key contain with other symbol',
      test: {
        trans: 'This is {{p!}}, {{p@}}, {{p#}}, {{p%}}, {{p^}}, {{p……}}, {{p&}}, {{p*}}, {{p(}}, {{p)}}, {{p-}}, {{p+}}, {{p=}},{{p;}}, {{p:}}, {{p\'}},{{p"}}, {{p<}}, {{p>}}, {{p,}},{{p.}}, {{p\\}},{{p|}},{{p/}},{{p?}},{{p[}},{{p]}}',
        params: { 'p!': '123', 'p@': 'abc', 'p#': 'abc', 'p%': 'abc', 'p^': 'abc', 'p……': 'abc', 'p&': 'abc', 'p*': 'abc', 'p(': 'abc', 'p)': 'abc', 'p-': 'abc', 'p+': 'abc', 'p=': 'abc', 'p;': 'abc', 'p:': 'abc', 'p\'': 'abc', 'p"': 'abc', 'p<': 'abc', 'p>': 'abc', 'p,': 'abc', 'p.': 'abc', 'p\\': 'abc', 'p|': 'abc', 'p/': 'abc', 'p[': 'abc', 'p]': 'abc' }
      },
      expect: {
        result: 'This is {{p!}}, {{p@}}, {{p#}}, {{p%}}, {{p^}}, {{p……}}, {{p&}}, {{p*}}, {{p(}}, {{p)}}, {{p-}}, {{p+}}, {{p=}},{{p;}}, {{p:}}, {{p\'}},{{p"}}, {{p<}}, {{p>}}, {{p,}},{{p.}}, {{p\\}},{{p|}},{{p/}},{{p?}},{{p[}},{{p]}}'
      }
    },
    { title: 'param key contain with whitespace', test: { trans: 'This is {{ p1}} and {{p2 }}', params: { ' p1': '123', 'p2 ': 'abc' } }, expect: { result: 'This is {{ p1}} and {{p2 }}' } },
  ];