import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAds } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Pagination from "@vlsergey/react-bootstrap-pagination";

function MyRequestsScreen({search}) {
    const dispatch = useDispatch();
    const adList = useSelector((state) => state.adList);
    // console.log(adList);
    const { loading, ads, error } = adList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history=useHistory();

    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(listAds());
        }
    }, [dispatch, history, userInfo])
    return (
        <Container className='mt-4'>
            <Link to='/createad'>
                <Button>
                    Create Ad
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {/* <Container> */}
            {search ? (
                <Row>
                    {ads &&
                        ads?.filter((filteredads) =>
                            filteredads.title.toLowerCase().includes(search.toLowerCase()))
                            .reverse().map((ad) => (
                                <Col>
                                    <SingleAd ad={ad} key={ad._id} />
                                </Col>
                            ))}
                </Row>
            ) : (<>
                    {console.log(ads)}
                    <Row>
                    {ads?.filter((ad)=>{
                        let temp=false;
                        ad.requesters?.find((r)=>{
                            temp||=r._id===userInfo._id
                        })
                        return temp
                    }).reverse().map((ad) => (
                        <Col>
                            <SingleAd ad={ad} key={ad._id} />
                        </Col>
                    ))
                    }
                    </Row>
                </>
            )}

        </Container>

  )
}

export default MyRequestsScreen