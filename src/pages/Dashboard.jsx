import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getTourByUser } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { FiTrash2 } from 'react-icons/fi'

const Dashboard = () => {

    const { user } = useSelector((state) => ({ ...state.auth }));
    const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
    const userId = user?.result?._id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(getTourByUser(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const excerpt = (str) => {
        if (str.length > 40) {
            str = str.substring(0, 40) + " ...";
        }
        return str;
    };

    if (loading) {
        return <Spinner />
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteTour({ id, toast }))
        }
    }

    return (
        <div
            style={{
                margin: "auto",
                padding: "120px",
                maxWidth: "900px",
                alignContent: "center",
            }}
        >
            {/* {userTours.length === 0 && (
                <h3>No tour available with the user: {user?.result?.name}</h3>
            )} */}

            {userTours.length > 0 && (
                <>
                    <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
                    <hr style={{ maxWidth: "570px" }} />
                </>
            )}

            {userTours &&
                userTours.map((item) => (
                    <MDBCardGroup key={item._id}>
                        <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                            <MDBRow className="g-0">
                                <MDBCol md="4">
                                    <MDBCardImage
                                        className="rounded"
                                        src={item.imageFile}
                                        alt={item.title}
                                        fluid
                                    />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start">
                                            {item.title}
                                        </MDBCardTitle>
                                        <MDBCardText className="text-start">
                                            <small className="text-muted">
                                                {excerpt(item.description)}
                                            </small>
                                        </MDBCardText>
                                        <div
                                            style={{
                                                marginLeft: "5px",
                                                float: "right",
                                                marginTop: "-60px",
                                            }}
                                        >
                                            <MDBBtn
                                                onClick={() => handleDelete(item._id)}
                                                className="mt-1" tag="a" color="none">
                                                <FiTrash2 />
                                            </MDBBtn>
                                            <Link to={`/editTour/${item._id}`}>
                                                {/* <MDBIcon
                                                    fas
                                                    icon="edit"
                                                    style={{ color: "#55acee", marginLeft: "10px" }}
                                                    size="lg"
                                                /> */}
                                                Edit
                                            </Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCardGroup>
                ))}
        </div>
    );
};

export default Dashboard;