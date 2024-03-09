<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomController;

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



// Route::middleware('auth:sanctum')->get('/getwebdata', [CustomController::class, 'getWebDatav2']);
Route::get('/getwebdata', [CustomController::class, 'getWebDatav2']);
Route::get('/getproducts', [CustomController::class, 'getproducts']);
Route::get('/getallproducts', [CustomController::class, 'getallproducts']);
Route::get('/getspecificproduct/{id}', [CustomController::class, 'getspecificproduct']);
Route::get('/getclients', [CustomController::class, 'getclients']);
Route::get('/getallclients', [CustomController::class, 'getallclients']);
Route::get('/getmissionvision', [CustomController::class, 'getmissionvision']);
Route::get('/getcompanyhistory', [CustomController::class, 'getcompanyhistory']);
Route::get('/getcontactdetails', [CustomController::class, 'getcontactdetails']);
