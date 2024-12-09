import debug from "debug"

const appNamespace = "app"

export const log = debug(`${appNamespace}:log`)
export const warn = debug(`${appNamespace}:warn`)
export const error = debug(`${appNamespace}:error`)