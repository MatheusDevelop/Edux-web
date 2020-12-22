import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Url ,postRequestOptions} from "../../configUrl";
import './style.css'
import Objetivos from "./Subpages/Objetivos";
import Segredos from "./Subpages/Segredos";
import Turmas from "./Subpages/Turmas";
function Aluno() {
    const id = useSelector(state => state.user.idAll);
    const [Page, setPage] = useState(0);
    const [Data, setData] = useState(
        [])
    ;
    let makeRequest = ()=>{

        
        let requestUrl = Url+"Aluno"
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
            <Container fluid className="post-box aluno pl-5 mt-5 pt-5">

                <Row>
                    {Page == 0 &&
                        <Objetivos data={Data} />
                    }
                    {Page ==1 &&
                        <Segredos/>
                    }
                    {Page == 2 &&
                        <Turmas data={Data} />
                    }
                    <Col className="shadow-lg position-fixed ranking p-3">
                        <Row className="title-ranking p-3 font-weight-bold mt-5 pt-5">
                            Aluno
                        </Row>
                        <div>
                            <div
                                onClick={() => {
                                    setPage(0)
                                }}
                                style={{ cursor: 'pointer' }}
                                className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Objetivos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os objetivos a serem alcançados
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    setPage(1)
                                }}
                                style={{ cursor: 'pointer' }}
                                className=" d-flex justify-content-start my-3 p-2 rank-user shadow"
                            >

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Segredos descobertos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os segredos descobertos
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    setPage(2)
                                }}
                                style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Suas turmas
                                    </div>
                                    <div className="rank-point small">
                                        Todos as suas turmas
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

export default Aluno;