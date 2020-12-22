import { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { postRequestOptions, Url } from "../../configUrl";

function AddAluno(props) {


    const [ShowLoading, setShowLoading] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);
    const [ShowSearch, setShowSearch] = useState(false);

    const [CurrentName, setCurrentName] = useState('');
    const [SearchProf, setSearchProf] = useState([]);

    const [CurrentProf, setCurrentProf] = useState('');
    const [CurrentIdProf, setCurrentIdProf] = useState('');

    const [CurrentTurma, setCurrentTurma] = useState('');
    const [CurrentIdTurma, setCurrentIdTurma] = useState('');

    const handleSearch = () => {
        setShowSearch(true)
        let requestUrl = Url + "SearchAluno/" + CurrentName
        fetch(requestUrl)
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                }
            })
            .then((json) => {
                setSearchProf(json)
            })
    }
    const list = SearchProf.map((i) => (
        <div className="search-name" onClick={() => {
            setCurrentProf(i.nickname)
            setCurrentIdProf(i.id)
            setSearchProf([])
        }
        }>
            {i.nickname}
        </div>
    )
    )
    const listTurma = props.data.turmas.map((i) => (
        <Dropdown.Item
            onClick={() => {
                setCurrentIdTurma(i.id)
                setCurrentTurma(i.nome)
            }}
        >
            {i.nome}
        </Dropdown.Item>
    ))

    const handleRequest = () => {
        let obj = {
            turmaid: CurrentIdTurma,
            alunoid: CurrentIdProf
        }
        setShowLoading(true)

        let requestUrl = Url + "alunoturma"
        fetch(requestUrl, postRequestOptions(obj))
            .then((res) => {
                if (res.status == 200) {
                    setShowLoading(false)
                    setShowSuccess(true)
                    setCurrentIdProf('')
                    setCurrentProf('')
                    setCurrentTurma('')
                    setCurrentIdTurma('')
                    props.att();

                    setTimeout(() => {
                        setShowSuccess(false);
                        setSearchProf([])
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
                        Adicionando o aluno a Turma
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
                        Aluno adicionado
                </div>
                </div>
            }
            <Col lg="7" className="shadow rounded m-3 big-post form-objetivo d-flex flex-column justify-content-center align-items-start">
                <div className="form-input mt-3">
                    <label className="title-ranking mb-5">
                        <b>Busque por um aluno</b><br />
                        <small>selecione uma turma e clique em adicionar</small>
                    </label>
                    <div>

                        <small className=" color-purple ">
                            {CurrentProf.length > 1 ? <p>Você selecionou <b>{CurrentProf}</b></p> : ""}
                        </small>
                    </div>
                    <div className="mt-2 d-flex">
                        <input value={CurrentName} onChange={(e) => {
                            setCurrentName(e.target.value)
                            if (CurrentName.length > 2) {
                                handleSearch();
                            } else {
                                setSearchProf([])
                                setCurrentIdProf('')
                                setCurrentProf('')
                            }
                        }} type="text" placeholder="Nickname do aluno" />
                        {CurrentName.length > 2 ?
                            <div className="input-search" style={{ cursor: 'pointer' }} onClick={handleSearch}>
                                <span class="material-icons">
                                    search
                                </span>
                            </div>
                            :
                            <div className="input-search" style={{ cursor: 'not-allowed' }}>
                                <span class="material-icons">
                                    search
                                </span>
                            </div>
                        }
                    </div>

                    <div className="search-drop shadow-lg px-3 position-absolute">
                        {list}
                    </div>
                    <Dropdown className="mt-5">
                        <Dropdown.Toggle variant="transparent" className="bg-purple text-white">
                            {CurrentIdTurma.length > 2 ? CurrentTurma : 'Selecione uma turma'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {listTurma}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
                {CurrentIdProf.length > 1 && CurrentIdTurma.length > 1 ?
                    <div className="form-input mt-3" style={{ width: '100%' }}>
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
                    </div>
                    :
                    <div className="form-input mt-3" style={{ width: '100%' }}>
                        <div className="mt-2">
                            <div
                                style={{ cursor: 'not-allowed', opacity: '.5' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                                <div>
                                    Adicionar
                                </div>
                                <div class="material-icons">add</div>
                            </div>
                        </div>
                    </div>
                }
            </Col>
        </Row >
    )
}

export default AddAluno;