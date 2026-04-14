export type APIResponse<T = undefined> = {
  success: boolean;
  data?: T;
  message: string;
};

export type APIError = {
  success: boolean;
  message: string;
};

