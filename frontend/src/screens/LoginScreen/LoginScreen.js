import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import {GoogleLogin} from 'react-google-login'


const LoginScreen = ({history}) => {
    const [email, setEmail] = useState();
    const [password, serPassword] = useState();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    useEffect(() => {
        if(userInfo)
        {
            console.log(userInfo);
            history.push('/home');
        }
    }, [history,userInfo])
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(login(email,password,null));
        // console.log(email,password);
      
    }
    const googleSuccess=(res)=>{
        console.log(res)
        const result=res?.profileObj
        const g_token=res?.tokenId
        console.log(g_token)
        try{
            setEmail(result.email);
            // setPic(result.imageUrl);
            dispatch(login(res?.profileObj.email,password,g_token));
            console.log("Register")
        }catch(error){
            console.log("Error",error)
        }
    }
    
    const googleFailure=(error)=>{
        console.log("Google Sign In",error)
        console.log('Google Sign in was unsuccessful')
    }

    
    return (
        <MainScreen title="LOGIN">
        {error&&<ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading&&<Loading/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email}
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                     />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicpasswordword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password}
                    placeholder="passwordword" 
                    onChange={(e) => serPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <GoogleLogin 
                    clientId='477141315812-3gqgbv4ilrkpmkk9soalib5pg6513hs7.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button 
                            className='ml-3'
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
                        Don't have an account ? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </Form>
        </MainScreen>
    )
}

export default LoginScreen
