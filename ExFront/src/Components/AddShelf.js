import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function AddShelf() {

    const navigate = useNavigate();
    const [name, setName] = useState('');

    async function addSelf() {
        const newShelf = {
            Description: name
        }

        try {
            const addNewShelf = await fetch("https://examen-app-back.herokuapp.com/api/sequelize/shelf",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newShelf)
                }).then((response) => {
                    response.json().then((res) => alert(res))

                    if (response.status === 200) {
                        navigate("/shelves");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/shelves");
    }

    return (
        <Fragment>
            <div className="add">
                Adauga un nou raft
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Raft Name" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="Add Shelf" onClick={addSelf} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}

export default AddShelf;