import { Request } from 'express'

export interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined }
	teacher?: any
	student?: any
}
