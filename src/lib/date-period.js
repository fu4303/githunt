/**
 * A date period object is like below:
 *  { start: <startDate>, end: <endDate>}
 * Or:
 *  { spec: "Last 7 Days"}
 */


export function humanizePeriod(period) {
  throw new Error('Not Implemented')
}

/**
 * @example "Last 7 Days" => {start: "2018-01-01", end: "2018-01-08"}
 */
export function parsePeriodSpec(spec) {
  const lastNPat = /^Last\s(\d+)\s(Day|Week|Month|Year)s$/i;
  const pastPat = /^Past\s(Day|Week|Month|Year)$/i;

  let unit, N;

  let mat = lastNPat.exec(spec)
  if (mat) {
    N = parseInt(mat[1])
    unit = mat[2].toLocaleLowerCase()
  } else if ((mat = pastPat.exec(spec), mat)) {
    N = 1
    unit = mat[1].toLocaleLowerCase()
  } else if (spec.toLocaleLowerCase() === 'total history') {
    return {start: new Date('2007-10-29'), end: new Date()}
  } else {
    throw new Error(`Unknown date-period spec: ${spec}`)
  }

  const today = new Date()
  const preDate = new Date(today)
  switch (unit) {
    case 'day':
      preDate.setDate(preDate.getDate() - N)
      break;
    case 'week':
      preDate.setDate(preDate.getDate() - N*7)
      break;
    case 'month':
      preDate.setMonth(preDate.getMonth() - N)
      break;
    case 'year':
      preDate.setFullYear(preDate.getFullYear() - N);
      break;
    default:
      break;
  }

  return {start: preDate, end: today}
}

export function realizePeriod({spec, start, end}) {
  if (!spec && start && end) {
    return {start, end}
  }

  const parsed = parsePeriodSpec(spec)
  return {
    spec: spec,
    start: parsed.start,
    end: parsed.end,
  }
}

export function getYesterday() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return d
}

export function getLastNDaysPeriod(N=7) {
  var today = new Date()
  var preDay = new Date()
  preDay.setDate(preDay.getDate() - N)
  return {
    start: preDay, end: today
  }
}
