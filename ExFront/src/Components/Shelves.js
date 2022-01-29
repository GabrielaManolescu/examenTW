import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { getId, setId } from './Util'

import InfoIcon from "@material-ui/icons/Info";
import { ToastContainer, toast } from 'react-toastify';


function Shelves() {
    const navigate = useNavigate();
    const [shelfData, setShelfData] = useState({
        data: {},
        loading: false,
        loaded: false,


    });

    async function fetchShelf() {
        setShelfData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {

            const response = await fetch("https://examen-app-back.herokuapp.com/api/sequelize/shelves");
            const data = await response.json();
            setShelfData({ data: data, loading: false, loaded: true });

            console.log(data);
        } catch (err) {
            setShelfData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!shelfData.loaded) {
            fetchShelf();
        }
    }, [shelfData.loaded]);



    return (
        <Fragment>
            <div className="lists">
                LISTA rafturi</div>



            <div className="search-bar">
                <input type="text" placeholder="Search Content" className="prompt" />
                <i className="search icon"></i>
            </div>



            {shelfData.loading && <CircularProgress />}
            {shelfData.loaded && shelfData.data.map(function
                renderShelf(shelf) {

                return (

                    <h4 key={shelf.ShelfId}>
                        {`Nume:  ${shelf.Description}`}
                        <Link to={`/shelf/${shelf.ShelfId}`}
                            state={{
                                Description: shelf.Description,
                            }}
                        > Delete/Update </Link>


                    </h4>

                );
            })}

            <Button
                startIcon={<AddIcon></AddIcon>}
                color="primary"
                className="pulse"
                onClick={function onClick() {
                    navigate("/shelves/newShelf");
                }}>
                Adauga un raft noua pentru carti
            </Button>
            <button
                startIcon={<InfoIcon />}
                className="pulse"
                color="primary"
                onClick={function onClick() {
                    navigate("/export");
                }}>
                Export rafturi
            </button>


        </Fragment >

    );
}

export default Shelves;