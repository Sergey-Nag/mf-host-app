import { number, object } from 'yup'

const priceSchema = number()
    .typeError('Not a number')
    .required('Required')
    .min(0, 'Not positive');

export const validationSchema = object().shape({
    price: object().shape({
        min: priceSchema,
        max: priceSchema
    }),
});
