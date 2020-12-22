import { Container, Row, Col } from "react-bootstrap";
import './style.css'
function Admin() {
    return (
        <>
            <Container fluid className="post-box pl-5 mt-5 pt-5">

                <Row>
                    <Col lg="9">
                        <Row className="post-bigtitle">
                            Painel de administração
                        </Row>
                    </Col>


                    <Col className="shadow-lg position-fixed ranking p-3">
                        <Row className="title-ranking p-3 font-weight-bold mt-5 pt-5">
                            Administração
                        </Row>
                        <div>

                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Instituições
                                    </div>
                                    <div className="rank-point small">
                                        Todas as instituições
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Alunos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os alunos
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Cursos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os cursos
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Postagem
                                    </div>
                                    <div className="rank-point small">
                                        Todos os posts
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Dicas
                                    </div>
                                    <div className="rank-point small">
                                        Todos as dicas
                                    </div>
                                </div>
                            </div>
                            <div style={{cursor:'pointer'}}className=" d-flex justify-content-start my-3 p-2 rank-user shadow">
                                
                                <div className="mr-2">
                                    
                                </div>
                                <div>                                    
                                    <div className="rank-name">
                                        Objetivos
                                    </div>
                                    <div className="rank-point small">
                                        Todos os objetivos
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

export default Admin;