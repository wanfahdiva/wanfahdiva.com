/**
 * Object to query params
 * @param obj
 * @param prefix
 * @returns string
 */
export type objectToQueryParam = (obj?: Record<string, any>) => string

export const objectToQuery: objectToQueryParam = (obj) => {
  if (!obj) return ''
  const str = []
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(p + '=' + obj[p])
    }
  return str.join('&')
}
