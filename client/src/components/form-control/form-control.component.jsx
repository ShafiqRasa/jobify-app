import { Input, Select, File } from "../form-elements";

const FormControl = ({ element, ...otherProps }) => {
  switch (element) {
    case "input":
      return <Input {...otherProps} />;
    case "select":
      return <Select {...otherProps} />;
    case "file":
      return <File {...otherProps} />;
  }
};
export default FormControl;
