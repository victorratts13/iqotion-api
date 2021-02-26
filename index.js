const botrest = require('botrest');
const rest = new botrest('https://iqoption.com/', null);
const qs = require('qs')
const WebSocket = require('ws');
const WSS = new WebSocket('wss://iqoption.com/echo/websocket')
var head = {
    //'Host': 'auth.iqoption.com',
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
    //'Content-Type': 'application/json',
    //'Origin': 'https://login.iqoption.com',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    //'Referer': 'https://login.iqoption.com/',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'

}

class iqoption {
    constructor(email, pass) {
        this.email = email;
        this.pass = pass;
    }

    login(email, pass) {
        return new Promise((resolve, reject) => {
            head.Host = 'auth.iqoption.com'
            head.Origin = 'https://login.iqoption.com'
            head.Referer = 'https://login.iqoption.com/'
            if (email == true && pass !== undefined) {
                var data = qs.stringify({
                    "identifier": email,
                    "password": pass
                })
            } else {
                var data = qs.stringify({
                    "identifier": this.email,
                    "password": this.pass
                })
            }

            rest.postFormData('https://auth.iqoption.com/api/v2/login', data, null, head, null).then(lg => {
                return resolve(lg)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    appinit() {
        return new Promise((resolve, reject) => {
            rest.get('/api/appinit', null, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    routeTranslation(groups, language) {
        return new Promise((resolve, reject) => {
            rest.get('/api/lang/route-translations', { groups: groups, route: language }, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    configuration() {
        return new Promise((resolve, reject) => {
            rest.get('/api/configuration', null, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    countries() {
        return new Promise((resolve, reject) => {
            rest.get('/api/v4/countries', null, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    lang() {
        return new Promise((resolve, reject) => {
            rest.get('/api/lang/routes', null, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    features(category) {
        return new Promise((resolve, reject) => {
            rest.get('/api/v2/features', { category: category }, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    timezone() {
        return new Promise((resolve, reject) => {
            rest.get('/api/timezones2', null, head).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    events(replaced = {}) {
        return new Promise((resolve, reject) => {
            head.Host = 'event.iqoption.com'
            head.Origin = 'https://iqoption.com'
            head.Referer = 'https://iqoption.com/'
            head['Content-Type'] = 'application/json'
            head['Accept-Encoding'] = 'gzip, deflate, br'
            head['X-Action'] = 'bulk'
            head.Accept = '*/*'
            head['Accept-Language'] = 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'

            rest.postFormData('/api/v1/events', JSON.stringify(replaced), null, head, null).then(app => {
                return resolve(app)
            }).catch(e => {
                return reject(e.response)
            })
        })
    }

    checkSession(ssid) {
        return new Promise((resolve, reject) => {
            head.Host = 'auth.iqoption.com'
            head.Origin = 'https://login.iqoption.com'
            head.Referer = 'https://login.iqoption.com/'
            if (ssid == true || ssid !== undefined) {
                rest.get('https://auth.iqoption.com/api/v4/check-session', null, head).then(ch => {
                    return resolve(ch)
                }).catch(e => {
                    return reject(e.response)
                })
            } else {
                rest.postFormData('https://auth.iqoption.com/api/v2/login', qs.stringify({
                    "identifier": this.email,
                    "password": this.pass
                }), null, head, null).then(() => {
                    rest.get('https://auth.iqoption.com/api/v4/check-session', null, head).then(ch => {
                        return resolve(ch)
                    }).catch(e => {
                        return reject(e.response)
                    })
                }).catch(e => {
                    return reject(e.response)
                })
            }
        })
    }

    ws = {
        handle: function connect(callback) {
            WSS.on('message', data => {
                callback(data)
            })
        },

        push: function send(message = {}, callback) {
            WSS.send(JSON.stringify(message), err => {
                if(err) 
                    callback({status: 'err', info: err})
                else 
                    callback({status: 'success', info: message})
            })
        }
    }


}

module.exports = iqoption;