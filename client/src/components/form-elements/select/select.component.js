import { Field, ErrorMessage } from "formik";
const Select = ({ name,type, label, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field as={type} name={name} className="form-select">
        {options.map(({ id, name, value }) => (
          <option key={id} value={value} className="option">
            {name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="span" className="error" />
    </div>
  );
};
export default Select;
