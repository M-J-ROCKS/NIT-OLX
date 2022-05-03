
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useEffect } from 'react'
import { Register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import {GoogleLogin} from 'react-google-login'


const RegisterScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const [wait, setWait] = useState(false);
    useEffect(() => {
        if (userInfo) {
            history.push('/home');
        }
    }, [history, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== ConfirmPassword&&email===""&&name==="") {
            setMessage("Incorrect Input Fields");
        }
        else {
            if (!pic) {
                return setPicMessage("Please Select a Picture");
            }
            setPicMessage(null);
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
                // console.log(pic);
                const data = new FormData();
                data.append("file", pic);
                data.append("upload_preset", "NotesApp");
                data.append("cloud_name", "pdpcn");
                fetch("https://api.cloudinary.com/v1_1/pdpcn/image/upload", {
                    method: "post",
                    body: data,
                }).then((res) => res.json())
                    .then((dataa) => {
                        // setPic(dataa.url);
                        console.log(dataa);
                        setWait(true);
                        dispatch(Register(name, email, password, { url: dataa.url, deleteId: dataa.public_id }));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                return setPicMessage("Please Select an Image");
            }
        }
    }
    const googleSuccess=async (res)=>{
        console.log(res)
        const result=res?.profileObj
        const token=res?.tokenId
    
        try{
            setName(result.name);
            setEmail(result.email);
            // setPic(result.imageUrl);
            console.log("Register")
        }catch(error){
    
        }
    }
    
    const googleFailure=(error)=>{
        console.log("Google Sign In",error)
        console.log('Google Sign in was unsuccessful')
    }

    return (
        <MainScreen title="REGISTER">
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {loading && <Loading />}
            {wait && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={ConfirmPassword}
                        placeholder="ConfirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {/* {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )} */}
                <Form.Group>
                    <span>Uplaod Image</span>
                    <input type="file" onChange={(e) => setPic(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <GoogleLogin 
                    clientId='477141315812-3gqgbv4ilrkpmkk9soalib5pg6513hs7.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button 
                            onClick={renderProps.onClick}
                            color="primary"
                            disabled={renderProps.disabled}
                        >Google Sign In
                            </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Row className='py-3'>
                    <Col>
                        Already have an account ? <Link to='/login'>Login Here</Link>
                    </Col>
                </Row>
            </Form>
        </MainScreen>
    )
}

export default RegisterScreen
