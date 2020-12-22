import AddProfessor from "../../../components/Dash/AddProfessores";
import {Row, Col } from "react-bootstrap";

function Professores(props) {

    return (
        <Col lg="9">
            <Row className="post-bigtitle">
                Adicionar professores
            </Row>
            <AddProfessor att={props.att} data={props.data}/>
        </Col>
    )
}

export default Professores;