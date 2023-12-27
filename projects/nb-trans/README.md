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
- Support to direct/lazing loading translated file;
- Support to update translated content in page directly and no need to reload page;
- Support to reset the max retry time when failure to load the translated file;
- Support there are some params in translated sentence;
- Support there are some components in the translated sentence;
- Support the changeDetection of components as `ChangeDetectionStrategy.OnPush`;
- Support to used in `standalone component`;
- Support to be imported as a `standalone component`;

<br>

---

## Version
###### The nb-trans's major version will keep up with the Angular's major version
| @bigbear713/nb-trans  | @angular/core |
| ---                   | ---           |
| ^12.0.0               | ^12.0.0       |
| ^13.0.0               | ^13.0.0       |
| ^14.0.0               | ^14.0.0       |
| ^15.0.0               | ^15.0.0       |
| ^16.0.0               | ^16.0.0       |
| ^17.0.0               | ^17.0.0       |

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
###### Translation module. After importing the module, you can use the `component`，`pipe`. And `service` also can be used if you don't import the module, the default is root.

#### NbTransTestingModule
###### Translation test module, it is for Unit Test.

<br>

---

### Services

#### NbTransService
##### `v12.0.0`
###### It is a `service` to provide the translate feature.

##### Properties
| Properties  | Type  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ |
| lang  | `string`  | Current language value  | `v12.0.0` |
| loadDefaultOver  | `boolean`  | Whether the translated file of the default language is loaded  | `v12.0.0` |

##### Methods
| Name  | Return  | Description  | Scenes  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| changeLang(lang: string)  | `Observable<INbTransChangeLang>`  | Switch language. The lang param should be same as the key of `NB_TRANS_LOADER`. It is an Observable event. The result will not be returned until the translated text of the switched language has been loaded. It does not need to unsubscribe, because it will auto be completed when switching the language, whether it is success or failure to switch. The details return result follow the definition of [`INbTransChangeLang`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtranschangelang) below.  | When  you need to swithc language  | `v12.0.0` |
| changeLangSync(lang: string)  | `void`  | Switch language. The lang param should be same as the key of `NB_TRANS_LOADER`. It is a sync event, but it is not guaranteed to succeed and when to success.  | When you just want to do the switch behavior, don't care about the result of it.  | `v12.0.0` |
| getBrowserLang()`deprecated`  | `string ｜ undefined`  | Get the first language of browser | When you only want to know what is the language of browser page  | `v12.0.0` |
| NbTransService.getBrowserLang()  | `string ｜ undefined`  | Get the first language of browser | When you only want to know what is the language of browser page  | `v12.1.0` |
| getBrowserLangs()`deprecated`  | `readonly string[]｜ undefined`  | Get a language array known to the user, by order of preference | If you need to known the languages known to the user | `v12.0.0` |
| NbTransService.getBrowserLangs()  | `readonly string[]｜ undefined`  | Get a language array known to the user, by order of preference | If you need to known the languages known to the user | `v12.1.0` |
| translationAsync(key: string, options?: INbTransOptions)  | `Observable<string>`  | Get translated text asynchronously based on key and options. The options params is optional, the detail configs follow the definition of [`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtransoptions) below. And the return value is Observable. When it has not been unsubscribed, switching the language, the translated text will be subscribed so that getting the newest text. Don't forget to unsubscribe it | You can use the observable value in template. And it is recormmend to use it with `async` pipe.  | `v12.0.0` |
| translationSync(key: string, options?: INbTransOptions)  | `string`  | Synchronously get translated text according to key and options. The options params is optional, the detail configs follow the definition of [`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtransoptions) below. Because it is sync function, the translated text will be return immediately. When switching the language, you should recall the function to get the new lang's translated text | The text for temporary use, like when creating a modal via service, and setting the title of the modal. | `v12.0.0` |
| subscribeLangChange()  | `Observable<string>`  | An subscribe event of switching language. It will return an Observable value, so you can know the newest lang immediately if it does not be unsubscribed when the language has been switched. | When you should do something when the lang has been switched. | `v12.0.0` |
| subscribeLoadDefaultOver()  | `Observable<boolean>`  | Whethe the translated file of default lang has been load over. If success to load the file, you will subscribe true value, otherwise it is false. It will auto be completed after loading over (success or not), so you do not need to unsubscribe it | When preparing the date of whole project, you can use it. It better to display the tranlated content when user view the page. | `v12.0.0` |


