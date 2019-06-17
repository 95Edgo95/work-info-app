"use strict";

export const TYPES: any = {
  JSON_ENCODE: "JSON_ENCODE",
  JSON_DECODE: "JSON_DECODE",
  ENCRYPT: "ENCRYPT",
  DECRYPT: "DECRYPT",
  URL_ENCODE: "URL_ENCODE"
};

function urlEncoded(data: any): string {
  const str: string[] = [];

  Object.keys(data).map(key => {
    if (data[key] !== null) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
  });

  return str.join("&");
}

function jsonEncoded(data: any): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    return undefined;
  }
}

function jsonDecoded(data: string): any {
  try {
    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
}

function encrypted(data: any): string {
  return JSON.stringify(data);
}

function decrypted(data: any): string {
  return JSON.parse(data);
}

export default function converter(data: any, type: string | string[], options?: any): any {
  if (Array.isArray(type)) {
    let ret: any = data;

    type.forEach((singleType) => {
      if (Object.keys(TYPES).includes(singleType)) {
        ret = converter(ret, singleType, options);
      }
    });

    return ret;
  } else {
    switch (type) {
      case TYPES.JSON_ENCODE:
        return jsonEncoded(data);
      case TYPES.JSON_DECODE:
        return jsonDecoded(data);
      case TYPES.ENCRYPT:
        return encrypted(data);
      case TYPES.DECRYPT:
        return decrypted(data);
      case TYPES.URL_ENCODE:
        return urlEncoded(data);
      default:
        return data;
    }
  }
}

export function ucfirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1, str.length);
}
