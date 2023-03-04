import { AxiosError } from 'axios'

export type AxiosErrorWithMessage = AxiosError<{ message: string }>
