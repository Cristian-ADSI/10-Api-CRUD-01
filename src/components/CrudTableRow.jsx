import React from "react";

const CrudTableRow = ({ element, setDataToEdit, deleteData }) => {
  let { name, constellation, id } = element;
  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td className="d-flex justify-content-evenly">
        <button className="btn btn-success me-1 ms-1" onClick={()=>setDataToEdit(element)}>Editar</button>
        <button className="btn btn-danger me-1 ms-1" onClick={()=>deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
