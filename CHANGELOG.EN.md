# v12.1.0
## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Services "Services")
### [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtransservice "NbTransService")
- feat: `NbTransService.getBrowserLang()` can the first language of browser directly
- depr: `getBrowserLang()` has been marked as `deprecated`;
- feat: `NbTransService.getBrowserLangs()` can a language array known directly
- depr: `getBrowserLangs()` has been marked as `deprecated`;

# v12.0.0
## [Module](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Module "Module")
- feat: [NbTransModule](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtransmodule) - provide useful `component`, `pipe`
- feat: [NbTransTestingModule](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtranstestingmodule) - provide the env to unit test

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Services "Services")
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtransservice "NbTransService") - provide the translate feature

## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Components "Components")
- feat: [`<nb-trans></nb-trans>`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nb-transnb-trans) - when you need to translate the sentence which include components
- feat: [`[nb-trans-subcontent]`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nb-trans-subcontent) - it is a common solution when the sentence include some nested componets (you can impletement yourself to meet the requirement)

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - the pipe which to tranlate the text

## [Tokens](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Tokens "Tokens")
- feat: [NB_TRANS_DEFAULT_LANG](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nb_trans_default_lang) - set the default langs
- feat: [NB_TRANS_LOADER](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nb_trans_loader) - the loader of translated text
- feat: [NB_TRANS_MAX_RETRY_TOKEN](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nb_trans_max_retry_token) - the max retry time when failure to load translated file

## [Interfaces](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Interfaces "Interfaces")
- feat: [INbTransLoader](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtransloader) - the translated file loader
- feat: [INbTransOptions](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtransoptions) - the config of translation
- feat: [INbTransParams](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtransparams) - the params in the translated text
- feat: [INbTransChangeLang](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtranschangelang) - the result of switching language
- feat: [INbTransSentencePart](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtranssentencepart) - the part of sentence
- feat: [INbTransSentenceCompPart](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#inbtranssentencecomppart) - the part which include component in sentence

## [Enums](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#Enums "Enums")
- feat: [NbTransLangEnum](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtranslangenum) - the enum of common language
- feat: [NbTransSentenceItemEnum](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.EN.md#nbtranssentenceitemenum) - the enum of sentence item