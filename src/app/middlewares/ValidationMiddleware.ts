import {NextFunction, Request, Response} from 'express'
import {validationResult} from 'express-validator'

const handleValidation = async (req: Request, res: Response, next: NextFunction) => {
    const err: any = validationResult(req)
    if (err.errors.length > 0) {
        res.status(422).send(err)
    } else {
        next()
    }
}

export default handleValidation