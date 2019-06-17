export function isEncoded(uri: string = ""): boolean {
    return uri !== decodeURIComponent(uri);
}

export function generateQueryString(obj: any, startPrefix?: string): string {
  const arrayStr: string[] = [];

  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] && obj[p] !== "undefined") {
      if (Array.isArray(obj[p])) {
        arrayStr.push(generateArrayQueryString(p, obj[p]));
      } else {
        if (isEncoded(obj[p])) {
          arrayStr.push(`${p}=${obj[p]}`);
        } else {
          arrayStr.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      }
    }
  }

  const queryStr: string = arrayStr.filter(queryParam => !!queryParam).join("&");

  if (!queryStr.length) {
    return "";
  }

  return typeof startPrefix === "string" ? startPrefix + queryStr : queryStr;
}

export function generateArrayQueryString(key: string, array: string[]): string {
  if (array.length === 0) {
    return "";
  }

  let str: string = `${encodeURIComponent(key)}=${encodeURIComponent(array[0])}`;

  for (let i: number = 1; i < array.length; i++) {
    str += `&${encodeURIComponent(key)}=${encodeURIComponent(array[i])}`;
  }

  return str;
}

export function getQueryParams(): any {
  const queryParams: any = {};
  const queryStr: string = location.search;

  if (queryStr) {
    const queryItems: any[] = queryStr.split("?").pop().split("&");

    queryItems.forEach(query => {
      let [key, value]: Array<string | number> = query.split("=");

      if (isEncoded(`${key}`)) {
        key = decodeURIComponent(`${key}`);
      }

      if (isEncoded(`${value}`)) {
        value = decodeURIComponent(`${value}`);
      }

      value = Number.isNaN(+value) ? value : +value;

      if (typeof queryParams[key] !== "undefined") {
        if (Array.isArray(queryParams[key])) {
          queryParams[key].push(value);
        } else {
          queryParams[key] = [queryParams[key], value];
        }
      } else {
        queryParams[key] = value;
      }

      if (`${key}`.includes("_ids") && !Array.isArray(queryParams[key])) {
        queryParams[key] = [queryParams[key]];
      }
    });
  }

  return queryParams;
}

