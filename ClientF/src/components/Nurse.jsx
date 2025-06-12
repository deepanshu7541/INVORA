import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Nurse.css';
import { toast } from 'react-toastify';

const Nurse = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // user being edited

  

  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const response = await fetch('http://localhost:3000/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Could not load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    toast.info(`Edit user ${userId} (feature not implemented)`);
    // navigate(`/edit-user/${userId}`) or open modal
  };

  const handleDelete = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) throw new Error("Delete failed");
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh list
    } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete user");
    }
    };

  return (
    <div className="nurse-container">
      <Sidebar />
      <Header />

      <div className="nurse-content">
        <h2>All Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* <button onClick={() => handleEdit(user._id)}>Edit</button> */}
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    {editingUser && (
                    <div className="edit-modal">
                        <h3>Edit User</h3>
                        <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const updatedUser = {
                            name: e.target.name.value,
                            email: e.target.email.value,
                            role: e.target.role.value,
                            };

                            try {
                            const token = JSON.parse(localStorage.getItem("auth"))?.token;
                            const res = await fetch(`http://localhost:3000/api/v1/users/${editingUser._id}`, {
                                method: "PUT",
                                headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify(updatedUser),
                            });

                            if (!res.ok) throw new Error("Update failed");

                            toast.success("User updated");
                            setEditingUser(null);
                            fetchUsers(); // refresh list
                            } catch (err) {
                            toast.error("Update failed");
                            }
                        }}
                        >
                        <input defaultValue={editingUser.name} name="name" required />
                        <input defaultValue={editingUser.email} name="email" required />
                        <select name="role" defaultValue={editingUser.role}>
                            <option value="admin">Admin</option>
                            <option value="nurse">Nurse</option>
                        </select>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditingUser(null)}>Cancel</button>
                        </form>
                    </div>
                    )}
                    <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Nurse;