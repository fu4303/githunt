/**
 * pre-call a function and cache the result for only next use
 * @param fn: the function to be wrapped
 *
 * @example:
 *  loadPrefernce = prefetch(loadPrefernce, 'HitUP:preference:GitHubTrending')
 *  loadPrefernce('HitUP:preference:GitHubTrending')  // should use cache
 *  loadPrefernce('HitUP:preference:GitHubTrending')  // should not use cache
 */
export function prefetch(fn, ...args) {
  let cache = {};

  // do pre-call
  let k = JSON.stringify(args);
  let result = fn(...args);
  cache[k] = result;

  const popfunc = (...args) => {
    let k = JSON.stringify(args);
		if (k in cache) {
      let result = cache[k];
      // because it's only a one-time cache
      delete cache[k];
			return result;
		} else {
			let result = fn(...args);
			return result;
		}
	}

  return popfunc
}
