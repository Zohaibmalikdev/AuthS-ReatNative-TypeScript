import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+(\s?[a-zA-Z0-9_-]+)*$/)
    .min(6)
    .max(16)
    .required(),
  email: Yup.string().email().required(),
  name: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  address: Yup.string().min(4).max(16).required(),
  postcode: Yup.string().min(4).max(16).required(),
  city: Yup.string().min(4).max(16).required(),
  country: Yup.string().min(4).max(16).required(),
});
