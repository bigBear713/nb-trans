# v12.1.0
## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
### [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService")
- feat: `NbTransService.getBrowserLang()`可以直接获取浏览器的首选语言;
- depr: `getBrowserLang()`被标志为`deprecated`;
- feat: `NbTransService.getBrowserLangs()`可以直接获取一个用户已知语言的数组;
- depr: `getBrowserLangs()`被标志为`deprecated`;


# v12.0.0
## [Module](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Module "Module")
- feat: NbTransModule - 提供可用的`component`, `pipe`
- feat: NbTransTestingModule - 提供单元测试环境

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
- feat: NbTransService - 提供多语言翻译功能

## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Components "Components")
- feat: `<nb-trans></nb-trans>` - 当翻译文本中含有组件等复杂场景时使用的组件
- feat: `[nb-trans-subcontent]` - 当翻译文本中含有组件嵌套时使用的一种官方提供的方案(可根据需要有自己的实现方式)，会将嵌套的组件内容渲染出来

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Pipes "Pipes")
- feat: nbTrans - 翻译文本的管道

## [Tokens](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Tokens "Tokens")
- feat: NB_TRANS_DEFAULT_LANG - 设置默认语言
- feat: NB_TRANS_LOADER - 翻译文本加载器
- feat: NB_TRANS_MAX_RETRY_TOKEN - 翻译文本加载失败时的最大重试次数

## [Interfaces](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Interfaces "Interfaces")
- feat: INbTransLoader - 文本加载器
- feat: INbTransOptions - 翻译配置
- feat: INbTransParams - 翻译文本中的参数
- feat: INbTransChangeLang - 切换语言的结果
- feat: INbTransSentenceCompPart - 句子中含有组件的部分

## [Enums](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Enums "Enums")
- feat: NbTransLangEnum - 常用语言枚举
- feat: NbTransSentenceItemEnum - 句子项类型枚举