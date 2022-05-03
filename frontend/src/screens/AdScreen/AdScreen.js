import React, { useState, useEffect } from 'react'
import { Container, Card, Button, OverlayTrigger, Popover, DropdownButton, Dropdown, Alert, Col, Row, Image, NavDropdown, Badge } from 'react-bootstrap'
import { AiFillEdit, AiFillDelete, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { currentAd } from '../../actions/adActions'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { AD_UPDATE_SUCCESS, AD_UPDATE_FAIL, AD_LIST_SUCCESS } from '../../constants/adsConstant';
import { io } from "socket.io-client";
import NotificationBadge, { Effect } from 'react-notification-badge';
import { fetchChatReducer } from '../../reducers/chatReducer';
import { fetchChat } from '../../actions/chatActions';
const AdScreen = ({ match }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useHistory();
    const dispatch = useDispatch();
    const singleAd = useSelector((state) => state.singleAd);
    const { loading, ads, error } = singleAd;
    const [errMessage, setErrMessage] = useState('');
    const url = "https://wa.me/91"
    
    let temp;
    const func=()=>{
        // console.log("why")
        temp=false;
        ads?.requesters?.forEach((r)=>{
            temp||=r._id===userInfo._id
        })
    }
    func();
    console.log(temp);
    const [toggle,setToggle]=useState()
    useEffect(()=>{
        setToggle(temp);
    },[])
    const chatHandler2=()=>{
        console.log("mannat jain")
        dispatch(fetchChat(ads.seller._id,userInfo._id))
    }
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(currentAd(match.params.id));
        }
    }, [dispatch, userInfo, history]);
    const chatHandler = (e) => {

        e.preventDefault();
        window.open(`${url}9771139594`);
    }
    const requestHandler = async (e) => {
        setToggle(prevtoggle=>!prevtoggle)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            // console.log(ads?.requesters?.includes(userInfo._id))
            const { data } = await axios.post(`/api/ads/${match.params.id}/buyrequest`, {}, config);
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            setErrMessage(message);
        }
    }
    const acceptRequest = async (user) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            const { data } = await axios.post(`/api/ads/${match.params.id}/${user._id}/confirmrequest`, {}, config);
            dispatch({ type: AD_UPDATE_SUCCESS, payload: data });
            dispatch(currentAd(match.params.id));
            setErrMessage('');
            // console.log(data);
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(message);
            dispatch({ type: AD_UPDATE_FAIL, payload: message });
            setErrMessage(message);
        }
    }
    return (
        <Container className='mt-5'>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errMessage && <ErrorMessage variant="danger">{errMessage}</ErrorMessage>}
            <Row>
                <Col sm={8}>
                    <Card>
                        <Card.Body variant="top" >
                            <Carousel variant="dark" className='bg-warning'>
                                {
                                    ads?.image?.map((pic, i) => (
                                        <Carousel.Item variant="dark">
                                            <img
                                                src={pic}
                                                alt={i}
                                                style={{ height: '60vh' }}
                                            />
                                            {/* <Image src={pic} responsive fluid className='mw-100 mh-75'/> */}
                                            <Carousel.Caption>
                                                <h3>{ads?.price + i}</h3>
                                                <p>{ads?.title}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                            <hr />
                            <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <>{ads?.title}</>
                            </Card.Title>
                            <h1>Description</h1>
                            <Card.Text>
                                {ads?.description}
                            </Card.Text>
                            {
                                (ads?.seller?._id === userInfo._id && ads?.buyer === null) &&
                                (<>
                                    <DropdownButton id="dropdown-basic-button" 
                                    title=
                                    {<><Badge pill bg="danger" size='large'>{ads?.requesters?.length}</Badge> {' '}Requesters </>}>
                                    {
                                        ads?.requesters?.length === 0 && "No Requests Found"
                                    }
                                    {
                                        (ads?.requesters?.map((aa) => (
                                            <>
                                                <Dropdown.Item style={{ display: 'flex', justifyContent: 'space-around',alignItems:'center' }}>
                                                    {aa.name}
                                                    <AiFillCheckCircle onClick={() => acceptRequest(aa)} />
                                                </Dropdown.Item>
                                            </>
                                        )))
                                    }
                                </DropdownButton>
                                </>)
                            }
                            {
                                (ads?.seller?._id !== userInfo._id) &&
                                <>
                                    {toggle&&<Button variant="danger" onClick={requestHandler}>Cancel Request</Button>}
                                    {!toggle&&<Button variant="success" onClick={requestHandler}>Request</Button>}
                                    <Button variant="danger" onClick={chatHandler}>Chat</Button>
                                </>
                            }
                            {
                                ads?.buyer && <Alert variant='success' >Product Sold to {ads?.buyer?.name}</Alert>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card >
                        <Card.Body variant="top" >
                            <Card.Title>
                                ₹ {ads?.price}
                            </Card.Title>
                            <Card.Text>
                                {ads?.description}
                            </Card.Text>
                            {/* <Card.Subtitle className="mb-2 text-muted">{ads?.seller?.name}</Card.Subtitle> */}
                            <footer className="blockquote-footer">
                                Posted On - {ads?.createdAt?.substring(0, 10)}
                            </footer>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body variant="top" >
                            <Card.Title>
                                Seller Description
                            </Card.Title>
                            <Card.Text>
                                <Image src={ads?.seller?.pic?.url} fluid responsive
                                    style={{ width: '4em', height: '4em', borderRadius: '2em' }}
                                />
                                {' '}
                                <b>{ads?.seller?.name}</b>
                            </Card.Text>
                            <Link to='/chat' onClick={chatHandler2}>
                                Chat With Seller
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AdScreen
