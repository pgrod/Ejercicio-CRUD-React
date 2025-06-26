function UsuarioList({ users, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Email</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  className="rounded-circle" 
                  width="50" 
                  height="50" 
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => onEdit(user)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => onDelete(user.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuarioList;
