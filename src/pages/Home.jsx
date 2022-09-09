import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const dispatch = useDispatch()
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    const location = useLocation();

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
            <MDBRow style={{ marginTop: "80px" }}>
                {tours.length === 0 && location.pathname === "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Tours Found
                    </MDBTypography>
                )}

                {tours.length === 0 && location.pathname !== "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        We couldn't find any matches for "{searchQuery}"
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours && tours.map((item) => <CardTour key={item._id} {...item} />)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {tours.length > 0 &&
                <Pagination
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    dispatch={dispatch}
                />
            }

        </div>
    );
};
export default Home;