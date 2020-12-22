import { Container } from "react-bootstrap";
import './style.css'
import Logo from '../../assets/logo.svg'
import { Url, postRequestOptions } from "../../configUrl";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
function Login() {

    const dispatch = useDispatch();
    const [ShowUnauth, setShowUnauth] = useState();
    const history = useHistory();


    useEffect(() => {

        let requestUrl = Url + "Login"
        if (localStorage.getItem("email") != undefined && localStorage.getItem("senha") != undefined) {

            let obj = {
                email: localStorage.getItem("email"),
                senha: localStorage.getItem("senha")
            }

            fetch(requestUrl, postRequestOptions(obj))
                .then((res) => {
                    if (res.status == 200) {
                        return res.json()
                    } else {
                        throw new Error()
                    }
                })
                .then(json => {
                    if (json != undefined) {

                        localStorage.setItem("token_edux", json.token)
                        
                        dispatch({
                            type: 'LOGAR',
                            payload: {
                                idUser: jwt_decode(json.token).sub,
                                idAll: jwt_decode(json.token).nameid,
                                role: jwt_decode(json.token).given_name
                            }
                        })
                    
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })

        }
    }, []);


    const handleRequest = () => {
        let requestUrl = Url + "Login"
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        document.getElementById("senha").value = ""
        document.getElementById("email").value = ""
        let obj = {
            email,
            senha
        }

        fetch(requestUrl, postRequestOptions(obj))
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                } else {
                    alert("Usuario invalido")
                    throw new Error()
                }
            })
            .then(json => {
                localStorage.setItem("token_edux", json.token)

                localStorage.setItem("email",email)
                localStorage.setItem("senha",senha)
                
                dispatch({
                    type: 'LOGAR',
                    payload: {
                        idUser: jwt_decode(json.token).sub,
                        idAll: jwt_decode(json.token).nameid,
                        role: jwt_decode(json.token).given_name,
                        nomeUser:jwt_decode(json.token).unique_name

                    }
                })
                history.push('/feed')
            })
            .catch(() => {
                return
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
                    </div>                    
                    <div 
                    onClick={()=>{
                        history.push('/signup')
                    }}
                    style={{cursor:'pointer'}}
                    className="small color-purple mt-5"
                    >
                        Se cadastrar
                    </div> 
                    <div onClick={() => {
                        handleRequest()
                    }} style={{ cursor: 'pointer' }} className="mt-5 form-btn form-input  px-2 rounded d-flex justify-content-between align-items-center text-white">
                        <div>
                            Entrar
                            </div>
                        <div class="material-icons">arrow_right_alt</div>
                    </div>
                    <hr />

                </div>
            </div>
        </div>
    )
}

export default Login;