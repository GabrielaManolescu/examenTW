import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";

import '../App.css'

function Home() {
    const navigate = useNavigate();
    return <Fragment>

        <div>
            <br></br>
            <br></br>
            <br></br>
            <h3>
                Examen- carti si rafturi!

            </h3>
            <br></br>
            <br></br>
            <br></br>
        </div>

        <ButtonGroup variant="contained">

        </ButtonGroup>
        <br></br>
        <br></br>
        <br></br>
        <div>
            <img src="/li.png" alt="" />
        </div>

    </Fragment >
}

export default Home;