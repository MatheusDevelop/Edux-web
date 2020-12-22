import { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { postRequestOptions, Url } from "../../configUrl";

function AddObjetivoConcluido(props) {

    const [CurrentId, setCurrentId] = useState('');
    const [CurrentTurmaId, setCurrentTurmaId] = useState('');
    const [CurrentObjetivoId, setCurrentObjetivoId] = useState('');

    const [CurrentAlunoName, setCurrentAlunoName] = useState('');
    const [CurrentObjName, setCurrentObjName] = useState('');

    const [ShowLoading, setShowLoading] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);
    const [CurrentNota, setCurrentNota] = useState(0);
    useEffect(() => {
    }, []);

    const list = props.data.map((i, index) => (
        i.turma.alunos.map((al) => (
            <Dropdown.Item
                onClick={() => {
                    setCurrentId(al.id)
                    setCurrentTurmaId(props.data[index].turma.id)
                    setCurrentAlunoName(al.aluno.nickname)
                }}
            >
                {al.aluno.nickname} - {props.data[index].turma.nome}
            </Dropdown.Item>
        ))
    ))
    const list2 = props.data.map((i, index) => {
        if(i.turma.id == CurrentTurmaId){
            return(
                i.turma.objetivos.map((obj)=>(
                    <Dropdown.Item
                        onClick={()=>{
                            setCurrentObjetivoId(obj.id)
                            setCurrentObjName(obj.descricao)
                        }}
                    >

                        {obj.descricao}
                    </Dropdown.Item>
                ))
            )
        }
        
    })
    const handleRequest = () => {
        let obj = {
            alunoid:CurrentId,
            objetivoid:CurrentObjetivoId,
            nota:CurrentNota
        }
        setShowLoading(true)
        fetch(Url+"AttrNota",postRequestOptions(obj))
            .then((res)=>{
                if(res.status == 200){
                    setShowLoading(false)
                    setShowSuccess(true)
                    setCurrentObjName('')
                    setCurrentNota(0)
                    setCurrentAlunoName('')
                    props.att()
                    setTimeout(() => {
                        setShowSuccess(false)
                    }, 2500);
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
                        Adicionando o objetivo para o aluno
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
                        Objetivo concluido adicionado
                </div>
                </div>
            }

            <Col lg="7" className="shadow rounded m-3 big-post form-objetivo d-flex flex-column justify-content-center align-items-start">
                <div className="form-input mt-3">
                    <label className="title-ranking mb-5">
                        <b>Selecione o aluno</b><br />
                        <small>e descreva a nota do objetivo</small>
                    </label>
                    <div className="mt-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="transparent" className="bg-purple text-white">
                                {CurrentAlunoName.length>2 ? CurrentAlunoName : 'Selecione um aluno da turma'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                {list}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-2">
                            <Dropdown.Toggle variant="transparent" className="bg-purple text-white">
                                {CurrentObjName.length>2?CurrentObjName:'Selecione um objetivo'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                {list2}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="mt-5">
                            <input type="number" value={CurrentNota} onChange={(e)=>{setCurrentNota(e.target.value)}} id="email" placeholder="De uma nota" />
                        </div>
                    </div>
                </div>
                <div className="form-input mt-3" style={{ width: '100%' }}>

                    <div className="mt-2">
                    </div>
                </div>
                <div className="form-input mt-3" style={{ width: '100%' }}>

                    {CurrentNota!=0 && CurrentId.length > 2 && CurrentObjetivoId.length >2 ?
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

export default AddObjetivoConcluido;