const API = 'https://ghapi.huchen.dev/languages'
const axios = require('axios');

const popularNames = [
    'Python',
    'C',
    'C++',
    'Java',
    'JavaScript',
    'Ruby',
    'PHP',
    'HTML',
    'Rust',
    'Go',
    'Shell',
];

(async function () {
    try {
        let resp = await axios.get(API)
        // console.log('Popular languages:', popularNames);

        let popular = resp.data.filter(l => popularNames.includes(l.name)).sort(
            (l, r) => popularNames.indexOf(l.name) - popularNames.indexOf(r.name)
        )
        let nonPopular = resp.data.filter(l => !popularNames.includes(l.name))

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
