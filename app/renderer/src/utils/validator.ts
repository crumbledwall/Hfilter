import AsyncValidator from 'async-validator'
import type { Rules, ValidateError, ValidateFieldsError, Values } from 'async-validator'

const validator = (model: any, rules: Rules,
  callback: (errors: any, fileds: any) => any) => {
  const validator = new AsyncValidator(rules)
  validator.validate(model,
    (errors: ValidateError[] | null, fields: ValidateFieldsError | Values) => {
      callback(errors, fields)
    })
}

export default validator
