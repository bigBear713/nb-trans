<div align="center">

# @bigbear713/nb-trans

Angular translation lib by bigBear713.

[OnlineDemo](https://bigBear713.github.io/nb-trans/)

[Bug Report](https://github.com/bigBear713/nb-trans/issues)

[Feature Request](https://github.com/bigBear713/nb-trans/issues)

</div>

## Document
- [中文](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md "文档 - 中文")
- [English](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md "Document - English")

<br>

---

## Changelog
- [中文](https://github.com/bigBear713/nb-trans/blob/main/CHANGELOG.CN.md "更新日志 - 中文")
- [English](https://github.com/bigBear713/nb-trans/blob/main/CHANGELOG.md "Changelog - English")

<br>

---

## Feature
- 支持翻译文本懒加载，或者急性加载；
- 支持切换语言时，不刷新页面自动更新翻译文本；
- 支持设置翻译文本加载失败时的重试次数；
- 支持翻译文本中带有参数；
- 支持翻译文本中带有组件的复杂场景；
- 支持组件的更新策略为`ChangeDetectionStrategy.OnPush`;
- 支持在`standalone component`中使用；
- 支持以`standalone component`的方式引入;

<br>

---

## Version
###### nb-trans的大版本和Angular的大版本保持对应关系
| @bigbear713/nb-trans  | @angular/core |
| ---                   | ---           |
| ^12.0.0               | ^12.0.0       |
| ^13.0.0               | ^13.0.0       |
| ^14.0.0               | ^14.0.0       |
| ^15.0.0               | ^15.0.0       |
| ^16.0.0               | ^16.0.0       |

<br>

---

## Installation
```bash
$ npm i @bigbear713/nb-trans
// or
$ yarn add @bigbear713/nb-trans
```

<br>

---

## API
### Module

#### NbTransModule
###### 多语言模块。引入该模块后，可使用`component`，`pipe`。`service`不需要引入该模块也可使用，默认为全局。

#### NbTransTestingModule
###### 多语言测试模块。用于Unit Test。

<br>

---

### Services

#### NbTransService
##### `v12.0.0`
###### 提供多语言翻译功能的`service`

##### Properties
| Properties  | Type  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ |
| lang  | `string`  | 当前语言值  | `v12.0.0` |
| loadDefaultOver  | `boolean`  | 默认语言的翻译文本是否加载完毕  | `v12.0.0` |

##### Methods
| Name  | Return  | Description  | Scenes  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| changeLang(lang: string)  | `Observable<INbTransChangeLang>`  | 切换语言。lang参数需要和`NB_TRANS_LOADER`中的key值相对应。是一个观察者异步事件。当切换的语言的翻译文本被加载完成后才会返回结果。订阅后无需取消订阅，因为当语言切换后（不管是否成功），将自动complete。结果的具体内容见下方[`INbTransChangeLang`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtranschangelang)的定义  | 需要切换语言时  | `v12.0.0` |
| changeLangSync(lang: string)  | `void`  | 切换语言。lang参数需要和`NB_TRANS_LOADER`中的key值相对应。是一个同步事件。但是并不保证语言切换成功，以及何时成功。  | 适合只想触发切换语言操作，并不关心切换后的结果的场景  | `v12.0.0` |
| getBrowserLang()`deprecated`  | `string ｜ undefined`  | 获取浏览器的首选语言 | 适合只关心浏览器界面语言的场景  | `v12.0.0` |
| NbTransService.getBrowserLang()  | `string ｜ undefined`  | 获取浏览器的首选语言 | 适合只关心浏览器界面语言的场景  | `v12.1.0` |
| getBrowserLangs()`deprecated`  | `readonly string[]｜ undefined`  | 返回一个用户已知语言的数组，并按照优先级排列 | 适合需要知道用户已知语言的场景  | `v12.0.0` |
| NbTransService.getBrowserLangs()  | `readonly string[]｜ undefined`  | 返回一个用户已知语言的数组，并按照优先级排列 | 适合需要知道用户已知语言的场景  | `v12.1.0` |
| translationAsync(key: string, options?: INbTransOptions)  | `Observable<string>`  | 根据key和options异步获取翻译文本。options选填，具体配置见下方[`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions)定义。返回一个观察者对象。获取值后如果未取消订阅，当语言被切换时，将会订阅、获取切换后的语言下的翻译文本  | 适合将订阅事件变量在模板中使用，推荐结合ng官方的`async`管道使用。 | `v12.0.0` |
| translationSync(key: string, options?: INbTransOptions)  | `string`  | 根据key和options同步获取翻译文本。options选填，具体配置见下方[`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions)定义。因为是同步获取，所以返回的获取后的文本内容。当语言被切换时，需要重新调用该方法才能获取切换后的语言下的文本。 | 适合文本内容临时使用，每次显示文本都需要重新获取的场景。比如通过service动态创建modal时，设置modal的title。 | `v12.0.0` |
| subscribeLangChange()  | `Observable<string>`  | 语言切换的订阅事件。返回一个观察者对象。当订阅未取消时，语言被切换时，会自动被订阅到。订阅的内容为切换后的语言值 | 适合需要根据不同语言进行动态调整的地方 | `v12.0.0` |
| subscribeLoadDefaultOver()  | `Observable<boolean>`  | 默认语言翻译文本是否加载完成的订阅事件。加载成功时订阅到的值为true，反之为false。加载完成后（不管是否加载成功）会自动complete，因此可以不用取消订阅 | 适合整个项目最外层的数据准备。当默认语言的翻译文本被加载完成后再显示整个项目，体验效果更好. | `v12.0.0` |

##### Usage
```ts
constructor(private transService: NbTransService) {}

// 切换语言，异步事件，subscribe()是必需的
this.transService.changeLang(lang).subscribe(result=>{
    // result是切换后的结果
});

// 切换语言，同步事件，但不保证语言切换成功
this.transService.changeLangSync(lang);

NbTransService.transService.getBrowserLang(); // 'en'

NbTransService.transService.getBrowserLangs(); // ['en']

// 语言异步翻译。可订阅获取翻译后的值，也可在模板中和async管道结合使用
const trans$ = this.transService.translationAsync('title');
trans$.subscribe(trans=>{
    // trans是翻译后的文本
});

// 语言同步翻译。获取当前语言下的翻译内容
const trans = this.transService.translationSync('title'); // trans是翻译后的文本

// 语言切换订阅。当语言被切换时，会触发订阅事件，得到切换后的语言
this.transService.subscribeLangChange().subscribe(lang=>{
      // lang是切换后的语言值
});

// 默认语言翻译文本加载结束订阅事件。当翻译文本被加载完成时，会触发订阅事件
this.transService.subscribeLoadDefaultOver().subscribe(over=>{
      // over是加载后的结果
});
```

<br>

---

### Components

#### `<nb-trans></nb-trans>`
##### `v12.0.0`
##### 从`v15.1.0`开始为`standalone component`
###### 当翻译文本中含有组件等复杂场景时使用的组件。当语言被切换时，组件渲染的内容将自动更新

##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| components  | `TemplateRef<{ content: string ｜ TemplateRef<any>; list?: INbTransSentencePart[] }>[]` | false | []  | 翻译文本中的对应的组件。  | `v12.0.0` |
| key  | `string` | true | `''`  | 获取翻译文本的key值。自`v16.0.0`起，为必需属性。  | `v12.0.0` |
| options  | `INbTransOptions` | false | {}  | 翻译的配置信息。具体配置见下方的[`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions)定义。  | `v12.0.0` |

##### Usage
```html
<!-- If the key is missing, an error will be reported -->
<nb-trans />
<!-- only trans key -->
<nb-trans key="title" />
<nb-trans [key]="transKey" />

<!-- trans key and options -->
<nb-trans key="title" [options]="options" />
<nb-trans key="helloWorld" [options]="({prefix:'content'})" />

<!-- trans key, options and components -->
<nb-trans [key]="complexContent" [options]="options" [components]="[com1,com2]" />
<ng-template #comp1 let-compContent="content">
  <span>{{compContent}}</span>
</ng-template>
<ng-template #comp2 let-compContent="content" let-compList="list">
  <ng-container *ngTemplateOutlet="compContent,context:{list}" />
</ng-template>
```
```ts
// v15.1.0新增
// 在NgModule中引入
@NgModule({
  imports:[NbTransComponent],
  // ...
})
export class XXXModule{}

// 在standalone component中引入
@Component({
  standalone:true,
  imports:[NbTransComponent],
  // ...
})
export class XXXComponent{}
```

<br>

#### `[nb-trans]`
##### `v16.0.0`
###### 当翻译文本中含有组件等复杂场景时使用的组件。当不想使用"\<nb-trans \/\>"标签元素，而是自己选择原生html标签时使用，比如"\<div \/\>","\<span \/\>"。当语言被切换时，组件渲染的内容将自动更新。

##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| nb-trans | `string` | true | `''`  | 获取翻译文本的key值  | `v16.0.0` |
| nb-trans-components  | `TemplateRef<{ content: string ｜ TemplateRef<any>; list?: INbTransSentencePart[] }>[]` | false | []  | 翻译文本中的对应的组件。  | `v16.0.0` |
| nb-trans-options  | `INbTransOptions` | false | {}  | 翻译的配置信息。具体配置见下方的[`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions)定义。  | `v16.0.0` |

##### Usage
```html
<!-- only trans key -->
<div nb-trans="title"></div>
<div [nb-trans]="transKey"></div>
<!-- other native html tags -->
<span [nb-trans]="transKey"></span>
<p [nb-trans]="transKey"></p>
<h2 [nb-trans]="transKey"></h2>

<!-- trans key and options -->
<div nb-trans="title" [nb-trans-options]="options"></div>
<div nb-trans="helloWorld" [nb-trans-options]="({prefix:'content'})"></div>

<!-- trans key, options and components -->
<div [nb-trans]="complexContent" [nb-trans-options]="options" [nb-trans-components]="[com1,com2]"></div>
<ng-template #comp1 let-compContent="content">
  <span>{{compContent}}</span>
</ng-template>
<ng-template #comp2 let-compContent="content" let-compList="list">
  <ng-container *ngTemplateOutlet="compContent,context:{list}" />
</ng-template>
```
```ts
// imported in NgModule
@NgModule({
  imports:[NbTrans2Component],
  // ...
})
export class XXXModule{}

// imported in standalone component
@Component({
  standalone:true,
  imports:[NbTrans2Component],
  // ...
})
export class XXXComponent{}
```

<br>

#### `[nb-trans-subcontent]`
##### `v12.0.0`
##### 从`v15.1.0`开始为`standalone component`
###### 当翻译文本中含有组件嵌套时使用的一种官方提供的方案(可根据需要有自己的实现方式)，会将嵌套的组件内容渲染出来。selector为attribute，可用于`<div />`, `<span />`, `<a />`，`<ng-container />`等。该组件是搭配`<nb-trans></nb-trans>`使用，请勿单独使用。

##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| nb-trans-subcontent  | `string ｜ TemplateRef<any>` | true | `''`  | 要显示的子内容。接受`string`类型和`TemplateRef`类型。当为`string`类型时，直接渲染出来，`subcontentList`输入参数不起作用。当为`TemplateRef`类型时，`subcontentList`参数将起作用。自`v16.0.0`起，为必需属性 | `v12.0.0` |
| subcontentList  | `INbTransSentencePart[]` | false | []  | 仅当`nb-trans-subcontent`为`TemplateRef`类型时，且该内容为`<nb-trans></nb-trans>`的components输入属性的子内容时有效。`[nb-trans-subcontent]`会将该参数的值传到template的context中。详情见下方Usage  | `v12.0.0` |

##### Usage
```html
<!-- 和配合<nb-trans></nb-trans>使用 -->
<!-- 示例：这是一个句子：<0>组件1</0>.<1> <0>组件2中的组件1</0> 组件2的其他部分 </1>.<2>组件3</2> -->
<nb-trans [key]="complexContent" [components]="[comp1,comp2,comp3]" />
<ng-template #comp1 let-comContent="content" let-list="list">
  <b [nb-trans-subcontent]="comContent" [subcontentList]="list"></b>
</ng-template>
<ng-template #comp2 let-comContent="content" let-list="list">
  <app-widget [comContent]="comContent" [list]="list" />
</ng-template>
<ng-template #comp3 let-comContent="content">
  <b>{{comContent}}</b>
</ng-template>
```
```ts
// v15.1.0新增
// 在NgModule中引入
@NgModule({
  imports:[NbTransSubcontentComponent],
  // ...
})
export class XXXModule{}

// 在standalone component中引入
@Component({
  standalone:true,
  imports:[NbTransSubcontentComponent],
  // ...
})
export class XXXComponent{}
```

<br>

---

### Pipes

#### nbTrans: `transform(key: string, options?: INbTransOptions): string`
##### `v12.0.0`
##### 从`v15.1.0`开始为`standalone component`
###### 翻译文本的管道，可用于在模版中根据key值翻译文本。当语言被切换时，组件渲染的内容将自动更新

##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| key  | `string`  | true  | 翻译文本的key值  | `v12.0.0` |
| options  | `INbTransOptions`  | false  | 翻译配置。具体配置见下方的[`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.CN.md#inbtransoptions)定义  | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `string`  | 翻译后的文本  |

##### Usage
```html
<!-- only key param -->
<div>{{'title'|nbTrans}}</div>

<!-- key and options params -->
<div>{{'title'|nbTrans:options}}</div>
<div>{{'helloWorld'|nbTrans:({prefix:'content'})}}</div>
```
```ts
// v15.1.0新增
// 在NgModule中引入
@NgModule({
  imports:[NbTransPipe],
  // ...
})
export class XXXModule{}

// 在standalone component中引入
@Component({
  standalone:true,
  imports:[NbTransPipe],
  // ...
})
export class XXXComponent{}
```

<br>

---

### Tokens

#### NB_TRANS_DEFAULT_LANG
##### string
##### `v12.0.0`
###### 用于设置默认语言，初始化`NbTransService`实例时将自动加载该语言的文本内容。不设置时默认为`NbTransLang.ZH_CN`。一般只在AppModule设置一次

##### Usage
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_DEFAULT_LANG,
      useValue: NbTransLang.ZH_CN,
    },
    // ...
  ]
```

<br>

#### NB_TRANS_LOADER
##### { [key: string]: INbTransLoader }
##### `v12.0.0`
###### 翻译文本加载器。加载器支持急性加载和懒加载。一般只在AppModule设置一次
- 急性加载：直接引入翻译文本内容，作为值赋给对应的语言。急性加载会增大项目初始化文件的体积.
- 懒加载：通过`http.get()`或者`import()`等方式加载翻译文本文件。当翻译文本文件为`json`格式时，可使用`http.get()`加载。当翻译文本文件为`ts`格式时，可使用`import()`加载。

##### Usage
###### 急性加载
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_LOADER,
      useValue: {
        [NbTransLang.ZH_CN]: zhCNTrans,
        [NbTransLang.EN]: enTrans,
      }
    }
    // ...
  ]
```
###### 懒加载
- 翻译文本文件为json格式
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_LOADER,
      useFactory: (http: HttpClient) => ({
        // dyn load and the content is a json file
        // the loader fn return value can be Observable<Object>/Promise<Object> type
        // [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json').toPromise(),
        [NbTransLang.EN]: () => http.get('./assets/localization/en/translations.json'),
        // [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json').toPromise(),
        [NbTransLang.ZH_CN]: () => http.get('./assets/localization/zh-CN/translations.json'),
      }),
      deps: [HttpClient]
    }
    // ...
  ]
```
- 翻译文本文件为ts格式
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_LOADER,
      useValue: {
        [NbTransLang.EN]: () => import('./localization/en/translations').then(data => data.trans),
        [NbTransLang.ZH_CN]: () => import('./localization/zh-CN/translations').then(data => data.trans),
      }
    }
    // ...
  ]
```

<br>

#### NB_TRANS_MAX_RETRY
##### number
##### `v15.0.0`
#### NB_TRANS_MAX_RETRY_TOKEN
##### number
##### `v12.0.0`, 从`v15.0.0`开始为`@deprecated`
###### 翻译文本加载失败时的最大重试次数，默认为5次。一般只在AppModule设置一次

##### Usage
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_MAX_RETRY,
      useValue: 3
    },
    // ...
  ]
```

<br>

#### NB_TRANS_PARAM_KEY_INVALID_WARNING
##### boolean
##### `v16.0.0`
###### 当 param key 不符合规则时，是否在 console 中打印警告信息。默认为 true。在生产环境下（调用`enableProdMode()`时，也将处于生产模式），将自动关闭打印警告信息的设置。

##### Usage
```ts
  providers: [
    // ...
    {
      provide: NB_TRANS_PARAM_KEY_INVALID_WARNING,
      useValue: false
    },
    // ...
  ]
```

<br>

---

### Interfaces

#### INbTransLoader
##### `v12.0.0`
###### 文本加载器
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [langKey: string]  | `Object ｜ (() => (Observable<Object> ｜ Promise<Object>))`  | false  | key值为字符串类型，通常使用对应的语言的字符串值；value为含有文本的Object，或者返回含有文本的Object的Observable或者Promise | `v12.0.0` |

<br>

#### INbTransOptions
##### `v12.0.0`
###### 翻译配置
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| prefix  | `string`  | false  | key值的前缀。根据key值获取对应文本时，会自动将该值追加在key值之前，形成一个新的key值，并以此来获取文本  | `v12.0.0` |
| params  | `INbTransParams`  | false  | 翻译文本中的参数。为key值为字符串，value值为字符串的对象  | `v12.0.0` |
| returnKeyWhenEmpty  | `boolean`  | false  | 当根据key值获取不到文本时，是否返回key值。默认为true。当显式设为false时，会返回空字符串  | `v12.0.0` |

<br>

#### INbTransParams
##### `v12.0.0`
#### 注意：param `key` 的命名规则
- 自`v16.0.0`起：
1. 由 `字母，数字，_和$`组成；
2. `数字`不能是第一个字符；
###### 翻译文本中的参数
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `string`  | false | key值为字符串类型，value值为字符串类型  | `v12.0.0` |

<br>

#### INbTransChangeLang
##### `v12.0.0`
###### 切换语言的结果
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| result  | `boolean`  | true  | 切换语言的结果。切换成功时为true，否则为false  | `v12.0.0` |
| curLang  | `string`  | true  | 当前语言。如果语言切换失败，则为切换前的语言；否则为切换后的语言  | `v12.0.0` |

<br>

#### INbTransSentencePart
##### `v12.0.0`
###### 句子部分，可能为`string`或者`INbTransSentenceCompPart`类型。为`string`时，即该句子为文本；为`INbTransSentenceCompPart`时，即该句子中含有需要解析的组件。一般交给组件自己处理便可，可不用关心内部逻辑

<br>

#### INbTransSentenceCompPart
##### `v12.0.0`
###### 句子中含有组件的部分
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| index  | `number`  | true  | 组件索引，用于匹配`<nb-trans />`组件的`components`输入属性中的组件  | `v12.0.0` |
| content  | `string`  | true  | 翻译文本  | `v12.0.0` |
| list  | `INbTransSentencePart[]`  | false  | 文本句子的解析部分 | `v12.0.0` |

<br>

---

### Enums
#### NbTransLang
##### `v15.0.0`
#### NbTransLangEnum
##### `v12.0.0`, 从`v15.0.0`开始为`@deprecated`
###### 常用语言枚举。除了默认语言未设置时的默认值外，组件以及服务中均未直接使用该枚举中的值，所以不强制要求使用该枚举。

<br>

#### NbTransSentenceItem
##### `v15.0.0`
#### NbTransSentenceItemEnum
##### `v12.0.0`, 从`v15.0.0`开始为`@deprecated`
###### 句子项类型枚举。在对句子内容进行解析时，会将句子分为`STR`,`COMP`和`MULTI_COMP`这3种类型

<br>

---

### 贡献
> 欢迎提feature和PR，一起使该项目更好

<a href="https://github.com/bigBear713" target="_blank"><img src="https://avatars.githubusercontent.com/u/12368900?v=4" alt="bigBear713" width="30px" height="30px"></a>

<br>

---

### License
MIT