import { ErrorMessage } from "formik";
const File = ({ name, type, label, formik }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        accept="image/*"
        className="form-input"
        onChange={(event) => {
          const files = event.target.files;
          let myFiles = Array.from(files);
          formik.setFieldValue("profile", myFiles);
        }}
      />
      <ErrorMessage name={name} component="span" className="error" />
    </div>
  );
};
export default File;
