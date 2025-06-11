import React, { useState } from 'react';
import './TableStyles.css';

const TableComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Durva', age: 21 },
    { id: 2, name: 'Aarav', age: 23 },
    { id: 3, name: 'Meera', age: 20 },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newUser, setNewUser] = useState({ id: '', name: '', age: '' });
  const [editUser, setEditUser] = useState({ id: '', name: '', age: '' });

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const openAddDialog = () => {
    setNewUser({ id: '', name: '', age: '' });
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => setIsAddDialogOpen(false);

  const handleAddUser = () => {
    if (!newUser.id || !newUser.name || !newUser.age) {
      alert('Please fill in all fields.');
      return;
    }
    setData([...data, { ...newUser, id: Number(newUser.id), age: Number(newUser.age) }]);
    closeAddDialog();
  };

  const openEditDialog = (user) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => setIsEditDialogOpen(false);

  const handleEditSave = () => {
    setData(data.map((item) =>
      item.id === editUser.id ? { ...editUser, age: Number(editUser.age) } : item
    ));
    closeEditDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData(data.filter(user => user.id !== id));
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">User Table</h2>
      <button className="add-button" onClick={openAddDialog}>Add User</button>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleViewClick(user)}>View</button>
                <button onClick={() => openEditDialog(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Dialog */}
      {(isDialogOpen && selectedUser) && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>User Details</h3>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}

      {/* Add Dialog */}
      {isAddDialogOpen && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Add New User</h3>
            <input
              type="number"
              placeholder="ID"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            />
            <div className="dialog-buttons">
              <button onClick={handleAddUser}>Add</button>
              <button onClick={closeAddDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Edit User</h3>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
            <input
              type="number"
              value={editUser.age}
              onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
            />
            <div className="dialog-buttons">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={closeEditDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
