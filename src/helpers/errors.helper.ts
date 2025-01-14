import { UUID } from '../types';

export interface CustomError extends Error {
  data:
    | { userId?: UUID; referenceId?: string; referenceType?: string }
    | null
    | undefined;
}

export class AppError extends Error implements CustomError {
  statusCode: number;
  errorCode: string;
  data:
    | { userId?: UUID; referenceId?: string; referenceType?: string }
    | null
    | undefined;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string = 'INTERNAL_SERVER_ERROR',
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

// VALIDATION ERROR
export class ValidationError extends AppError {
  constructor(
    message: string,
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null,
    errorCode: string = 'BAD_REQUEST'
  ) {
    super(message, 400, errorCode, data);
  }
}

// UNAUTHORIZED ERROR
export class UnauthorizedError extends AppError {
  constructor(
    message: string,
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null,
    errorCode: string = 'UNAUTHORIZED'
  ) {
    super(message, 401, errorCode, data);
  }
}

// FORBIDDEN ERROR
export class ForbiddenError extends AppError {
  constructor(
    message: string,
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null,
    errorCode: string = 'FORBIDDEN'
  ) {
    super(message, 403, errorCode, data);
  }
}

// NOT FOUND ERROR
export class NotFoundError extends AppError {
  constructor(
    message: string,
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null,
    errorCode: string = 'NOT_FOUND'
  ) {
    super(message, 404, errorCode, data);
  }
}

// CONFLICT ERROR
export class ConflictError extends AppError {
  constructor(
    message: string,
    data:
      | {
          userId?: UUID;
          referenceId?: string;
          referenceType?: string;
        }
      | null
      | undefined = null,
    errorCode: string = 'CONFLICT'
  ) {
    super(message, 409, errorCode, data);
  }
}
