import { useEffect, useState } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import ObjetivosPend from "../../../components/Dash/Objetivos";
import ObjetivosCompletos from "../../../components/Dash/ObjetivosCompletos";
import { Url, postRequestOptions } from "../../../configUrl";
function Objetivos(props) {
    return (
        <Col lg="9" className="text-white">
            <Row className="post-bigtitle">
                Seus objetivos
            </Row>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Objetivos pendentes">
                    <ObjetivosPend data={props.data}/>
                </Tab>
                <Tab eventKey="profile" title="Objetivos completos">
                    <ObjetivosCompletos data={props.data} />
                </Tab>
            </Tabs>
        </Col>



    )
}

export default Objetivos;