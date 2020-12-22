import AddCurso from "../../../components/Dash/AddCurso";
import {Row, Col } from "react-bootstrap";

function Cursos(props) {

    return (
        <Col lg="9">
            <Row className="post-bigtitle">
                Adicionar cursos
            </Row>
            <AddCurso att={props.att} data={props.data}/>
        </Col>
    )
}

export default Cursos;