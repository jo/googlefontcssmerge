# googlefontcssmerge
Download google font css with different user agents and combine src attributes.

## Installation
`npm install googlefontcssmerge`

## Library Usage
```js
var googlefontcssmerge = require('googlefontcssmerge')

googlefontcssmerge('http://fonts.googleapis.com/css?family=Open+Sans', function(error, style) {
  // style is now a reworkcss object,
  // see https://github.com/reworkcss/css
})
```

## Client Usage
```sh
googlefontcssmerge http://fonts.googleapis.com/css?family=Open+Sans
```
outputs a css definition:
```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans'), local('OpenSans'), url(http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3fY6323mHUZFJMgTvxaG2iE.eot), url(http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2) format('woff2'), url(http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff) format('woff'), url(http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff) format('woff'), url(http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3SZ2oysoEQEeKwjgmXLRnTc.ttf) format('truetype'), url(http://fonts.gstatic.com/l/font?kit=cJZKeOuBrn4kERxqtaUH3Zbd9NUM7myrQQz30yPaGQ4#OpenSans) format('svg');
}
```

(c) 2015 Johannes J. Schmidt, TF  
MIT License
