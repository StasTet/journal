import {
    min_length_name,
    min_length_surname,
    min_age,
    min_length_phone,
    max_mark
} from '../constants/form';

import {
    warning_required,
    warning_number,
    warning_name,
    warning_surname,
    warning_age,
    warning_phone,
    warning_mark,
    warning_email

} from '../constants/warning_messages';

const errorMessages = {
    name: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (value.length !== undefined && value.length > min_length_name) {
                return warning_name;
            }
        }
    },
    surname: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (value.length > min_length_surname) {
                return warning_surname;
            }
        }
    },
    age: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (isNaN(Number(value))) {
                return warning_number
            }

            if (value < min_age) {
                return warning_age;
            }
        }
    },
    phone: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (value.length < min_length_phone) {
                return warning_phone;
            }
        }
    },
    mark: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (isNaN(Number(value))) {
                return warning_number
            }

            if (value > max_mark) {
                return warning_mark;
            }
        }
    },
    email: {
        validator: (value) => {
            if (!value) {
                return warning_required
            }

            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return warning_email
            }
        }
    }

}

export const validateField = (fieldName, val) => {
    const validators = errorMessages[fieldName]

    return validators.validator(val)
}
