import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import { BsChevronBarDown } from "react-icons/bs";
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
    MDBInputGroup,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import decode from "jwt-decode";

const Header = () => {
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = user?.token;
    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
        }
    }



    const handleLogout = () => {
        dispatch(setLogout())
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(searchTours(search));
            navigate(`/tours/search?searchQuery=${search}`);
            setSearch("");
        } else {
            navigate("/");
        }
    };


    return (
        <MDBNavbar style={{ backgroundColor: '#FFFAF0' }} className="py-4 reShadow" expand='lg' fixed="top" light >
            <MDBContainer style={{ maxWidth: '1200px', margin: 'auto' }} fluid>
                <MDBNavbarBrand className="fw-bold" href="/">BEHOLD ADVENTURES</MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarTogglerDemo02'
                    aria-controls='navbarTogglerDemo02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
                >
                    <BsChevronBarDown />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavNoTogglerSecond}>
                    <MDBNavbarNav fullWidth={false} right className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' href='/'>
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addtour">
                                        <p className="header-text">Add-Tour</p>
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
                    <MDBInputGroup tag="form" className='d-flex w-auto mb-3 mt-3' onSubmit={handleSubmit}>
                        <input className='form-control form-control' placeholder="Search Tour" onChange={(e) => setSearch(e.target.value)} value={search} aria-label="Search" type='Search' />
                        <MDBBtn outline>
                            <FiSearch />
                        </MDBBtn>
                    </MDBInputGroup>
                </MDBCollapse>

            </MDBContainer>
        </MDBNavbar >
    );
};

export default Header;