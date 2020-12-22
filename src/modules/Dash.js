import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/header";
import Aluno from "../pages/Aluno";
import Instituicao from "../pages/Instituicao";
import Professor from "../pages/Professor";

function Dash() {
    const role = useSelector(state => state.user.role);
    return(
        <>
        <Header/>
        {role == "Aluno" &&
            <Aluno/>
        }
        {role == "Professor" &&
            <Professor/>
        }
        
        {role == "Instituicao" &&
            <Instituicao/>
        }

        </>
    )
}

export default Dash;