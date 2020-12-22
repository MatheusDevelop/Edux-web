import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postRequestOptions, Url } from "../../configUrl";
import Objetivos from "./Subpages/Objetivos";
import Turmas from "./Subpages/Turmas";
function Professor() {
    const [Data, setData] = useState([]);
    const [Page, setPage] = useState(0);
    const id = useSelector(state => state.user.idAll);
    let makeRequest = ()=>{

        let requestUrl = Url+"Professor"
        
        let obj = {
            id
        }
        fetch(requestUrl,postRequestOptions(obj))
            .then((res)=>{
                if(res.status==200){
                    return res.json()
                }else{
                    throw new Error()
                }
    
            })
            .then((json)=>{
                setData(json)
            })
    }
    useEffect(() => {
        makeRequest();
    }, []);
    return (
        <>
            <Container fluid className="post-box pl-5 mt-5 pt-5">

                <Row>
                    {Page == 0 &&
                        <Objetivos data={Data} att={makeRequest}/>
                    }
                    {Page == 1 &&
                        <Turmas data={Data} att={makeRequest}/>
                    }
                    <Col className="shadow-lg position-fixed ranking p-3">
                        <Row className="title-ranking p-3 font-weight-bold mt-5 pt-5">
                            Professor
                        </Row>
                        <div>
                            <div
                            onClick={()=>{
                                setPage(0)
                            }}
                             style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Objetivos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os objetivos, adicionar objetivos etc...
                                    </div>
                                </div>
                            </div>
                            <div 
                            onClick={()=>{
                                setPage(1)
                            }}
                            style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Turmas
                                    </div>
                                    <div className="rank-point small">
                                        Todos as minhas turmas
                                    </div>
                                </div>
                            </div>
                            <div style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Dicas
                                    </div>
                                    <div className="rank-point small">
                                        Todas as dicas, adicionar dicas
                                    </div>
                                </div>
                            </div>
                        </div>



                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Professor;