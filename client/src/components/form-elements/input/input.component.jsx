import { Field, ErrorMessage } from "formik";
const Input = ({ type, name, label }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field type={type} name={name} className="form-input" />
      <ErrorMessage name={name} component="span" className="error" />
    </div>
  );
};
export default Input;
