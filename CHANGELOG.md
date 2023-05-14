# v16.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^16.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^16.0.0`;
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService") - Limit the naming rules about params's key: Consists of `letters, numbers, _, and $`, and the number can't be the first character;

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
- refactor: [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService") - Refactor the function for handling the dynamic params in translated string;

## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Components "Components")
- feat: [`[nb-trans]`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-trans) - Add the component which the selector is `[nb-trans]`;
- perf: [`<nb-trans />`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-transnb-trans) - Use the UnsubscribeService to manage the rxjs subscription;
- fix: [`<nb-trans />`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-transnb-trans) - Fix the bug about the trans result is wrong in some case: [issue/28](https://github.com/bigBear713/nb-trans/issues/28)；

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.CN.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.CN.md#nbtrans-transformkey-string-options-inbtransoptions-string) - Use the UnsubscribeService to manage the rxjs subscription;

---

# v15.1.0
## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Components "Components")
- feat: [`<nb-trans></nb-trans>`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-transnb-trans) - Support to be imported as a `standalone component`
- feat: [`[nb-trans-subcontent]`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-trans-subcontent) - Support to be imported as a `standalone component`

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtrans-transformkey-string-options-inbtransoptions-string) - Support to be imported as a `standalone component`

---

# v15.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^15.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^15.0.0`;

## Dependencies
- feat: Upgrade `uuid` to `^9.0.0`;

## [Tokens](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Tokens "Tokens")
- feat: Add [NB_TRANS_MAX_RETRY](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb_trans_max_retry), mark `NB_TRANS_MAX_RETRY_TOKEN` as `deprecated`;

## [Enums](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Enums "Enums")
- feat: Add [NbTransLang](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtranslang), mark `NbTransLangEnum` as `deprecated`;
- feat: Add [NbTransSentenceItem](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtranssentenceitem), mark `NbTransSentenceItemEnum` as `deprecated`;

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
- refactor: optimize [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService");

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Pipes "Pipes")
- refactor: optimize [nbTrans](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtrans-transformkey-string-options-inbtransoptions-string);

---

# v14.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^14.0.0`;
- feat: Upgrade `@bigbear713/nb-common` to `^14.0.0`;

---

# v13.0.1
## Breaking Changes
- fix: Update the version of `nb-common` as `^13.0.0`;

---

# v13.0.0
## Breaking Changes
- feat: Upgrade `angular` to `^13.0.0`;

---

# v12.1.0
## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
### [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService")
- feat: `NbTransService.getBrowserLang()` can the first language of browser directly
- depr: `getBrowserLang()` has been marked as `deprecated`;
- feat: `NbTransService.getBrowserLangs()` can a language array known directly
- depr: `getBrowserLangs()` has been marked as `deprecated`;

---

# v12.0.0
## [Module](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Module "Module")
- feat: [NbTransModule](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransmodule) - provide useful `component`, `pipe`
- feat: [NbTransTestingModule](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtranstestingmodule) - provide the env to unit test

## [Services](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Services "Services")
- feat: [NbTransService](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtransservice "NbTransService") - provide the translate feature

## [Components](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Components "Components")
- feat: [`<nb-trans></nb-trans>`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-transnb-trans) - when you need to translate the sentence which include components
- feat: [`[nb-trans-subcontent]`](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb-trans-subcontent) - it is a common solution when the sentence include some nested componets (you can impletement yourself to meet the requirement)

## [Pipes](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Pipes "Pipes")
- feat: [nbTrans](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtrans-transformkey-string-options-inbtransoptions-string) - the pipe which to tranlate the text

## [Tokens](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Tokens "Tokens")
- feat: [NB_TRANS_DEFAULT_LANG](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb_trans_default_lang) - set the default langs
- feat: [NB_TRANS_LOADER](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb_trans_loader) - the loader of translated text
- feat: [NB_TRANS_MAX_RETRY](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nb_trans_max_retry) - the max retry time when failure to load translated file

## [Interfaces](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Interfaces "Interfaces")
- feat: [INbTransLoader](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtransloader) - the translated file loader
- feat: [INbTransOptions](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtransoptions) - the config of translation
- feat: [INbTransParams](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtransparams) - the params in the translated text
- feat: [INbTransChangeLang](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtranschangelang) - the result of switching language
- feat: [INbTransSentencePart](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtranssentencepart) - the part of sentence
- feat: [INbTransSentenceCompPart](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#inbtranssentencecomppart) - the part which include component in sentence

## [Enums](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#Enums "Enums")
- feat: [NbTransLang](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtranslang) - the enum of common language
- feat: [NbTransSentenceItem](https://github.com/bigBear713/nb-trans/blob/master/projects/nb-trans/README.md#nbtranssentenceitem) - the enum of sentence item