import { NbTransLang } from '../constants';

export const transLoader = {
  dynamicLoader: {
    [NbTransLang.EN]: () => import('./localization/en/translations').then(data => data.trans),
    [NbTransLang.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
  },
  staticLoader: {
    [NbTransLang.EN]: {
      title: 'title  ',
      content: {
        helloWorld: 'hello world',
      },
      helloWorld: 'hello world!',
      component: '<0>component</0>',
      complexComponent: '<0>component0<1>component1</1></0>',
      withParams:
        'This is a sentence. params: {{params1}} - {{params2}} - {{params3}} - {{params2}}',
    },
    [NbTransLang.ZH_CN]: {
      title: '标题  ',
      content: {
        helloWorld: '你好，世界',
      },
      helloWorld: '你好，世界!',
      component: '<0>组件</0>',
      complexComponent: '<0>组件0<1>组件1</1></0>',
      withParams:
        '这是一个带有参数的句子。参数:  {{params1}} - {{params2}} - {{params3}} - {{params2}}',
    },
  },
};
