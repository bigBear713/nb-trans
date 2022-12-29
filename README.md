<div align="center">

# @bigbear713/nb-trans

Angular translation lib by bigBear713.

[OnlineDemo](https://bigBear713.github.io/nb-trans/)

[Bug Report](https://github.com/bigBear713/nb-trans/issues)

[Feature Request](https://github.com/bigBear713/nb-trans/issues)

</div>

## Document
- [中文](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md "文档 - 中文")
- [English](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md "Document - English")

## Changelog
- [中文](https://github.com/bigBear713/nb-trans/blob/master/CHANGELOG.md "更新日志 - 中文")
- [English](https://github.com/bigBear713/nb-trans/blob/master/CHANGELOG.EN.md "Changelog - English")

## Feature
- 支持翻译文本懒加载，或者急性加载；
- 支持切换语言时，不刷新页面自动更新翻译文本；
- 支持设置翻译文本加载失败时的重试次数；
- 支持翻译文本中带有参数；
- 支持翻译文本中带有组件的复杂场景；
- 支持组件的更新策略为`ChangeDetectionStrategy.OnPush`;

<br>

## Version
###### nb-trans的大版本和Angular的大版本保持对应关系
- "@bigbear713/nb-trans":"^12.0.0" - "@angular/core": "^12.0.0"
- "@bigbear713/nb-trans":"^13.0.0" - "@angular/core": "^13.0.0"
- "@bigbear713/nb-trans":"^14.0.0" - "@angular/core": "^14.0.0"

<br>

## Installation
```bash
$ npm i @bigbear713/nb-trans
// or
$ yarn add @bigbear713/nb-trans
```

## 启动demo项目
- 安装依赖：
```bash
npm i
```

- 编译nb-trans库
```bash
npm run build:lib
```

- 启动demo项目
```bash
npm start
```

- 部署demo
```bash
npm run build
```

- 启动带有SSR的demo项目
```bash
npm run dev:ssr
```

- 部署带有SSR的demo项目
```bash
npm run build:ssr

npm run serve:ssr
```
## 贡献者
> 欢迎提feature和PR，一起使该项目更好

<a href="https://github.com/bigBear713" target="_blank"><img src="https://avatars.githubusercontent.com/u/12368900?v=4" alt="bigBear713" width="30px" height="30px"></a>

## License
MIT