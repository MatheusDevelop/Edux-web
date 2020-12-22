import { useEffect, useState } from "react";
import { Row, Col} from "react-bootstrap";
import { useSelector } from "react-redux";
function Turmas(props) {
    const list = props.data.map((i) => (
        <Col lg
            style={{ height: '450px', maxWidth: "350px" }}
            className="d-flex flex-column justify-content-around post shadow rounded px-5 py-2 m-3 bg-purple border border-white">
            <h4>
                {i.turma.nome}
            </h4>
            <p className="font-weight-bold">
                {i.turma.descricao}               
            </p>
        </Col>
    ))
    return (

        <Col lg="9" className="text-white">
            <Row className="post-bigtitle">
                Suas turmas
            </Row>
            <Row className="d-flex justify-content-start slidein">
                {list}
            </Row>
        </Col>



    )
}

export default Turmas;