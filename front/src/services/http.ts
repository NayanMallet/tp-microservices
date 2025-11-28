export class HttpError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!res.ok) {
    const message = `HTTP error ${res.status}`
    throw new HttpError(message, res.status)
  }

  // si pas de body (204, etc.)
  if (res.status === 204) {
    return undefined as unknown as T
  }

  return (await res.json()) as T
}

export const http = {
  get: <T>(url: string, init?: RequestInit) => request<T>(url, { method: 'GET', ...init }),
  post: <T>(url: string, body: unknown, init?: RequestInit) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body), ...init }),
}
