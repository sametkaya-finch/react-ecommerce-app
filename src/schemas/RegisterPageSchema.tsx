import * as yup from 'yup';

export const RegisterPageSchema = yup.object().shape({
    username: yup.string().required("Username field cannot be empty."),
    password: yup.string().required("Password field cannot be empty.")
})