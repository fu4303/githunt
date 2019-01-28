const API = 'https://github-trending-api.now.sh/languages'
const axios = require('axios');


(async function () {
    try {
        let resp = await axios.get(API)
        let popular = resp.data.popular
        let popularNames = popular.map(l => l.name)
        // console.log('Popular languages:', popularNames);

        let nonPopular = resp.data.all.filter(l => !popularNames.includes(l.name))

        let languagesINHitUPSpec = popular.concat(nonPopular).map(l => ({
            title: l.name,
            value: l.name.replace(/\s/g, '-')
        }))
        languagesINHitUPSpec.unshift({
            "title": "All Languages",
            "value": ""
        })
        console.log(JSON.stringify(languagesINHitUPSpec, null, 2));
    } catch (e) {
        console.error(`Failed to request ${API}:`, e)
    }
})()
