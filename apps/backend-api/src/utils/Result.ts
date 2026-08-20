export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string | null;
  private _value: T | null;
  public message: string | null;

  private constructor(isSuccess: boolean, error?: string | null, value?: T, message?: string | null) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error");
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message");
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error || null;
    this._value = value || null;
    this.message = message || null;
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result. Use 'error' instead.");
    }
    return this._value as T;
  }

  public static ok<U>(value?: U, message?: string): Result<U> {
    return new Result<U>(true, null, value, message);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}

// HTTP Response wrapper
export const sendResult = (res: any, statusCode: number, result: Result<any>) => {
  return res.status(statusCode).json({
    success: result.isSuccess,
    data: result.isSuccess ? result.value : null,
    error: result.isFailure ? result.error : null,
    message: result.message,
  });
};
