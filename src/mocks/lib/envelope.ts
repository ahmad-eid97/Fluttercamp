/**
 * The backend wraps every response in this envelope. The mock adapter returns it
 * as the axios `response.data`, and the untouched `API_HANDLER` unwraps it exactly
 * as it would a real response (Get → `data.data`, Post/etc → the whole envelope).
 */
export interface Envelope<T = any> {
  success: boolean;
  status: string;
  message: string;
  data?: T;
}

export const ok = <T>(data: T, message = ''): Envelope<T> => ({
  success: true,
  status: 'ok',
  message,
  data,
});

export const fail = (message: string, status = 422, data: any = null): Envelope => ({
  success: false,
  status: String(status),
  message,
  data,
});

export interface MockResult {
  status: number;
  envelope: Envelope;
}

export const respond = <T>(data: T, message = '', status = 200): MockResult => ({
  status,
  envelope: ok(data, message),
});

export const error = (message: string, status = 422, data: any = null): MockResult => ({
  status,
  envelope: fail(message, status, data),
});
