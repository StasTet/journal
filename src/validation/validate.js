import { validateField } from './errorMessages';
const validate = (values) => {
    const errors = {}

    const field = [
        'name',
        'surname',
        'age',
        'phone',
        'mark'
    ]

    field.forEach((item) => {
        errors[item] = validateField(item, values[item]);
    })

    return errors
}

export default validate