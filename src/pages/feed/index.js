import { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { postRequestOptions, Url } from "../../configUrl";
import './style.css'
import { useSelector } from 'react-redux';
import { storage } from "../../auth";
import Header from "../../components/header";
function Feed() {
    const id = useSelector(state => state.user.id);
    const [Data, setData] = useState([
        { curtidas: [], usuario: { nickname: '' }, urlImg: '' },
        { curtidas: [], usuario: { nickname: '' }, urlImg: '' },
        { curtidas: [], usuario: { nickname: '' }, urlImg: '' },

    ]);
    const [show, setShow] = useState(false);
    const [CurrentDescribe, setCurrentDescribe] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Loading, setLoading] = useState(false);
    const [Image, setImage] = useState();
    const [Segredos, setSegredos] = useState([]);
    const [ShowSegredo, setShowSegredo] = useState(false);
    const [Rank, setRank] = useState([]);
    useEffect(() => {
        fetch(Url + "Post")
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json)
                setData(json)
            })

        fetch(Url + "Segredo")
            .then(res => {
                return res.json()
            })
            .then(json => {
                setSegredos(json)
            })
        fetch(Url + "Rank")
            .then(res => {
                return res.json()
            })
            .then(json => {
                setRank(json);
            })
    }, []);
    const listSegredo = Segredos.map((i) => {
        return (
            <div className="segredo-box"
                onClick={() => {
                    alert("PARABENS, VOCE ACHOU O " + i.nomeSegredo)

                    let obj = {
                        segredoid: i.id,
                        usuarioid: id
                    }
                    fetch(Url + "Segredo", postRequestOptions(obj))
                        .then((res) => {
                            if (res.status == 200) {
                                fetch(Url + "Post")
                                    .then(res => {
                                        return res.json()
                                    })
                                    .then(json => {
                                        setSegredos([]);
                                    })
                            }
                        })

                }}
            >
                <img src={i.urlImg} className="img-fluid" />
            </div>
        )
    })

    const handleCurtida = (postId) => {
        let obj = {
            postid: postId,
            usuarioid: id
        }
        fetch(Url + "Curtida", postRequestOptions(obj))
            .then(res => {
                if (res.status == 200) {
                    fetch(Url + "Post")
                        .then(res => {
                            return res.json()
                        })
                        .then(json => {
                            setData(json)
                        })
                }
            })
    }
    const listRank = Rank.map((i, index) => (
        <div className=" d-flex justify-content-start p-2 rank-user shadow my-3" >
            <div className="rank-name font-weight-bold m-1">
                {index + 1}º
             </div>
            <div className="mr-2">
            </div>
            <div>
                <div className="rank-name">
                    {i.aluno.nickname}
                </div>
                <div className="rank-point small">
                    {i.pontos} pontos
                </div>
            </div>
        </div >
    )
    )
    const list = Data.map((i, index) => {

        if (index >= 3) {
            return (
                <Col lg
                    style={{ backgroundImage: `url(${i.urlImg})`, backgroundSize: 'cover', maxWidth: '450px' }}

                    lg className="post shadow rounded m-3">
                    <div className="bg-post">

                        <div className="post-title">
                            {i.titulo}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="post-autor">
                                {i.usuario.nickname}
                            </div>
                            <div
                                className="d-flex"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleCurtida(i.id)
                                }}
                            >
                                <div>

                                    {i.curtidas.length}
                                </div>
                                <div>
                                    <span class="material-icons">
                                        thumb_up
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
            )
        }
    })

    let handleRequest = () => {
        setLoading(true)
        const uploadImage = storage.ref('imagesedux/' + Image.name).put(Image)
        uploadImage.on(
            "state_changed",
            snapshot => { },
            error => {
                alert("erro no upload")
            },
            () => {
                storage.ref('imagesedux')
                    .child(Image.name)
                    .getDownloadURL()
                    .then((url) => {
                        let obj = {
                            urlimg: url,
                            usuarioid: id,
                            titulo: CurrentDescribe
                        }

                        fetch(Url + "Post", postRequestOptions(obj))
                            .then((res) => {
                                if (res.status == 200) {

                                    fetch(Url + "Post")
                                        .then(res => {
                                            return res.json()
                                        })
                                        .then(json => {
                                            setData(json)
                                            setCurrentDescribe('')
                                            setLoading(false)
                                            handleClose();
                                        })
                                }
                            })
                    })
            }
        )



    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar um post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        <input type="file" onChange={(e) => {
                            setImage(e.target.files[0])
                        }} />
                    </div>
                    <div className="form-input mt-3" style={{ width: '100%' }}>

                        <div className="mt-2">
                            <textarea onChange={(e) => {
                                setCurrentDescribe(e.target.value)
                            }}
                                value={CurrentDescribe}
                                type="email" style={{ width: '100%' }} maxLength="20" id="email" className="shadow p-5" placeholder="No que voce esta pensando?" />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around">
                    <span onClick={() => {
                        handleClose();
                    }} class="material-icons" style={{ fontSize: '20px', cursor: 'pointer' }}>
                        close
                            </span>
                    {Loading ?
                        <div class="spinner-border color-purple" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        :
                        <span onClick={() => {
                            handleRequest();
                        }} class="material-icons color-purple" style={{ fontSize: '40px', cursor: 'pointer' }}>
                            add_task
                                </span>
                    }
                </Modal.Footer>
            </Modal>
            <Header />
            <Container fluid className="feed post-box pl-5 mt-5 pt-5">

                <Row>
                    <Col lg="9">


                        <Row className="post-bigtitle">
                            Posts recentes
                        </Row>
                        <Row>
                            <span onClick={() => {
                                handleShow();
                            }} class="material-icons color-purple" style={{ fontSize: '40px', cursor: 'pointer' }}>
                                add_circle
                            </span>
                        </Row>
                        <Row>
                            <Col lg="7"
                                style={{ backgroundImage: `url(${Data.length > 0 ? Data[0].urlImg : ''})`, backgroundSize: 'cover' }}
                                className="big-post shadow rounded m-3">

                                <div className="bg-post">
                                    <div className="post-title">
                                        {Data.length > 0 && Data[0].titulo}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="post-autor">
                                            {Data.length > 0 && Data[0].usuario.nickname}
                                        </div>
                                        <div>
                                            {Data.length > 0 &&
                                                <div
                                                    className="d-flex"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        handleCurtida(Data[0].id)
                                                    }}
                                                >
                                                    <div>

                                                        {Data[0].curtidas.length}
                                                    </div>
                                                    <div className="mx-2">
                                                        <span class="material-icons">
                                                            thumb_up
                                                        </span>
                                                    </div>
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div
                                    style={{ backgroundImage: `url(${Data.length > 1 ? Data[1].urlImg : ''})`, backgroundSize: 'cover' }}

                                    lg className="post shadow rounded  m-3">

                                    <div className="bg-post">
                                        <div className="post-title">
                                            {Data.length > 1 &&
                                                Data[1].titulo
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="post-autor">
                                                {Data.length > 1 &&
                                                    Data[1].usuario.nickname
                                                }
                                            </div>
                                            <div>
                                                {Data.length > 1 &&<div
                                                    className="d-flex"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        console.log(Data[1].id)
                                                        console.log(Data);
                                                        handleCurtida(Data[1].id)
                                                    }}
                                                >
                                                    <div>

                                                        {Data[1].curtidas.length}
                                                    </div>
                                                    <div className="mx-2">
                                                        <span class="material-icons">
                                                            thumb_up
                                                        </span>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div
                                    style={{ backgroundImage: `url(${Data.length > 2 ? Data[2].urlImg : ''})`, backgroundSize: 'cover' }}
                                    lg className="post shadow rounded  m-3">
                                    <div className="bg-post">

                                        <div className="post-title">
                                            {Data.length > 2 &&
                                                Data[2].titulo
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="post-autor">
                                                {Data.length > 2 &&
                                                    Data[2].usuario.nickname
                                                }
                                            </div>
                                            <div>
                                                {Data.length > 2 && <div
                                                    className="d-flex"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        console.log(Data[2].id)
                                                        handleCurtida(Data[2].id)
                                                    }}
                                                    >
                                                    <div>

                                                        {Data[2].curtidas.length}
                                                    </div>
                                                    <div className="mx-2">
                                                        <span class="material-icons">
                                                            thumb_up
                                                        </span>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </Row>





                        <Row>
                            {list}
                        </Row>
                    </Col>


                    <Col className="shadow-lg position-fixed ranking p-3 d-sm-none d-md-block">
                        <Row className="title-ranking p-3 font-weight-bold mt-5 pt-5">
                            Ranking
                        </Row>
                        <div>

                            {listRank}

                        </div>


                    </Col>
                </Row>
            </Container>
            {listSegredo}
        </>
    )
}

export default Feed;