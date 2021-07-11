import * as Yup from 'yup';


export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required(),
  email: Yup.string().email().required(),
  name: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  address: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  postcode: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  city: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  country: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
});