import React, { useState } from 'react';
import api from '../../axios';

function MahasiswaForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nama: '',
    nim: '',
    jurusan: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Contoh submit ke API, bisa kamu isi sesuai kebutuhan
    try {
      // misal pakai axios atau api dari luar
      await api.post('/api/mahasiswa', form);
      alert('Data berhasil disimpan');
      onSuccess(); // panggil callback saat sukses
    } catch (error) {
      console.error('Gagal simpan data', error);
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

      <button type="submit">Simpan</button>
      {/* Button Kembali */}
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Kembali
      </button>
    </form>
  );
}

export default MahasiswaForm;
