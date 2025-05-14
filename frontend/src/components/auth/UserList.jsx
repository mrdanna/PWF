import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]); // Menyimpan data pengguna
  const [loading, setLoading] = useState(true); // Menandakan jika data sedang dimuat
  const [error, setError] = useState(null); // Menangani error

  useEffect(() => {
    // Mengambil data pengguna dari API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>' // Ganti dengan token yang valid
          }
        });
        setUsers(response.data); // Menyimpan data pengguna dalam state
        setLoading(false); // Mengubah status loading
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data'); // Menangani kesalahan
        setLoading(false); // Mengubah status loading
      }
    };

    fetchUsers(); // Menjalankan fungsi untuk mengambil data
  }, []); // Menjalankan efek hanya sekali saat komponen pertama kali dirender

  if (loading) {
    return <p>Loading...</p>; // Menampilkan loading jika data sedang dimuat
  }

  if (error) {
    return <p>{error}</p>; // Menampilkan pesan error jika terjadi kesalahan
  }

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
