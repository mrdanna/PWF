<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MahasiswaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/mahasiswa', [MahasiswaController::class, 'index']); //mengambil data
// Route::post('/mahasiswa', [MahasiswaController::class, 'store']); //mengirim data
// Route::put('/mahasiswa/{id}', [MahasiswaController::class, 'update']); // mengedit data
// Route::delete('/mahasiswa/{id}', [MahasiswaController::class, 'delete']); // menghapus data


Route::post('/register', [AuthController::class, 'register']);
Route::get('/user', [AuthController::class, 'user']);
Route::post('/login', [AuthController::class, 'login']);

// Route yang dilindungi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/mahasiswa', [MahasiswaController::class, 'index']);
    Route::post('/mahasiswa', [MahasiswaController::class, 'store']);
    Route::put('/mahasiswa/{id}', [MahasiswaController::class, 'update']);
    Route::delete('/mahasiswa/{id}', [MahasiswaController::class, 'destroy']);
});
