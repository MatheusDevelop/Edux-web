import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postRequestOptions, Url } from "../../configUrl";
import Alunos from "./Subpages/Alunos";
import Cursos from "./Subpages/Cursos";
import Professores from "./Subpages/Professores";
import Turma from "./Subpages/Turma";
function Instituicao() {    
    const [Data, setData] = useState({turmas:[]});
    const [Page, setPage] = useState(0);
    const id = useSelector(state => state.user.idAll);
    let MakeRequest = ()=>{
        
        let requestUrl = Url+"Instituicao"
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
    useEffect(() => {MakeRequest()}, []);
    return (
        <>
            <Container fluid className="post-box pl-5 mt-5 pt-5">

                <Row>
                    {Page == 0 &&
                        <Professores data={Data} att={MakeRequest}/>
                    }
                    {Page == 1 &&
                        <Alunos data={Data} att={MakeRequest}/>
                    }
                    {Page == 2 &&
                        <Turma data={Data} att={MakeRequest}/>
                    }
                    {Page == 3 &&

                        <Cursos data={Data} att={MakeRequest}/>
                    }
                    <Col className="shadow-lg position-fixed ranking p-3">
                        <Row className="title-ranking p-3 font-weight-bold mt-5 pt-5">
                            Administração
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
                                        Professores
                                    </div>
                                    <div className="rank-point small">
                                        Adicione professores nas suas turmas
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
                                        Alunos
                                    </div>
                                    <div className="rank-point small">
                                        Adicione alunos nas suas turmas
                                    </div>
                                </div>
                            </div>
                            
                            <div 
                            onClick={()=>{
                                setPage(2)
                            }}
                            style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Turmas
                                    </div>
                                    <div className="rank-point small">
                                        Crie turmas novas
                                    </div>
                                </div>
                            </div>
                            <div 
                            onClick={()=>{
                                setPage(3)
                            }}
                            style={{ cursor: 'pointer' }} className=" d-flex justify-content-start my-3 p-2 rank-user shadow">

                                <div className="mr-2">

                                </div>
                                <div>
                                    <div className="rank-name">
                                        Cursos
                                    </div>
                                    <div className="rank-point small">
                                        Crie cursos para sua turma
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

export default Instituicao;