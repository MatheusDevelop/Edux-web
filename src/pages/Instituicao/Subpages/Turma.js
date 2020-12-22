import {Row, Col } from "react-bootstrap";
import AddTurma from "../../../components/Dash/AddTurma";

function Turma(props) {

    return (
        <Col lg="9">
            <Row className="post-bigtitle">
                Adicionar turmas
            </Row>
            <AddTurma att={props.att} data={props.data}/>
        </Col>
    )
}

export default Turma;