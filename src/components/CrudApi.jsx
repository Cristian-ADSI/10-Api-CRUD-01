import React, { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helper/helpHttp";
import Loader from "./Loader";
import Messages from "./Messages";

const CrudApi = () => {
  const [db, setDb] = useState();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.table(db);
  let api = helpHttp();
  let url = "http://localhost:5000/Saints";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((resp) => {
        if (resp.err) {
          setError(resp);
          setDb(null);
        } else {
          setDb(resp);
          setError(null);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [url]);

  const createData = (dataForm) => {
    dataForm.id = Date.now();

    let options = {
      body: dataForm,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((resp) => {
      // console.log(resp);
      resp.err ? setError(resp) : setDb([...db, resp]);
    });
  };

  const updateData = (dataForm) => {
    let endpoint = `${url}/${dataForm.id}`;
    let options = {
      body: dataForm,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((resp) => {
      // console.log(resp);
      if (resp.err) {
        setError(resp);
      } else {
        let newData = db.map((e) => (e.id === dataForm.id ? dataForm : e));
        setDb(newData);
      }
    });
  };

  const deleteData = (id) => {
    let endpoint = `${url}/${id}`;
    let isDelete = window.confirm(
      `Estas seguro de eliminar el registro ??${id}`
    );

    let options = {
      headers: { "content-type": "application/json" },
    };
    
    if (isDelete) {
      api.del(endpoint, options).then((resp) => {
        // console.log(resp);
        if (resp.err) {
        } else {
          let newData = db.filter((e) => e.id !== id);
          setDb(newData);
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <h1 className="text-center mt-3">API CRUD</h1>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {loading && <Loader />}
      {error && (
        <Messages
          msg={`Error ${error.status}: ${error.statusText}`}
          bgcolor={"danger"}
        />
      )}
      {db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </>
  );
};

export default CrudApi;
