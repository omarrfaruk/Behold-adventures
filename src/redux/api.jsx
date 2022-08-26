import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000/" })


// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
//             }`;
//     }
//     return req;
// });


export const signIn = (FormData) => API.post("/users/signin", FormData)
export const signUp = (FormData) => API.post("/users/signup", FormData)
// export const googleSignIn = (result) => API.post("/users/googleSingIn", result)
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post('/tour', tourData)
export const getTours = () => API.get('/tour')