import { Row, Col } from "react-bootstrap";

function Objetivos(props) {
    const list = props.data.map((i, index) => {
        return i.turma.objetivos.map((objetivo) => (
            <Col lg
                style={{ height: '450px', maxWidth: "350px" }}
                className="d-flex flex-column justify-content-around post shadow rounded px-5 py-2 m-3 bg-purple border border-white">
                <h4>
                    {props.data[index].turma.nome}
                </h4>
                <p className="font-weight-bold">
                    {objetivo.descricao}
                    <br />

                    {props.isProf ?
                        <div>
                        </div>
                        :
                        <div>                            
                        </div>
                    }
                </p>
            </Col>
        ))
    })
    return (
        <Row className="d-flex justify-content-start slidein">
            {list}
        </Row>
    )
}

export default Objetivos;