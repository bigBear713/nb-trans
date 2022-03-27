# v12.1.0
## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Services "Services")
### [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtransservice "NbTransService")
- feat: `NbTransService.getBrowserLang()` can the first language of browser directly
- depr: `getBrowserLang()` has been marked as `deprecated`;
- feat: `NbTransService.getBrowserLangs()` can a language array known directly
- depr: `getBrowserLangs()` has been marked as `deprecated`;

# v12.0.0
## [Module](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Module "Module")
- feat: NbTransModule - provide useful `component`, `pipe`
- feat: NbTransTestingModule - provide the env to unit test

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Services "Services")
- feat: NbTransService - provide the translate feature

## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Components "Components")
- feat: `<nb-trans></nb-trans>` - when you need to translate the sentence which include components
- feat: `[nb-trans-subcontent]` - it is a common solution when the sentence include some nested componets (you can impletement yourself to meet the requirement)

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Pipes "Pipes")
- feat: nbTrans - the pipe which to tranlate the text

## [Tokens](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Tokens "Tokens")
- feat: NB_TRANS_DEFAULT_LANG - set the default langs
- feat: NB_TRANS_LOADER - the loader of translated text
- feat: NB_TRANS_MAX_RETRY_TOKEN - the max retry time when failure to load translated file

## [Interfaces](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Interfaces "Interfaces")
- feat: INbTransLoader - the translated file loader
- feat: INbTransOptions - the config of translation
- feat: INbTransParams - the params in the translated text
- feat: INbTransChangeLang - the result of switching language
- feat: INbTransSentenceCompPart - the part which include component in sentence

## [Enums](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Enums "Enums")
- feat: NbTransLangEnum - the enum of common language
- feat: NbTransSentenceItemEnum - the enum of sentence item