import * as Yup from "yup";

// job form initial values and schema
export const jobValidationSchema = Yup.object().shape({
  position: Yup.string().required("position is required"),
  company: Yup.string().required("company is required"),
  jobLocation: Yup.string().required("location is required"),
  jobStatus: Yup.string().required("job stauts is required"),
  jobType: Yup.string().required("job type is required"),
});

export const jobInitialValues = {
  position: "",
  company: "",
  jobLocation: "",
  jobStatus: "",
  jobType: "",
};
// end

// profile form initial and validation schema values
export const profileInitialValues = {
  profile: "",
  name: "",
  lastname: "",
  email: "",
  location: "",
};
const SUPPORTED_FORMATE = [
  "image/jpeg",
  // "image/bmp",
  "image/svg+xml",
  "image/png",
  "application/pdf",
  // "application/msword",
];
const FILE_SIZE = 512 * 1024; // (Max size 0.5MB=512*1024) 1MB=1024KB, 1KB=1024bytes, 1GB=1024MB
export const profileValidationSchema = Yup.object().shape({
  profile: Yup.mixed()
    .required("file is required")
    .test(
      "fileSize",
      "file should be (Max 0.5MB)",
      (value) => value[0].size <= FILE_SIZE
    )
    .test("fileType", "allowed formate (jpeg, svg, png, pdf)", (value) =>
      SUPPORTED_FORMATE.includes(value[0].type)
    ),
  name: Yup.string().required("name is required"),
  lastname: Yup.string().required("name is required"),
  email: Yup.string().email("invlid email").required("email is required"),
  location: Yup.string().required("location is required"),
});
//end

// search form utils

export const searchForminitialValues = {
  search: "",
  jobStatus: "",
  jobType: "",
  sort: "",
};
export const jobStatusOptions = [
  { id: 1, name: "all", value: "all" },
  { id: 2, name: "pending", value: "pending" },
  { id: 3, name: "interview", value: "interview" },
  { id: 4, name: "declined", value: "declined" },
];
export const jobTypeOptions = [
  { id: 1, name: "all", value: "all" },
  { id: 2, name: "full-time", value: "full-time" },
  { id: 3, name: "part-time", value: "part-time" },
  { id: 4, name: "remote", value: "remote" },
];
export const sortOptions = [
  { id: 1, name: "newest", value: "newest" },
  { id: 2, name: "oldest", value: "oldest" },
  { id: 3, name: "a-z", value: "a-z" },
  { id: 4, name: "z-a", value: "z-a" },
];

// end
