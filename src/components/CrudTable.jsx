import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  
  return (
    <div className=" container mt-3">
      <h3>Tabla de Datos</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constellacion</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={12}>
                sin datos
              </td>
            </tr>
          ) : (
            data.map((e,index) => (
              <CrudTableRow
                key={e.id}
                element={e}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
