import httpStatus from 'http-status';

import ApiError from './apiError';

export const catchAsync = async (fn: any) => {
  try {
    await fn();
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
};
