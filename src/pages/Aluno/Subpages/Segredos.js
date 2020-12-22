import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Url } from "../../../configUrl";

import { Container, Row, Col } from "react-bootstrap";

function Segredos() {
    const id = useSelector(state => state.user.id);
    const [Data, setData] = useState([]);
    useEffect(() => {
        fetch(Url + "Segredo/" + id)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log(json)
                setData(json)
            })
    }, [])
    const list = Data.map((i) => {
        console.log(i)
        return (

            <Col lg
                style={{ height: '450px', maxWidth: "350px" }}
                className="d-flex flex-column justify-content-around post shadow rounded px-5 py-2 m-3 bg-purple border border-white">
                <h4>
                    {i.segredo.nomeSegredo}
                </h4>
                <p className="font-weight-bold">
                    <img src={i.segredo.urlImg} className="img-fluid" />
                    <br />
                    
                </p>
            </Col>
        )

    })
    return (
        <Col lg="9" className="text-white">
            <Row className="post-bigtitle">
                Seus segredos descobertos
            </Row>
            <Row className="d-flex justify-content-start slidein">
                {list}
            </Row>
        </Col>
    )
}

export default Segredos;