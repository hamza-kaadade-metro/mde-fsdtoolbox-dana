export class ApiError extends Error {
  private statusCode: number;
  private payload: any | undefined;

  constructor(error: ApiErrorDetail) {
    super();
    this.name = error.name;
    this.message = error.message;
    this.statusCode = error.statusCode;
    this.payload = error.payload;
  }
}

interface ApiErrorDetail {
  name: string;
  message: string;
  statusCode: number;
  payload?: any;
}

// throw new ApiError({
//   statusCode: 404,
//   name: 'NotFound',
//   message: 'DerKundewurdenichtgefunden.',
// });
