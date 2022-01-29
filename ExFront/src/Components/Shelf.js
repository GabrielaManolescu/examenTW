import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Shelf() {
    const shelf = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [shelfData, setShelfData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });
    //

    const [id, setId] = useState('');
    const [name, setName] = useState('');

    async function fetchShelf() {
        setShelfData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`https://examen-app-back.herokuapp.com/api/sequelize/get-shelves/${shelf.shelfId}`);

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

    async function deleteShelf() {
        await fetch(`https://examen-app-back.herokuapp.com/api/sequelize/delete-shelf/${shelf.shelfId}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                navigate("/shelves");
            })
        })
    }

    function setNewShelf(shelfData) {
        setId(shelfData.data.ShelfId);
        setName(shelfData.data.Description);
    }

    async function updateShelf() {
        const updatedShelf = {
            Description: name
        }

        try {
            const addNewShelf = await fetch(`https://examen-app-back.herokuapp.com/api/sequelize/update-shelves/${shelf.shelfId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedShelf)
                }).then((response) => {
                    response.json().then((res) => alert(res)).then(_ => {
                        setId(-1);
                        setName('');
                        navigate('/shelves');
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }
    return (



        <Fragment>
            <h3 src={location?.state} alt={""}>
            </h3>
            {shelfData.loading && <CircularProgress />}
            {shelfData.loaded &&
                <div>
                    <h4>
                        {`Shelf Id: ${shelfData.data.ShelfId}`}

                    </h4>
                    <h4>
                        {`Shelf Name:       `}
                        <input type="text" defaultValue={shelfData.data.Description}
                            onChange={(ev) => setName(ev.target.value)}></input>
                    </h4>
                </div>
            }

            <Button color="primary"
                startIcon={<DeleteIcon></DeleteIcon>}
                onClick={function onClick() {
                    deleteShelf();
                }}>
                Stergere</Button>
            <Button color="primary"
                startIcon={<EditIcon></EditIcon>}
                onClick={function onClick() {
                    updateShelf();
                }}>
                Update</Button>
        </Fragment>
    );

}

export default Shelf;
