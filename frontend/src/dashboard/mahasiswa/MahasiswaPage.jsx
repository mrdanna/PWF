// function MahasiswaPage() {
//   return (
//     <div>
//       <h1>Selamat Datang di Dashboard</h1>
//       <p>Ini adalah halaman Mahasiswa.</p>
//     </div>
//   );
// }

// export default MahasiswaPage;
import React, { useEffect, useState } from 'react';
import api from '../../axios'; 
import '../../assets/css/mahasiswa.css';
import MahasiswaForm from './MahasiswaForm';
import MahasiswaEditForm from './MahasiswaEditForm';
import { useLocation } from 'react-router-dom';

function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const location = useLocation(); // lokasi route sekarang

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Reset form setiap kali route berubah (misal: klik menu sidebar)
  useEffect(() => {
    setShowForm(false);
    setEditData(null);
  }, [location]);

  const fetchMahasiswa = async () => {
    try {
      const response = await api.get('/api/mahasiswa');
      console.log('Data mahasiswa:', response.data); // debug cek struktur data console
      setMahasiswa(response.data); // atau response.data.data jika pakai Resource
    } catch (error) {
      console.error('Gagal mengambil data mahasiswa', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTambahData = () => {
    //alert('Fitur tambah data belum dibuat');
    setShowForm(true);
    setEditData(null);
  };

   const handleEdit = (mhs) => {
    setEditData(mhs);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchMahasiswa();
  };

  // Fungsi untuk menutup form saat tombol Kembali diklik
  const handleCancel = () => {
    setShowForm(false);
     setEditData(null);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>{showForm ? (editData ? 'Edit Mahasiswa' : 'Tambah Mahasiswa') : 'Data Mahasiswa'}</h1>
          {/* <h1>{showForm ? 'Tambah Mahasiswa' : 'Data Mahasiswa'}</h1> */}
           {!showForm && (
              <button className="btn-tambah" onClick={handleTambahData}>
                + Tambah Data
              </button>
            )}
          {/* <button className="btn-tambah" onClick={handleTambahData}>
            + Tambah Data
          </button> */}
        </div>

        {/* {showForm && <MahasiswaForm
          onSuccess={handleFormSuccess} 
          />} */}

           {showForm && (
              editData ? (
                <MahasiswaEditForm data={editData} onSuccess={handleFormSuccess} onCancel={handleCancel} />
              ) : (
                <MahasiswaForm onSuccess={handleFormSuccess} onCancel={handleCancel} />
              )
            )}

         {showForm && (
          <MahasiswaForm 
            onSuccess={handleFormSuccess} 
            onCancel={handleCancel}  // cancel kembali
          />
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          !showForm && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Jurusan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.length > 0 ? (
                  mahasiswa.map((mhs, index) => (
                    <tr key={mhs.id}>
                      <td>{index + 1}</td>
                      <td>{mhs.nama}</td>
                      <td>{mhs.nim}</td>
                      <td>{mhs.jurusan}</td>
                      <td>
                        {/* <button className="btn-edit">Edit</button> */}
                        <button className="btn-edit" onClick={() => handleEdit(mhs)}>Edit</button>
                        <button className="btn-hapus">Hapus</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="kosong">Tidak ada data.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )
        )}
      </div>
    </div>
  );
}

export default MahasiswaPage;
