import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const initialForm = {
  name: '',
  email: '',
  password: '',
  avatar: ''
};

function UsuarioForm({ onAdd, onUpdate, editingUser }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        password: '',
        avatar: editingUser.avatar
      });
    } else {
      setForm(initialForm);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.avatar) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    if (editingUser) {
      onUpdate(editingUser.id, form);
    } else {
      onAdd(form);
    }

    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre</label>
        <input 
          type="text" 
          className="form-control" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Ingrese el nombre"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input 
          type="email" 
          className="form-control" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          placeholder="Ingrese el email"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Contraseña</label>
        <input 
          type="password" 
          className="form-control" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder="Ingrese la contraseña"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Avatar (URL)</label>
        <input 
          type="text" 
          className="form-control" 
          name="avatar" 
          value={form.avatar} 
          onChange={handleChange} 
          placeholder="URL de imagen"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {editingUser ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default UsuarioForm;