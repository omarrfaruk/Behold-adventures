import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBValidationItem, MDBBtn, MDBValidation } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createTour } from '../redux/features/tourSlice';

const initialState = {
    title: '',
    description: '',
    tags: []
}

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState)
    const { error, loading } = useSelector((state) => ({ ...state.tour }))
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { title, description, tags } = tourData

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && description && tags) {
            const updatedTourData = { ...tourData, name: user?.result?.name }
            dispatch(createTour({ updatedTourData, navigate, toast }))
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target
        // console.log(e.target.value);
        setTourData({ ...tourData, [name]: value })
    }

    // const handleAddTag = (tag) => {
    //     setTourData({ ...tourData, tags: [...tourData.tags, tag] })
    // }

    // const handleDeleteTag = (deleteTag) => {
    //     setTourData({ ...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag) })
    // }


    const handleAddTag = (tag) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    };
    const handleDeleteTag = (deleteTag) => {
        setTourData({
            ...tourData,
            tags: tourData.tags.filter((tag) => tag !== deleteTag),
        });
    };

    const handleClear = () => {
        setTourData({ title: '', description: '', tags: [] })
    }


    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px",
        }}
            className='container'
        >
            <MDBCard alignment='center'>
                <h5>Add Tour</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <MDBValidationItem invalid='true' feedback='please provide title' className='col-md-12'>
                            <input
                                placeholder='Enter Title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={onInputChange}
                                className='form-control'
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem invalid feedback='please provide description' className='col-md-12'>
                            <textarea
                                placeholder='Enter Description'
                                type='text'
                                value={description}
                                name='description'
                                style={{ height: '100px' }}
                                onChange={onInputChange}
                                className='form-control'
                                required
                            />
                        </MDBValidationItem>
                        <div className="col-md-12">
                            <ChipInput
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(chip) => handleAddTag(chip)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase type='file' multiple={false} onDone={({ base64 }) => setTourData({ ...tourData, imageFile: base64 })} />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: '100%' }}>Submit</MDBBtn>
                            <MDBBtn style={{ width: '100%' }} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditTour;