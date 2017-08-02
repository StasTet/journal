import {
    min_length_name,
    min_length_surname,
    min_age,
    min_length_phone,
    max_mark
} from './form';

export const warning_required = 'Required';
export const warning_number = 'Must be a number';
export const warning_name = `Must be ${min_length_name} characters or less`;
export const warning_surname = `Must be ${min_length_surname} characters or less`;
export const warning_age = `Sorry, you must be at least more then ${min_age} years old`;
export const warning_phone = `Must be more then ${min_length_phone} characters`;
export const warning_mark = `Sorry, mark must be less then ${max_mark}`;
export const warning_email = 'Invalid email address';