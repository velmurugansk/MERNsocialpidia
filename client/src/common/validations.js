import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email:Yup.string().email('Invalid Email').required('Email is Required'),
    password:Yup.string().required('Password is Required.'),
});

export const registerSchema = Yup.object().shape({
    firstName:Yup.string().required('Firstname is Required').min(2),
    lastName:Yup.string().required('Lastname is Required').min(2),
    email:Yup.string().email('Invalid Email').required('Email is Required'),
    password:Yup.string().required('Password is Required.'),
});