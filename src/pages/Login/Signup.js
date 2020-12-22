import { Container } from "react-bootstrap";
import './style.css'
import Logo from '../../assets/logo.svg'
import { Url, postRequestOptions } from "../../configUrl";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
function Signup() {

    const dispatch = useDispatch();
    const [ShowUnauth, setShowUnauth] = useState();
    const history = useHistory();


    useEffect(() => {



    }, []);

    const [Check, setCheck] = useState(0);
    const handleRequest = () => {
        let requestUrl = Url + "Cadastro"
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        let nickname = document.getElementById("nick").value;
        document.getElementById("senha").value = ""
        document.getElementById("email").value = ""
        let obj = {
            nickname,
            email,
            senha,

        }
        if (Check == 1) {
            obj.isAluno = true
        }
        if (Check == 2) {
            obj.isProfessor = true
        }
        if (Check == 3) {
            obj.isInstituicao = true
        }

        fetch(requestUrl, postRequestOptions(obj))
            .then((res) => {
                if (res.status == 200) {
                    alert("Usuario criado, redirecionando para o login")
                    history.push('/login')
                } else {
                    alert("Usuario ja existente")
                    throw new Error()
                }
            })

    }
    return (
        <div className="background-login d-flex align-items-center justify-content-center">
            <div className="filter"></div>
            <div className="login-form d-flex flex-column align-items-center justify-content-start">
                <div className="form-box rounded shadow-lg d-flex justify-content-center align-items-center p-5">
                    <img src={Logo} className="img-fluid" />
                </div>
                <div className="form-inputs">
                    <div className="form-input mt-3">
                        <label>
                            Nickname
                        </label>
                        <div className="mt-2">
                            <input type="email" id="nick" placeholder="Seu nickname" />
                        </div>
                    </div>
                    <div className="form-input mt-3">
                        <label>
                            Email
                        </label>
                        <div className="mt-2">
                            <input type="email" id="email" placeholder="Seu email" />
                        </div>
                    </div>
                    <div className="form-input mt-3">
                        <label>
                            Senha
                        </label>
                        <div className="mt-2">
                            <input type="password" id="senha" placeholder="Sua senha" />
                        </div>
                        <label>
                            Permissao
                        </label>
                        <div className="mt-2 d-flex justify-content-start align-items-center small">
                            <input
                                onClick={() => {
                                    if (Check == 1) {
                                        setCheck(0)
                                    } else {
                                        setCheck(1)
                                    }
                                }}
                                checked={Check == 1 ? 'checked' : ''} style={{ width: '10px' }} type="checkbox" placeholder="ok" />
                            Aluno
                        </div>
                        <div className="mt-2 d-flex justify-content-start align-items-center small">
                            <input
                                onClick={() => {
                                    if (Check == 2) {
                                        setCheck(0)
                                    } else {
                                        setCheck(2)
                                    }
                                }}
                                checked={Check == 2 ? 'checked' : ''} style={{ width: '10px' }} type="checkbox" placeholder="ok" />
                            Professor
                        </div>
                        <div className="mt-2 d-flex justify-content-start align-items-center small">
                            <input
                                onClick={() => {
                                    if (Check == 3) {
                                        setCheck(0)
                                    } else {
                                        setCheck(3)
                                    }
                                }}
                                checked={Check == 3 ? 'checked' : ''} style={{ width: '10px' }} type="checkbox" placeholder="ok" />
                            Instituição
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            history.push('/login')
                        }}
                        style={{ cursor: 'pointer' }}
                        className="small color-purple mt-5">
                        Entrar com login
                    </div>

                    {Check != 0 ?
                        <div onClick={() => {
                            handleRequest()
                        }} style={{ cursor: 'pointer' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                            <div>
                                Cadastrar
                                </div>
                            <div class="material-icons">arrow_right_alt</div>
                        </div>
                        :
                        <div onClick={() => {
                        }} style={{ cursor: 'not-allowed' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                            <div>
                                Cadastrar
                                </div>
                            <div class="material-icons">arrow_right_alt</div>
                        </div>
                    }

                    <hr />

                </div>
            </div>
        </div>
    )
}

export default Signup;