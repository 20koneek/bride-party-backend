import { join } from 'path'

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`)
    }

    return process.env[key] as string
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key]
}

export function getPath(path: string): string {
    return (process.env.NODE_ENV === 'production')
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path)
}

export function getPaths(path: string): [string, ...string[]] {
    return [getPath(path)]
}

export function toNumber(value: string | undefined | null): number {
    return parseInt(value || '', 10)
}

export function toBool(value: string | undefined | null): boolean {
    return value === 'true'
}

export function normalizePort(port: string | undefined | null): number | string | boolean {
    const parsedPort = toNumber(port)

    if (isNaN(parsedPort)) { // named pipe
        return port || ''
    }

    if (parsedPort >= 0) { // port number
        return parsedPort
    }
    return false
}
