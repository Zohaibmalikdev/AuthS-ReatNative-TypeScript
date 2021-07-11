import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().min(4).max(16).required(),
  description: Yup.string().min(4).max(35).required(),
  image: Yup.string(),
});