import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from "@material-ui/core"


function Nav() {

    const styles = useState({ color: "black" });
    const navigate = useNavigate();
    return (

        <Fragment  >
            <AppBar style={{ color: "white", position: "relative" }}>
                <Toolbar >
                    <Typography variant="h8" > <h2>Examen   </h2> </Typography>
                    <p></p>
                    <ButtonGroup>

                        <Button className="pulse" color='secondary'
                            style={styles[0]}
                            onClick={function onClick() {
                                navigate("/");
                            }}
                        >Home</Button>
                        <Button className="pulse" color='secondary'
                            style={styles[0]}
                            onClick={function onClick() {
                                navigate("/books");
                            }}
                        >Lista Carti</Button>

                        <Button className="pulse" color='secondary'

                            style={styles[0]}
                            onClick={function onClick() {
                                navigate("/shelves");
                            }}
                        >Lista Rafturi</Button>

                    </ButtonGroup>
                    <ul className="nav-links"></ul>

                </Toolbar>
            </AppBar>
        </Fragment >

    );
}

export default Nav;