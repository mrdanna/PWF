<?php

namespace App\Http\Controllers\Api;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MahasiswaController extends Controller
{
    // GET: Tampilkan semua mahasiswa
    public function index()
    {
        $mahasiswa = Mahasiswa::all();
        return response()->json($mahasiswa);
    }

    // POST: Tambah mahasiswa baru
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:20|unique:mahasiswa',
            'jurusan' => 'required|string|max:100',
        ]);

        $mahasiswa = Mahasiswa::create($request->all());

        return response()->json([
            'message' => 'Mahasiswa berhasil ditambahkan',
            'data' => $mahasiswa
        ], 201);
    }

    //PUT: Edit data mahasiswa
    public function update(Request $r, $id){
        $mhs = Mahasiswa::findOrFail($id);
        $r->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:20|unique:mahasiswa,nim,' . $id,
            'jurusan' => 'required|string|max:100',
        ]);

        $mhs->update($r->all());

        return response()->json([
            'message' => 'Data mahasiswa berhasil diperbarui',
            'data' => $mhs
        ]);
    }

    //DELETE: hapus data mahasiswa
    public function delete($id){
        $mhs = Mahasiswa::findOrFail($id);
        $mhs->delete();

        return response()->json([
            'message' => 'Data mahasiswa berhasil dihapus'
        ]);
    }
}
