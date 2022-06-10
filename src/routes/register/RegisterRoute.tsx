import { LoadingButton } from "@mui/lab";
import Notiflix from "notiflix";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
const RegisterRoute = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]) as any;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  React.useEffect(() => {
    console.log(term);
  }, [term]);
  const removeProfilePic = () => {
    setFiles([]);
  };
  const thumbs = files.map((file: any) => (
    <div
      className="shadow-sm p-relative m-auto profile-pic mt-3"
      key={file.name}
    >
      <img
        src={file.preview}
        // Revoke data uri after image is loaded
        className="img-thumbnail p-0 h-100  border-0"
        width="100%"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button type="button" onClick={removeProfilePic} className="remove-btn">
        <i className="feather-x"></i>
      </button>
    </div>
  ));
  const onSubmit = (data: any) => {
    setLoading(true);
    let dataPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      roles: ["user"],
    };
    // if (files.length > 0) {
    //   formData.append("profilePic", files[0]);
    // }
    // formData.append("role", "user");

    if (data.password !== data.confirmPassword) {
      Notiflix.Notify.warning("Password does not match.");
    }

    AuthService.register(dataPayload)
      .then((data) => {
        setLoading(false);
        navigate("/login", { replace: true });
        Notiflix.Notify.success("Registeration Successful");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Notiflix.Notify.failure(err + "");
      });
  };

  return (
    <div className="row">
      <div
        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
        style={{ background: "url('./assets/images/login-bg-2.jpg')" }}
      ></div>
      <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
        <div className="card shadow-none border-0 ml-auto mr-auto login-card">
          <div className="card-body rounded-0 text-left">
            <h2 className="fw-700 display1-size display2-md-size mb-4">
              Create <br />
              your account
            </h2>
            <form
              className="needs-validation"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group">
                {files.length === 0 && (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p className="mb-0">Select or Drop your profile pic</p>
                  </div>
                )}

                {thumbs}
              </div>
              <div className="form-group icon-input mb-3">
                <i className="font-sm ti-user text-grey-500 pr-0"></i>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="First Name"
                />
              </div>
              <div className="valid-feedback">Looks good!</div>
              <div className="form-group icon-input mb-3">
                <i className="font-sm ti-user text-grey-500 pr-0"></i>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group icon-input mb-3">
                <i className="font-sm ti-email text-grey-500 pr-0"></i>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="form-group icon-input mb-3">
                <input
                  {...register("password", { required: true })}
                  type="Password"
                  className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                  placeholder="Password"
                />
                <i className="font-sm ti-lock text-grey-500 pr-0"></i>
              </div>
              <div className="form-group icon-input mb-1">
                <input
                  {...register("confirmPassword", { required: true })}
                  type="Password"
                  className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                  placeholder="Confirm Password"
                />
                <i className="font-sm ti-lock text-grey-500 pr-0"></i>
              </div>
              <div className="form-check text-left mb-3">
                <input
                  type="checkbox"
                  className="form-check-input mt-2"
                  id="exampleCheck1"
                  onChange={(e) => setTerm(e.target.checked)}
                />
                <label
                  className="form-check-label font-xsss text-grey-500"
                  htmlFor="exampleCheck1"
                >
                  Accept Term and Conditions
                </label>
              </div>
              <div className="col-sm-12 p-0 text-left">
                <div className="form-group mb-1">
                  <LoadingButton
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                    disabled={loading || !term}
                  >
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}

                    <span className="">Register</span>
                  </LoadingButton>
                </div>
                <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                  Already have account{" "}
                  <Link to="/login" className="fw-700 ml-1">
                    Login
                  </Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRoute;
