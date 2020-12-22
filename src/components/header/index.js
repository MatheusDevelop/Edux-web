import { Container } from 'react-bootstrap';
import Logo from '../../assets/logo.svg'
import { useState } from 'react';
import './style.css'
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [Show, setShow] = useState(false);
    const [Out, setOut] = useState(false);
    const nome = useSelector(state => state.user.nomeUser);
    return (
        <>
            <div className="fixed-top">

                <div className="header px-2 shadow-lg d-flex justify-content-between">
                    <div className="header-menu"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {

                            if (Show) {
                                setOut(true)
                                setTimeout(() => {
                                    setShow(false)
                                    setOut(false)
                                }, 700);
                            } else {
                                setOut(false)
                                setShow(true)
                            }
                        }}
                    >
                        <div className="bar-menu"></div>
                        <div className="bar-menu-md"></div>
                        <div className="bar-menu-sm"></div>
                    </div>
                    <div className="header-logo" onClick={()=>{history.push('/feed')}}>
                        <img src={Logo} width="100" />
                    </div>

                    <div className="header-perfil d-flex justify-content-between align-items-center text-white ">
                        <div className="small mx-3">
                            Ola, <b>{nome}!</b>
                        </div>
                        <div className="header-picture">
                        </div>
                        <div 
                         onClick={()=>{
                             dispatch({
                                 type:'DESLOGAR'
                             })
                             history.push('/login')
                            }}
                        className="header-logout mx-3" style={{ cursor: 'pointer' }}>
                            <div class="material-icons text-white">exit_to_app</div>
                        </div>
                    </div>

                </div>
            </div>
            {Show &&
                <div className={Out ? "slideout shadow-lg sidebar" : "slidein shadow-lg sidebar"}>
                    <div className="slidein shadow-lg sidebar-nav mt-5 pt-5">
                        <div
                            onClick={() => {
                                setOut(true)
                                setTimeout(() => {
                                    history.push('/feed')
                                    setShow(false)
                                    setOut(false)
                                }, 700);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="side-menu px-3 my-3 d-flex justify-content-between align-items-end">
                            <div>
                                Feed
                        </div>
                            <div className="d-flex align-items-center">
                                <span class="material-icons d-flex align-items-end">
                                    <span class="material-icons">
                                        groups
                                    </span>
                                </span>
                            </div>
                        </div>


                        <div
                            onClick={() => {
                                setOut(true)
                                setTimeout(() => {
                                    history.push('/dash')
                                    setShow(false)
                                    setOut(false)
                                }, 700);
                            }}
                            style={{ cursor: 'pointer' }}
                            className="side-menu px-3 my-3 d-flex justify-content-between align-items-end">
                            <div>
                                Seu painel
                        </div>
                            <div className="d-flex align-items-center">
                                <span class="material-icons d-flex align-items-end">
                                    dashboard
                            </span>
                            </div>
                        </div>


                    </div>
                </div>

            }
        </>
    )
}

export default Header;