import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppDispatch } from "../redux/hooks/hooks";
import { initUser } from "../redux/reducers/authReducer";
import LoginRoute from "./login/LoginRoute";
import EmailConfirmation from "./EmailConfirmation/EmailConfirmationRoute";
import ProtectedRoute from "./ProtectedRoute";
import RegisterRoute from "./register/RegisterRoute";
import AddNewStream from "./stream/ScheduleStream";
import MyStreamsRoute from "./stream/MyStreamsRoute";
import StreamRoute from "./stream/StreamRoute";
import Loader from "../components/Loader/Loader";
import ChannelRoute from "./channel/ChannelRoute";
import ViewChannel from "./channel/ViewChannel";
import { useLocation } from "react-router-dom";
const RouteContainer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") as string);
    dispatch(initUser(user));
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <>
      {pathname.includes("/confirm/email") ? null : <Sidebar />}
      <Routes>
        <Route
          path="/stream/:scheduleId/:streamId"
          element={
            <ProtectedRoute>
              <StreamRoute />
            </ProtectedRoute>
          }
        />
        <Route
          index={false}
          path="/stream"
          element={
            <ProtectedRoute>
              <MyStreamsRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stream/add"
          element={
            <ProtectedRoute>
              <AddNewStream />
            </ProtectedRoute>
          }
        />
        <Route path="/channel" element={<ChannelRoute />} />
        <Route
          path="/channel/:scheduleId/:streamId"
          element={
            <ProtectedRoute>
              <ViewChannel />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/confirm/email/:id" element={<EmailConfirmation />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="*" element={<Navigate to="/stream" />} />
      </Routes>
    </>
  );
};

export default RouteContainer;
