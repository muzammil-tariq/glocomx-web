import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Toolbar from "../../components/toolbar/Toolbar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { ScheduleService } from "../../services/ScheduleService";
import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useDropzone } from "react-dropzone";
import { WrpObjectToFormData } from "../../common/utility";

const AddNewStream = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const userRedux = useAppSelector((state) => state.auth);
    const tagifyRef = useRef();
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]) as any;

    const { streamId } = useParams();

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
    const thumbs = files.map((file: any) => (
        <div className="shadow-sm mt-3" key={file.name}>
            <img
                src={file.preview}
                // Revoke data uri after image is loaded
                className="img-thumbnail border-0"
                width="100%"
                onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                }}
            />
        </div>
    ));

    const fileRef = useRef(null);

    const onSubmit = (data: any) => {
        setLoading(true);

        let formData = WrpObjectToFormData(data);
        formData.append("tags", JSON.stringify(tags.map((tag: any) => ({ TagName: tag.value }))));
        formData.append("hostId", userRedux.userId);
        formData.append("thumbnail", files[0]);
        formData.append("liveSessionId", streamId as string);

        ScheduleService.addLiveSession(formData)
            .then((data) => {
                setLoading(false);
                navigate("/stream", { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, []);

    const onChange = useCallback((e: any) => {
        setTags(e.detail.tagify.getCleanValue());
    }, []);

    return (
        <div className="main-content">
            <Toolbar />
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div
                                className="card rounded-xxl p-lg--3 border-0 bg-no-repeat bg-image-contain banner-wrap"
                                style={{ backgroundImage: "url(images/fogg-clip.png)" }}
                            >
                                <div className="card-body p-4">
                                    <h2 className="display3-size mb-0 fw-400 display2-md-size sm-mt-7 sm-pt-10">
                                        Add New <b>Live Session</b>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 pt-4 mb-3">
                            <div className="card shadow-sm py-4 px-3 border-0">
                                <h2 className="fw-400 font-lg d-block">
                                    Live <b> Sessions</b>{" "}
                                </h2>
                                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="form-gorup">
                                                        <label className="mont-font fw-500 font-xsss">
                                                            Title of the session
                                                        </label>
                                                        <input
                                                            type="text"
                                                            {...register("title", { required: true })}
                                                            name="title"
                                                            placeholder="Enter title of the session"
                                                            className="form-control"
                                                        />
                                                        {errors.title && (
                                                            <span className="error">This field is required</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-gorup">
                                                        <label className="mont-font fw-500 font-xsss">Start</label>
                                                        <input
                                                            type="datetime-local"
                                                            {...register("startTime", { required: true })}
                                                            className="form-control"
                                                        />
                                                        {errors.startTime && (
                                                            <span className="error">This field is required</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-gorup">
                                                        <label className="mont-font fw-500 font-xsss">End</label>
                                                        <input
                                                            type="datetime-local"
                                                            {...register("endTime", { required: true })}
                                                            className="form-control"
                                                        />
                                                        {errors.endTime && (
                                                            <span className="error">This field is required</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="form-gorup">
                                                        <label className="mont-font fw-500 font-xsss">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            {...register("description", { required: false })}
                                                            placeholder="Desribe the session breifly."
                                                            className="form-control"
                                                        />
                                                        {errors.description && (
                                                            <span className="error">This field is required</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <div className="form-gorup">
                                                        <label className="mont-font fw-500 font-xsss">Tags</label>
                                                        <Tags
                                                            tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
                                                            // settings={settings}  // tagify settings object
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card shadow-none border-0">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-lg text-uppercase fw-600 ls-3"
                                                >
                                                    Schedule
                                                    {loading && (
                                                        <span
                                                            className="spinner-border spinner-border-sm ml-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label className="mont-font fw-500 font-xsss">Thumbnail</label>
                                                <div {...getRootProps({ className: "dropzone" })}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                                </div>
                                                {thumbs}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle-sidebar-right right-scroll-bar">
                    <div className="middle-sidebar-right-content">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewStream;
