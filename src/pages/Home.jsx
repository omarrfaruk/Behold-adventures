import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

const Home = () => {
    const dispatch = useDispatch()
    const { tours, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );

    useEffect(() => {
        dispatch(getTours(currentPage))
    }, [currentPage, dispatch])

    if (loading) {
        return <Spinner />
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
            <Pagination
                setCurrentPage={setCurrentPage}
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                dispatch={dispatch}
            />
        </div>
    );
};
export default Home;