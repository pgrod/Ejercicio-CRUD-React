import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';

const API_URL = 'https://api.escuelajs.co/api/v1/users';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (user) => {
    try {
      await axios.post(API_URL, user);
      Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar el usuario', 'error');
    }
  };

  const handleUpdate = async (id, user) => {
    try {
      await axios.put(`${API_URL}/${id}`, user);
      Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire('Éxito', 'Usuario eliminado correctamente', 'success');
      fetchUsers();
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Gestión de Usuarios</h1>
        <p className="text-muted">CRUD con React y Bootstrap</p>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              {editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
            </div>
            <div className="card-body">
              <UsuarioForm 
                onAdd={handleAdd} 
                onUpdate={handleUpdate} 
                editingUser={editingUser} 
              />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">Lista de Usuarios</div>
            <div className="card-body">
              <UsuarioList 
                users={users} 
                onEdit={setEditingUser} 
                onDelete={handleDelete} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;