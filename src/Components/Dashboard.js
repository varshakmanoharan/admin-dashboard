import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userForm, setUserForm] = useState({ name: '', email: '' });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const openModal = (user = null) => {
        setEditingUser(user);
        setUserForm(user ? { name: user.name, email: user.email } : { name: '', email: '' });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditingUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleAddOrUpdateUser = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Update user
                await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
                    name: userForm.name,
                    email: userForm.email,
                });
            } else {
                // Add new user
                await axios.post('https://jsonplaceholder.typicode.com/users', userForm);
            }
            fetchUsers();  // Refresh the user list after adding/updating
            closeModal();  // Close the modal
        } catch (error) {
            console.error('Error adding/updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="flex justify-center p-4 md:ml-64"> {/* Adjusted margin-left for the sidebar */}
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6"> {/* Updated dashboard container */}
                <h1 className="text-2xl mb-4">User Dashboard</h1>
                <button onClick={() => openModal()} className="bg-blue-500 text-white p-2 rounded">Add User</button>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => openModal(user)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal 
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal} 
                    className="max-w-sm mx-auto p-6 rounded bg-white"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    }}
                >
                    <h2 className="text-xl">{editingUser ? 'Edit User' : 'Add User'}</h2>
                    <form onSubmit={handleAddOrUpdateUser}>
                        <div className="mt-4">
                            <label className="block">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userForm.name}
                                onChange={handleInputChange}
                                required
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userForm.email}
                                onChange={handleInputChange}
                                required
                                className="border p-2 w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
                            {editingUser ? 'Update User' : 'Add User'}
                        </button>
                        <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded mt-4 ml-2">Cancel</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default Dashboard;
