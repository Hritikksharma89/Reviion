import moment from "moment";
import { environment } from "../validation/env.validation";


export const tokenExpireMin =  moment().add(environment.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
export const tokenExpireDays =  moment().add(environment.JWT_REFRESH_EXPIRATION_DAYS, 'days')

