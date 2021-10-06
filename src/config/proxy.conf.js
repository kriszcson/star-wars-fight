const PROXY_CONFIG = [{
    context: ['/characters'],
    target: 'https://developer.webstar.hu/rest/frontend-felveteli/characters/',
    secure: false,
    logLevel: 'debug',
    changeOrigin: "true",
    pathRewrite: { '^/characters': '' }
}, {
    context: ['/api'],
    target: 'https://developer.webstar.hu/rest/frontend-felveteli/authentication/',
    secure: false,
    logLevel: 'debug',
    changeOrigin: "true",
    pathRewrite: { '^/api': '' }
}, {
    context: ['/simulate'],
    target: 'https://developer.webstar.hu/rest/frontend-felveteli/simulate/',
    secure: false,
    logLevel: 'debug',
    changeOrigin: "true",
    pathRewrite: { '^/simulate': '' }
}];

module.exports = PROXY_CONFIG;