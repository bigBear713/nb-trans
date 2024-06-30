# v18.0.0
## 破坏性更新
- feat: `angular`升级到`v18`;
- feat: `@bigbear713/nb-common`升级到`^18.0.0`;

---

# v17.0.0
## 破坏性更新
- feat: `angular`升级到`v17`;
- feat: `@bigbear713/nb-common`升级到`^17.0.0`;

---

# v16.0.0
## 破坏性更新
- feat: `angular`升级到`^16.0.0`;
- feat: `@bigbear713/nb-common`升级到`^16.0.0`;
- feat: [INbTransParams](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransparams) - 限制 params 中的 `key` 的命名规则：由**字母**、**数字**、**_** 和 **$** 组成，且 **数字** 不能为第一个字符;
- feat: [`<nb-trans />`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-transnb-trans) - `key`属性添加必填校验：[issue/25](https://github.com/bigBear713/nb-trans/issues/25)；

## 依赖
- chore: 移除 `uuid` 库;
 
## [Services](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Services "Services")
- refactor: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - 重构翻译文本中动态参数的处理方式；
- fix: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - 修复当 params 的 key 值不完整时会得到object类型的数据的问题：[issue/27](https://github.com/bigBear713/nb-trans/issues/27)；
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - 支持在翻译文本中，`动态参数`和`{{}}`之间存在空格：[issue/34](https://github.com/bigBear713/nb-trans/issues/34);

## [Components](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Components "Components")
- feat: [`[nb-trans]`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-trans) - 新增选择器为`[nb-trans]`的组件：[issue/22](https://github.com/bigBear713/nb-trans/issues/22)；
- perf: [`<nb-trans />`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-transnb-trans) - 使用 UnsubscribeService 管理rxjs的订阅事件；
- fix: [`<nb-trans />`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-transnb-trans) - 修复在一些情况下，翻译结果错误的问题：[issue/28](https://github.com/bigBear713/nb-trans/issues/28)；

## [Pipes](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - 使用 UnsubscribeService 管理rxjs的订阅事件；
 
## [Tokens](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Tokens "Tokens")
- feat: [NB_TRANS_PARAM_KEY_INVALID_WARNING](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb_trans_param_key_invalid_warning) - 当 param key 不符合规则时，是否在 console 中打印警告信息；

---

# v15.1.0
## [Components](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Components "Components")
- feat: [`<nb-trans></nb-trans>`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-transnb-trans) - 支持以`standalone component`的方式引入;
- feat: [`[nb-trans-subcontent]`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-trans-subcontent) - 支持以`standalone component`的方式引入;

## [Pipes](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - 支持以`standalone component`的方式引入;

---

# v15.0.0
## 破坏性更新
- feat: `angular`升级到`^15.0.0`; 
- feat: `@bigbear713/nb-common`升级到`^15.0.0`; 

## 依赖
- feat: `uuid`升级到`^9.0.0`;

## [Tokens](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Tokens "Tokens")
- feat: [NB_TRANS_MAX_RETRY](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb_trans_max_retry) - 增加`NB_TRANS_MAX_RETRY`，`NB_TRANS_MAX_RETRY_TOKEN`标记为`deprecated`；

## [Enums](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Enums "Enums")
- feat: [NbTransLang](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtranslang) - 增加`NbTransLang`，`NbTransLangEnum`标记为`deprecated`；
- feat: [NbTransSentenceItem](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtranssentenceitem) - 增加`NbTransSentenceItem`，`NbTransSentenceItemEnum`标记为`deprecated`；

## [Services](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Services "Services")
- refactor: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - 优化代码；

## [Pipes](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Pipes "Pipes")
- refactor: [nbTrans](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - 优化代码；

---

# v14.0.0
## 破坏性更新
- feat: `angular`升级到`^14.0.0`;
- feat: `@bigbear713/nb-common`升级到`^14.0.0`; 

---

# v13.0.1
## 破坏性更新
- fix: `nb-common`版本调整为`^13.0.0`;

---

# v13.0.0
## 破坏性更新
- feat: `angular`升级到`^13.0.0`;

---

# v12.1.0
## [Services](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Services "Services")
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - `NbTransService.getBrowserLang()`可以直接获取浏览器的首选语言;
- depr: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - `getBrowserLang()`被标志为`deprecated`;
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - `NbTransService.getBrowserLangs()`可以直接获取一个用户已知语言的数组;
- depr: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - `getBrowserLangs()`被标志为`deprecated`;

---

# v12.0.0
## [Module](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Module "Module")
- feat: [NbTransModule](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransmodule) - 提供可用的`component`, `pipe`；
- feat: [NbTransTestingModule](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtranstestingmodule) - 提供单元测试环境；

## [Services](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Services "Services")
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtransservice "NbTransService") - 提供多语言翻译功能；

## [Components](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Components "Components")
- feat: [`<nb-trans></nb-trans>`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-transnb-trans) - 当翻译文本中含有组件等复杂场景时使用的组件；
- feat: [`[nb-trans-subcontent]`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb-trans-subcontent) - 当翻译文本中含有组件嵌套时使用的一种官方提供的方案(可根据需要有自己的实现方式)，会将嵌套的组件内容渲染出来；

## [Pipes](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - 翻译文本的管道；

## [Tokens](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Tokens "Tokens")
- feat: [NB_TRANS_DEFAULT_LANG](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb_trans_default_lang) - 设置默认语言；
- feat: [NB_TRANS_LOADER](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb_trans_loader) - 翻译文本加载器；
- feat: [NB_TRANS_MAX_RETRY](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nb_trans_max_retry) - 翻译文本加载失败时的最大重试次数；

## [Interfaces](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Interfaces "Interfaces")
- feat: [INbTransLoader](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransloader) - 文本加载器；
- feat: [INbTransOptions](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions) - 翻译配置；
- feat: [INbTransParams](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransparams) - 翻译文本中的参数；
- feat: [INbTransChangeLang](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtranschangelang) - 切换语言的结果；
- feat: [INbTransSentencePart](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtranssentencepart) - 句子部分；
- feat: [INbTransSentenceCompPart](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtranssentencecomppart) - 句子中含有组件的部分；

## [Enums](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#Enums "Enums")
- feat: [NbTransLang](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtranslang) - 常用语言枚举；
- feat: [NbTransSentenceItem](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#nbtranssentenceitem) - 句子项类型枚举；