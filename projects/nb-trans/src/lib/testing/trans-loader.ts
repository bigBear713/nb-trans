import { NbTransLangEnum } from '../constants';

export const transLoader = {
  dynamicLoader: {
    [NbTransLangEnum.EN]: () => import('./localization/en/translations').then(data => data.trans),
    [NbTransLangEnum.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
  },
  staticLoader: {
    [NbTransLangEnum.EN]: {
      title: 'title  ',
      content: {
        'helloWorld': 'hello world',
      },
      helloWorld: 'hello world!',
      component: '<0>component</0>',
      complexComponent: '<0>component0<1>component1</1></0>',
    },
    [NbTransLangEnum.ZH_CN]: {
      title: '标题  ',
      content: {
        'helloWorld': '你好，世界',
      },
      helloWorld: '你好，世界!',
      component: '<0>组件</0>',
      complexComponent: '<0>组件0<1>组件1</1></0>',
    },
  }
}; 