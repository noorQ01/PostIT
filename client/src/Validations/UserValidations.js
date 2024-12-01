import * as yup from "yup"; //import all exports from the yup

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password don't match")
    .required(),
});
