import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = async () => {
    try {
      console.log('Updating user with data:', formData); // Debugging output
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          // Add other fields as necessary
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) => 
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      resetForm();
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', email: '' });
    setIsEditing(false);
  };

  const handleEditButtonClick = (user) => {
    setFormData({ id: user.id, name: user.name, email: user.email });
    setIsEditing(true);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      
      <div className="mb-4 bg-white p-4 rounded-md shadow-sm">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {isEditing ? (
          <button onClick={handleEditUser} className="bg-green-500 text-white p-2 rounded-md transition duration-200 hover:bg-green-600">
            Update User
          </button>
        ) : (
          <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600">
            Add User
          </button>
        )}
        <button onClick={resetForm} className="bg-gray-500 text-white p-2 ml-2 rounded-md transition duration-200 hover:bg-gray-600">
          Cancel
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-md mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEditButtonClick(user)}
                  className="bg-yellow-500 text-white p-1 mr-2 rounded-md transition duration-200 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white p-1 rounded-md transition duration-200 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
