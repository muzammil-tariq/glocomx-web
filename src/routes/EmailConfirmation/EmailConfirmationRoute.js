import { CircularProgress } from "@mui/material";
import Notiflix from "notiflix";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

const EmailConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (id) confirmEmail();
    else navigate(-1);
  }, [id]);
  const confirmEmail = async () => {
    try {
      setLoading(true);
      if (pathname.includes("reset/password")) {
        navigate(`/forgot-password?validationId=${id}`, { replace: true });
        return;
      }
      await AuthService.forgotPassword;
      await AuthService.confirmEmail(id);
      Notiflix.Notify.success("Email Verified");
      navigate("/login", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Notiflix.Notify.failure("something went wrong");
      navigate(-1);
    }
  };
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size="6rem" />
        </div>
      )}
    </>
  );
};
export default EmailConfirmation;
