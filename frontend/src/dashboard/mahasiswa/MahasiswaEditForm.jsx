// src/pages/mahasiswa/MahasiswaEditForm.js
import React, { useState, useEffect } from 'react';
import api from '../../axios';

function MahasiswaEditForm({ data, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nama: '',
    nim: '',
    jurusan: ''
  });

  useEffect(() => {
    if (data) {
      setForm({
        nama: data.nama || '',
        nim: data.nim || '',
        jurusan: data.jurusan || ''
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/mahasiswa/${data.id}`, form);
      alert('Data berhasil diubah');
      onSuccess();
    } catch (error) {
      console.error('Gagal mengubah data', error);
      alert('Terjadi kesalahan saat mengubah data');
    }
  };

  return (
    <form className="form-mahasiswa" onSubmit={handleSubmit}>
      <div>
        <label>Nama</label>
        <input type="text" name="nama" value={form.nama} onChange={handleChange} required />
      </div>
      <div>
        <label>NIM</label>
        <input type="text" name="nim" value={form.nim} onChange={handleChange} required />
      </div>
      <div>
        <label>Jurusan</label>
        <input type="text" name="jurusan" value={form.jurusan} onChange={handleChange} required />
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Kembali
      </button>
    </form>
  );
}

export default MahasiswaEditForm;
