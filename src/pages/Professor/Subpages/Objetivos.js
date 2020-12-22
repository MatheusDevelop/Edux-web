import { useEffect, useState } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import AddObjetivo from "../../../components/Dash/AddObjetivo";
import AddObjetivoConcluido from "../../../components/Dash/AddObjetivoConcluido";
import ObjetivosPend from "../../../components/Dash/Objetivos";
function Objetivos(props) {
    return (
        <Col lg="9" className="text-white">
            <Row className="post-bigtitle">
                Gerenciar objetivos
            </Row>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Objetivos das turmas">
                    <ObjetivosPend data={props.data} isProf/>
                </Tab>
                <Tab eventKey="profile" title="Adicionar objetivo">
                    <AddObjetivo att={props.att} data={props.data}/>
                </Tab>
                <Tab eventKey="corr" title="Corrigir objetivos">
                    <AddObjetivoConcluido att={props.att} data={props.data}/>
                </Tab>
            </Tabs>
        </Col>
    )
}

export default Objetivos;