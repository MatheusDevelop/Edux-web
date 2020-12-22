import AddAluno from "../../../components/Dash/AddAluno";
import {Row, Col } from "react-bootstrap";

function Alunos(props) {

    return (
        <Col lg="9">
            <Row className="post-bigtitle">
                Adicionar alunos
            </Row>
            <AddAluno att={props.att} data={props.data}/>
        </Col>
    )
}

export default Alunos;