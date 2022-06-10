import * as React from "react";
import { useParams } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Notiflix from "notiflix";

const EmailConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (id) confirmEmail();
    else navigate(-1);
  }, [id]);
  const confirmEmail = async () => {
    try {
      setLoading(true);
      await AuthService.confirmEmail(id);
      Notiflix.Notify.success("Email Verified");
      navigate("/login", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      debugger;
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
