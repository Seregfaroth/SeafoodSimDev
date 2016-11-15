# [jQuery asAccordion](https://github.com/amazingSurge/jquery-asAccordion) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jquery plugin that convent content into accordion.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-asAccordion.js
├── jquery-asAccordion.es.js
├── jquery-asAccordion.min.js
└── css/
    ├── asAccordion.css
    └── asAccordion.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-asAccordion/master/dist/jquery-asAccordion.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-asAccordion/master/dist/jquery-asAccordion.min.js) - minified

#### Install From Bower
```sh
bower install jquery-asAccordion --save
```

#### Install From Npm
```sh
npm install jquery-asAccordion --save
```

#### Install From Yarn
```sh
yarn add jquery-asAccordion
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-asAccordion.git
cd jquery-asAccordion
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-asAccordion` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/asAccordion.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-asAccordion.js"></script>
```

#### Required HTML structure

```html
<div class="example"></div>
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').asAccordion(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-asAccordion/tree/master/examples).

## Options
`jquery-asAccordion` can accept an options object to alter the way it behaves. You can see the default options by call `$.asAccordion.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: 'accordion',
  skin: null,
  mobileBreakpoint: 768,
  initialIndex: 0,
  easing: 'ease-in-out',
  speed: 500,
  direction: 'vertical',
  event: 'click',
  multiple: false
}
```

## Methods
Methods are called on asAccordion instances through the asAccordion method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().asAccordion('destroy');

// or
var api = $().data('asAccordion');
api.destroy();
```

#### enable()
Enable the accordion functions.
```javascript
$().asAccordion('enable');
```

#### disable()
Disable the accordion functions.
```javascript
$().asAccordion('disable');
```

#### destroy()
Destroy the accordion instance.
```javascript
$().asAccordion('destroy');
```

## Events
`jquery-asAccordion` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('asAccordion::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
enable  | Fired when the `enable` instance method has been called.
disable | Fired when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.asAccordion.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-asAccordion.js"></script>
<script>
  $.asAccordion.noConflict();
  // Code that uses other plugin's "$().asAccordion" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-asAccordion` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-asAccordion` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-asAccordion/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-asAccordion.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-asAccordion/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-asAccordion.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-asAccordion
[license]: https://img.shields.io/npm/l/jquery-asAccordion.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-asAccordion.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-asAccordion