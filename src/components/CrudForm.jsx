import React from "react";
import { useState, useEffect } from "react";

const initialForm = {
  id: null,
  name: "",
  constellation: "",
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.constellation) {
      alert("datos incompletos");
      return;
    }
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="container">
      <h3>Agregar</h3>
      <form action="" onSubmit={handleSubmit} className="d-flex mt-3">
        <input
          className="form-control me-1"
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          className="form-control me-1 ms-1"
          type="text"
          name="constellation"
          placeholder="Constelacion"
          onChange={handleChange}
          value={form.constellation}
        />
        <input className="btn btn-primary me-1 ms-1" type="submit" value="Enviar" onClick={handleSubmit} />
        <input className="btn btn-secondary me-1 ms-1" type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
