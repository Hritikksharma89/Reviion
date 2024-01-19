import { Moment } from 'moment'
import { AccessAndRefreshTokens, IToken, ITokenDoc } from '@/interface/token.interface'
import { tokenTypes } from '@/constant/token.constant'
import TokenFactory from '@/factory/tokenFactory'
import { Token, Users } from '@/models/model'
import Factory from '@/factory/factory'

/**
 * Saves a new token document to the database.
 *
 * @param token - The token string
 * @param id - The ID of the user the token is for
 * @param expires - The expiration date of the token
 * @param type - The type of the token (e.g. 'refresh')
 * @param blacklisted - Whether the token should be blacklisted
 * @returns The saved token document
 */
export const saveToken = async (
  token: string,
  id: string,
  expires: Moment,
  type: string,
  blacklisted: boolean = false,
): Promise<ITokenDoc> => Factory(Token).create({
  blacklisted,
  expires: expires.toDate(),
  token,
  type,
  user: id,
});

/**
 * Generates new access and refresh tokens for a user.
 *
 * @param id - The ID of the user to generate tokens for
 * @param role - The role of the user
 * @returns Promise resolving to an object containing the new access and refresh tokens
 */
export const generateAuthTokens = async (id: string, role: string): Promise<AccessAndRefreshTokens> => {
  const refreshToken = TokenFactory().generate(id, role, TokenFactory().refreshExpire, tokenTypes.REFRESH);
  await saveToken(refreshToken, id, TokenFactory().refreshExpire, tokenTypes.REFRESH);

  return {
    access: {
      expires: TokenFactory().accessExpire.toDate(),
      token: TokenFactory().generate(id, role, TokenFactory().accessExpire, tokenTypes.ACCESS),
    },
    refresh: {
      expires: TokenFactory().refreshExpire.toDate(),
      token: refreshToken,
    },
  };
};

/**
 * Finds a token document by ID and token string.
 *
 * @param id - The ID of the user the token is associated with
 * @param token - The token string to search for
 * @param type - The type of token
 */
export const findTokenById = async (id: string, token: string, type: string) => Factory(Token).findOne({
  blacklisted: false,
  token,
  type,
  user: id,
});

/**
 * Verifies a JWT token by decoding it and returning the payload.
 *
 * @param token - The JWT token to verify
 * @returns The decoded token payload if valid, otherwise throws an error
 */
export const verifyToken = (token: string) => TokenFactory().verify(token.split(' ')[1]);

export const generateResetPasswordToken = async (id: string, role: string) => {
  const resetPasswordToken = TokenFactory().generate(id, role, TokenFactory().accessExpire, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, id, TokenFactory().accessExpire, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

export const deleteRefreshToken = async (refreshTokenDoc: IToken) => Factory(Token).deleteOne(refreshTokenDoc);

export const getRefreshTokenDoc = async (refreshToken: string): Promise<ITokenDoc> => Factory(Token).findOne({
  blacklisted: false,
  token: refreshToken,
  type: tokenTypes.REFRESH,
});

export const resetUserPassword = async (id: any, newPassword: string) => ({
  token: await Factory(Token).deleteMany({
    type: tokenTypes.RESET_PASSWORD,
    user: id,
  }),
  user: await Factory(Users).findByIdAndUpdate({ password: newPassword }, id),
});

export const refreshAuth = async (refreshTokenDoc: IToken) => {
  const token = await deleteRefreshToken(refreshTokenDoc);
  const tokens = await generateAuthTokens(token.user, token.role);
  return { tokens };
};
