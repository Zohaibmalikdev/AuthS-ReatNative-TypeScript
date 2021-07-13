import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
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
});