##### Usage
```ts
constructor(private transService: NbTransService) {}

// switch language, async event, here need to call subscribe()
this.transService.changeLang(lang).subscribe(result=>{
    // the result after switching language
});

// switch language, sync event, not guaranteed to succeed
this.transService.changeLangSync(lang);

NbTransService.transService.getBrowserLang(); // 'en'

NbTransService.transService.getBrowserLangs(); // ['en']

// async to translate text. can subscribe the translated text, also can use it with async pipe in template
const trans$ = this.transService.translationAsync('title');
trans$.subscribe(trans=>{
    // trans is the text which is translated
});

// sync to tranlate text
const trans = this.transService.translationSync('title'); // trans is the text which is translated

// subscribe lang change, when the language has been switched, here can be done and get the newest language
this.transService.subscribeLangChange().subscribe(lang=>{
      // the lang is the newest language
});

// subscribe the default lang's translation file over. when load over, it will be done, and get the load result
this.transService.subscribeLoadDefaultOver().subscribe(over=>{
      // the over is the result of the load event
});
```

<br>

---

### Components

#### `<nb-trans></nb-trans>`
##### `v12.0.0`
##### Be a `standalone component` from `v15.1.0`
###### When you need to translate the sentence which include components. When the lang has been switched, the content will auto be updated.
##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| components  | `TemplateRef<{ content: string ｜ TemplateRef<any>; list?: INbTransSentencePart[] }>[]` | false | [] |  The corresponding component in the translated text.  | `v12.0.0` |
| key  | `string` | true | `''`  | The key to get translated text. The prop is required start from `v16.0.0`.  | `v12.0.0` |
| options  | `INbTransOptions` | false | {}  | The options of translation. The detail config follow the below definition of [`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtransoptions) | `v12.0.0` |

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
// New in the v15.1.0
// imported in NgModule
@NgModule({
  imports:[NbTransComponent],
  // ...
})
export class XXXModule{}

// imported in standalone component
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
###### When you need to translate the sentence which include components. When you don't want to use "\<nb-trans \/\>" tag, and want to use the native html tag, such as "\<div \/\>", "\<span \/\>". When the lang has been switched, the content will auto be updated.
##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| nb-trans | `string` | true | `''`  | The key to get translated text  | `v16.0.0` |
| nb-trans-components  | `TemplateRef<{ content: string ｜ TemplateRef<any>; list?: INbTransSentencePart[] }>[]` | false | []  |  The corresponding component in the translated text.  | `v16.0.0` |
| nb-trans-options  | `INbTransOptions` | false | {} | The options of translation. The detail config follow the below definition of [`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtransoptions) | `v16.0.0` |

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
<div nb-transkey="title" [nb-transoptions]="options"></div>
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
##### Be a `standalone component` from `v15.1.0`
###### It is a common solution when the sentence include some nested componets (you can impletement yourself to meet the requirement). It will render the nested content. The selector is attribute,  and can be used in `<div />`, `<span />`, `<a />`，`<ng-container />` and others. The component is used with `<nb-trans></nb-trans>`, don't use it alone.

##### Input
| Name  | Type | Mandatory | Default  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| nb-trans-subcontent  | `string ｜ TemplateRef<any>` | true | `''`  | The content will be rendered. It accept the `string` or `TemplateRef` type. When the content is `string`, it will be render directly, and the input property: `subcontentList` will be ignored. When the content is `TemplateRef`, the `subcontentList` param will work. The prop is required start from `v16.0.0`.  | `v12.0.0` |
| subcontentList  | `INbTransSentencePart[]` | false | []  | Only when the `nb-trans-subcontent` is `TemplateRef`, and the content is the input property of `<nb-trans></nb-trans>`, it will work. The `[nb-trans-subcontent]` component will use it as the template's context.  | `v12.0.0` |

##### Usage
```html
<!-- used with <nb-trans></nb-trans> component -->
<!-- demo: This is a sentence: <0>component1</0>.<1> <0>component1 of component2</0> other part of component2 </1>.<2>component3</2> -->
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
// New in the v15.1.0
// imported in NgModule
@NgModule({
  imports:[NbTransSubcontentComponent],
  // ...
})
export class XXXModule{}

// imported in standalone component
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
##### Be a `standalone component` from `v15.1.0`
###### The pipe which to tranlate the text. It can be used in template, and get the translated text via key. When the language has been switched, the content in here will auto be updated.
##### Params
| Name  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| key  | `string`  | true  | The key to get tranlated text  | `v12.0.0` |
| options  | `INbTransOptions`  | false  | The translated config. The detail configs follow the definition of [`INbTransOptions`](https://github.com/bigBear713/nb-trans/blob/main/projects/nb-trans/README.md#inbtransoptions) below  | `v12.0.0` |

##### Return
| Type  | Description  |
| ------------ | ------------ |
| `string`  | The translated text  |

##### Usage
```html
<!-- only key param -->
<div>{{'title'|nbTrans}}</div>

