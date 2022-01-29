import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Export() {
    const navigate = useNavigate();
    const [result, setResult] = useState([]);

    const getData = () => {
        fetch('https://examen-app-back.herokuapp.com/api/sequelize/shelves')
            .then(response => response.json())
            .then(res => setResult(res));

    }

    useEffect(() => {
        getData();
    })

    return (
        <div className="container">
            <h3 className="mt-3 text-success"><center>Export React Table Data into EXCEL Sheet</center></h3>
            <div className="row mt-4">
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet" />
                <table className="table" id="table-to-xls">
                    <thead className="thead-dark">
                        <tr>
                            <th>NumeRaft</th>


                        </tr>

                    </thead>

                    <tbody>

                        {result.map((res) =>
                            <tr>
                                <td>{res.Description}</td>
                                {/* <td>{res.username}</td> */}
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default Export