import { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { postRequestOptions, Url } from "../../configUrl";

function AddTurma(props) {
    const [CurrentDescribe, setCurrentDescribe] = useState('');

    const [ShowLoading, setShowLoading] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);

    const [CurrentCursoId, setCurrentCursoId] = useState('');
    const [CurrentTurmaName, setCurrentTurmaName] = useState('');
    const [CurrentCursoName, setCurrentCursoName] = useState('');
    const list = props.data.cursos.map((i) => (
            <Dropdown.Item
                onClick={()=>{
                    setCurrentCursoId(i.id)
                    setCurrentCursoName(i.nomeCurso)
                }}
            >
                {i.nomeCurso}
            </Dropdown.Item>
        )
    );

    const handleRequest = () => {
        let requestUrl = Url + "CreateTurma"
        let obj = {
            instituicaoid: props.data.id,
            cursoid: CurrentCursoId,
            nome:CurrentTurmaName,
            descricao:CurrentDescribe
        }

        setShowLoading(true)
        
        fetch(requestUrl, postRequestOptions(obj))
        .then((res) => {
            if (res.status == 200) {

                setShowLoading(false)
                setShowSuccess(true)

                setCurrentDescribe('')
                setCurrentCursoId('')
                setCurrentTurmaName('')
                props.att();
                setTimeout(()=>{
                    setShowSuccess(false)

                },2500)
            }
        })

    }

    return (
        <Row className="d-flex justify-content-center align-items-center text-dark slidein">
            {ShowLoading &&
                <div className="loading-request shadow-lg bg-white d-flex align-items-center justify-content-center flex-column" style={{ width: '50%', height: '450px', position: 'absolute', zIndex: '12', }}>
                    <div>
                        <div class="spinner-border title-ranking"
                            role="status"
                            style={{ width: '200px', height: '200px', fontSize: '65px' }}
                        >
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="mt-5">
                        Criando a turma
                </div>
                </div>
            }
            {ShowSuccess &&

                <div className="toggle loading-request shadow-lg bg-white d-flex align-items-center justify-content-center flex-column" style={{ width: '50%', height: '450px', position: 'absolute', zIndex: '12', }}>
                    <div>
                        <span class="material-icons text-success" style={{ fontSize: '200px' }}>
                            check_circle
                    </span>
                    </div>
                    <div className="mt-5">
                        Turma criada
                </div>
                </div>
            }

            <Col lg="7" className="shadow rounded m-3 p-3 big-post form-objetivo d-flex flex-column justify-content-center align-items-start">
                <div className="form-input mt-3">
                    <label className="title-ranking mb-5">
                        <b>Selecione um curso</b><br />
                        <small>e descreva a turma</small>
                    </label>
                    <div className="mt-2">
                        <div className="my-3">
                            <input onChange={(e)=>{
                                setCurrentTurmaName(e.target.value)
                            }}
                            value={CurrentTurmaName}
                            type="text" placeholder="Nome da turma" />
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="transparent" className="bg-purple text-white">
                                {CurrentCursoName.length >2 ? CurrentCursoName: 'Selecione um curso'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {list}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="form-input mt-3" style={{ width: '100%' }}>


                    <div className="mt-2">
                        <textarea onChange={(e) => {
                            setCurrentDescribe(e.target.value)
                        }}
                            value={CurrentDescribe}
                            type="email" style={{ width: '100%' }} id="email" className="shadow p-5" placeholder="Descreva a turma" />
                    </div>
                </div>
                <div className="form-input mt-3" style={{ width: '100%' }}>

                    {CurrentDescribe.length > 15 && CurrentCursoId.length > 2 && CurrentTurmaName.length>2 ?
                        <div className="mt-2">
                            <div
                                onClick={handleRequest}
                                style={{ cursor: 'pointer' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                                <div>
                                    Adicionar
                                </div>
                                <div class="material-icons">add</div>
                            </div>
                        </div>
                        :
                        <div className="mt-2">
                            <div data-toggle="tooltip" data-placement="top" title="Voce precisa adicionar + de 15 caracteres na descrição" style={{ cursor: 'not-allowed', opacity: '0.5' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                                <div>
                                    Adicionar
                                </div>
                                <div class="material-icons">add</div>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default AddTurma;