<!-- key and options params -->
<div>{{'title'|nbTrans:options}}</div>
<div>{{'helloWorld'|nbTrans:({prefix:'content'})}}</div>
```
```ts
// New in the v15.1.0
// imported in NgModule
@NgModule({
  imports:[NbTransPipe],
  // ...
})
export class XXXModule{}

// imported in standalone component
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
###### The default lang. When initial the instance of `NbTransService`, it will auto to load the default lang's translated content. The value is `NbTransLang.ZH_CN` when you do not set it in AppModule. It will be set in AppModule in common

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
###### The loader of translated text. Support to direct/lazing load. It will be set in AppModule in common
- Direct load: import the translated text directly, and used to be the value of the language. Direct load will make the init files size be bigger.
- Lazing load: load the translated file via `http.get()` or `import()`. When the file's format is `json`, you can use `http.get()` to load. 

##### Usage
###### Direct load
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
###### Lazing load
- When the file is json format
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
- When the file is ts format
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
##### `v12.0.0`, `@deprecated` from `v15.0.0`
###### The max retry time when failure to load translated file. The default is 5. It will be set in AppModule in common.
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
###### Whether to print a warning info in the console, when a param key is invalid. The default is true. The print of the warning info will auto be turned off in prod env (It is in prod env when calling `enableProdMode()`).

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
###### The translated file loader
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [langKey: string]  | `Object ｜ (() => (Observable<Object> ｜ Promise<Object>))`  | false  | The key is string type, the value is the language in common. The value of loader is object which include the translated text, or is Observable/Promise which will return the object which include the translated text. | `v12.0.0` |

<br>

#### INbTransOptions
##### `v12.0.0`
###### The config of translation
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| prefix  | `string`  | false  | The prefix of trans key. The prefix value will be append to the front of the key. So there is a new key and will be used to get translated text.  | `v12.0.0` |
| params  | `INbTransParams`  | false  | The params in the translated text.  | `v12.0.0` |
| returnKeyWhenEmpty  | `boolean`  | false  | It is used to config whether to return key value when can't get the translated text by the key. The default is true. When you set it as false, it will return whitespace string.  | `v12.0.0` |

<br>

#### INbTransParams
##### `v12.0.0`
#### Attention: the naming rules about param key:
- start from `v16.0.0`:
1. Consists of `letters, numbers, _, and $`
2. The `number` can't be the first character
###### The params in the translated text
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [key: string]  | `string`  | false  | The key and value are string type | `v12.0.0` |

<br>

#### INbTransChangeLang
##### `v12.0.0`
###### The result of switching language
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| result  | `boolean`  | true  | The result of switching language. It is true when success to switch, otherwise it is false  | `v12.0.0` |
| curLang  | `string`  | true  | Current language. If failure to switch language, it is the previous language, otherwise it is the language you want. | `v12.0.0` |

<br>

#### INbTransSentencePart
##### `v12.0.0`
###### The sentence part, it may be `string` or `INbTransSentenceCompPart` type. The sentence is string when it is `string`; The sentence include component and need to be parsed when it is `INbTransSentenceCompPart`. The component can handle it in common, you do not need to concern the logic

<br>

#### INbTransSentenceCompPart
##### `v12.0.0`
###### The part which include component in sentence
| Property  | Type  | Mandatory  | Description  | Version |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| index  | `number`  | true  | The index of components which is the input prop `components` of `<nb-trans />`  | `v12.0.0` |
| content  | `string`  | true  | The translated text content  | `v12.0.0` |
| list  | `INbTransSentencePart[]`  | false  | The parsed content of sentence | `v12.0.0` |

<br>

---

### Enums
#### NbTransLang
##### `v15.0.0`
#### NbTransLangEnum
##### `v12.0.0`, `@deprecated` from `v15.0.0`
###### The enum of common language. You can not use it if you don't like, because only use it to set the default lang in lib (you can overwrite it), it is not used anywhere.

<br>

#### NbTransSentenceItem
##### `v15.0.0`
#### NbTransSentenceItemEnum
##### `v12.0.0`, `@deprecated` from `v15.0.0`
###### The enum of sentence item. When parsing the translated sentence, it will be as the type:`STR`, `COMP` or `MULTI_COMP`.

<br>

---

### Contribution
> Feature and PR are welcome to make this project better together

<a href="https://github.com/bigBear713" target="_blank"><img src="https://avatars.githubusercontent.com/u/12368900?v=4" alt="bigBear713" width="30px" height="30px"></a>

<br>

---

### License
MIT
