import {
  ServerAPI
} from 'decky-frontend-lib'


var server: ServerAPI | undefined = undefined

export function setServer(s: ServerAPI) {
  server = s
}

export function resolvePromise(promise: Promise<any>, callback: any) {
  (async () => {
    let response = await promise
    if (response.success)
      callback(response.value);
  })();
}

export async function getQuery() {
  let data = await server!.callPluginMethod<any, any>("getQuery", {})
  return data.result.text
}

export function setQuery(text: string) {
  server!.callPluginMethod("setQuery", {text})
}
