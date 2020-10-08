const API = 'https://ghapi.huchen.dev/spoken_languages'
const axios = require('axios');

const popularLangs = [
    'en',
    'zh',
    'ru',
    'de',
    'fr',
    'ja',
];

(async function () {
    try {
        let resp = await axios.get(API)

        let popular = resp.data.filter(l => popularLangs.includes(l.urlParam)).sort(
            (l, r) => popularLangs.indexOf(l.urlParam) - popularLangs.indexOf(r.urlParam)
        )
        let nonPopular = resp.data.filter(l => !popularLangs.includes(l.urlParam))

        let languagesINHitUPSpec = popular.concat(nonPopular).map(l => ({
            name: l.name,
            value: l.urlParam
        }))
        languagesINHitUPSpec.unshift({
            "name": "All Languages",
            "value": ""
        })
        console.log(JSON.stringify(languagesINHitUPSpec, null, 2));
    } catch (e) {
        console.error(`Failed to request ${API}:`, e)
    }
})()
