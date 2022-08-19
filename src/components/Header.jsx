import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";

const Header = () => {
    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setLogout())
    }


    return (
        <MDBNavbar fixed="top" expand='lg' style={{ backgroundColor: 'skyblue' }}>
            <MDBContainer>
                <MDBNavbarBrand
                    href="/"

                >
                    BEHOLD TOUR
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded='false'
                    onClick={() => setShow(!show)}
                    style={{ color: 'yellow' }}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addtour">
                                        <p className="header-text">Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashboard">
                                        <p className="header-text">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text"
                                        onClick={handleLogout}
                                    >Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text">Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}


                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;