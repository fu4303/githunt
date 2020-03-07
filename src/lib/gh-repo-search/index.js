import {baseQuery} from './query-tmpl';
import TinyCache from 'tinycache';
import {realizePeriod} from 'lib/date-period';

let cache = new TinyCache();

export default async function repoSearch({
  accessToken,
  qwords='',
  fork=true,
  first=30,  // i.e. page-size
  after=null,
  createdPeriod=null,
  searchIn=['name', 'description'],
  language=null,
  topic=null,
  license=null,
  sort='stars-desc',
}) {
  if (!accessToken) {
    throw new Error('Access token is required to access GitHub GraphQL API v4.')
  }

  console.log(realizePeriod(createdPeriod));

  function buildQstr() {
    const qparts = [];
    if (qwords) {
      qparts.push(qwords)
    }
    // qparts.push(`is:public`)
    if (fork) {
      qparts.push(`fork:true`)
    }
    if (sort && sort.startsWith('stars')) {
      qparts.push(`stars:>0`)
      // NOTE: without `stars:>0` the first item of seach result canbe random!
    }
    if (topic) {
      qparts.push(`topic:${topic}`)
    }
    if (language) {
      qparts.push(`language:${language}`)
    }
    if (sort) {
      qparts.push(`sort:${sort}`)
    }
    if (qwords && searchIn && searchIn.length) {
      qparts.push(`in:${searchIn.join(',')}`)
    }

    return qparts.join(' ')
  }

  const gqlVars = {
    "qstr": buildQstr(),
    "first": first,
    "after": after || null,
  }
  const cacheKey = `qstr:${gqlVars.qstr};first:${gqlVars.first};after:${gqlVars.after}`
  const reqBody = JSON.stringify({
    query: baseQuery,
    variables: gqlVars,
  })

  console.debug(
    `Searching GitHub repos with query: ` +
    `${baseQuery}\nvariables: ${JSON.stringify(gqlVars)}` +
    `\nCache key: "${cacheKey}"`
  );

  let data = cache.get(cacheKey);
  if (data) {
    return data
  }

  const resp = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: reqBody,
  })
  data = await resp.json()
  cache.put(cacheKey, data, 1000 * 300)

  return data
}
