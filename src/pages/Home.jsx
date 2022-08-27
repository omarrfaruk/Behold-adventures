import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getTours } from '../redux/features/tourSlice';
// import { useLocation } from 'react-router-dom'
import CardTour from '../components/CardTour';

const Home = () => {
    // const location = useLocation()
    const dispatch = useDispatch()
    const { tours, loading, error } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );
    console.log(tours, error)

    useEffect(() => {
        dispatch(getTours())
    }, [dispatch])

    if (loading) {
        <p>loading</p>
    }

    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            alignContent: "center",
        }}>
            <MDBRow className="mt-5">
                {tours.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Tours Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours && tours.map((item, index) => <CardTour key={index} {...item} />)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </div>
    );
};
export default Home;