var css = require('css')
var request = require('request')
var async = require('async')


// from
// http://stackoverflow.com/questions/25011533/google-font-api-uses-browser-detection-how-to-get-all-font-variations-for-font
var userAgents = [
  // For .eot use these user agents:
  // IE8
  'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)',
  // IE7
  // 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',

  // For .woff2 use these user agents:
  // Firefox 36.0
  'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0',

  // For .woff use these user agents:
  // Safari 6.0
  'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
  // Internet Explorer 11.0
  // 'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  // Internet Explorer 10.0
  // 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
  // Internet Explorer 9.0
  // 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US))',

  // For .ttf use these user agents:
  // Safari 5.0.5
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
  // Safari 3.1
  // 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-gb) AppleWebKit/526+ (KHTML, like Gecko) Version/3.1 iPhone',

  // I found another .ttf when trying other user agents. Not sure what the
  // difference is.
  // Safari 4.1
  // 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-en) AppleWebKit/533.16 (KHTML, like Gecko) Version/4.1 Safari/533.16',
  // Firefox 5.0
  // 'Mozilla/5.0 (X11; Linux) Gecko Firefox/5.0',
  // Firefox 3.5.9
  // 'Mozilla/5.0 (Windows; U; Windows NT 6.1; et; rv:1.9.1.9) Gecko/20100315 Firefox/3.5.9',
  // Safari 3.1.1
  // 'Mozilla/5.0 (Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_0_1 like Mac OS X; fr-fr) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5G77 Safari/525.20',

  // For .svg use these user agents:
  // Safari 4.0.4
  'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc',
  // Safari 3.0
  // 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1C25 Safari/419.3',
  // Safari 3.0
  // 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3'
]


module.exports = function(url, done) {
  async.map(userAgents, function(userAgent, next) {
    request({
      url: url,
      headers: {
        'User-Agent': userAgent
      }
    }, next)
  }, function(error, responses) {
    if (error) return done(error)

    var rules = []

    var styles = responses
      .map(function(response) {
        return css.parse(response.body)
      })

    styles.forEach(function(style) {
      style
        .stylesheet
        .rules
        .forEach(function(rule, i) {
          rules[i] = rules[i] || {
            locals: [],
            urls: []
          }

          rule.declarations
            .filter(function(declaration)  {
              return declaration.property === 'src'
            })
            .map(function(declaration) {
              return declaration.value.split(/,\s*/)
            })
            .forEach(function(source) {
              source.forEach(function(value) {
                if (value.match(/^local/) && rules[i].locals.indexOf(value) === -1) {
                  rules[i].locals.push(value)
                }
                if (value.match(/^url/) && rules[i].urls.indexOf(value) === -1) {
                  rules[i].urls.push(value)
                }
              })
            })
      })
    })

    var style = styles.pop()

    rules.forEach(function(rule, i) {
      style
        .stylesheet
        .rules[i]
        .declarations
        .filter(function(declaration) { return declaration.property === 'src' })[0]
        .value = rule.locals.concat(rule.urls).join(', ')
    })


    done(null, style)
  })
}
