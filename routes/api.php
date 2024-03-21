<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomController;
use App\Http\Controllers\UserController;

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




// authentication
Route::post('/login', [UserController::class, 'AdministratorLogin']);
Route::post('/logout', [UserController::class, 'AdministratorLogout']);

// admin mgmt
Route::get('/getmgmtheader', [CustomController::class, 'getHeader']);
Route::put('/updatemgmtheader/{id}', [CustomController::class, 'updateMgmtHeader']);
Route::get('/getmgmtmission', [CustomController::class, 'getMgmtMission']);
Route::put('/updatemgmtmission/{id}', [CustomController::class, 'updateMgmtMission']);
Route::get('/getmgmtvision', [CustomController::class, 'getMgmtVision']);
Route::put('/updatemgmtvision/{id}', [CustomController::class, 'updateMgmtVision']);
Route::get('/getmgmtservice', [CustomController::class, 'getMgmtServices']);
Route::put('/updatemgmtservice/{id}', [CustomController::class, 'updateMgmtServices']);
Route::get('/getmgmtcontact', [CustomController::class, 'getMgmtContacts']);
Route::put('/updatemgmtcontact/{id}', [CustomController::class, 'updateMgmtContacts']);
Route::get('/getmgmtproduct', [CustomController::class, 'getMgmtProducts']);
Route::put('/updatemgmtproduct/{id}', [CustomController::class, 'updateMgmtProducts']);
Route::put('/updatemgmtproductimage/{id}', [CustomController::class, 'updateMgmtProductImage']);


// viewing
Route::get('/getwebdata', [CustomController::class, 'getWebDatav2']);
Route::get('/getproducts', [CustomController::class, 'getproducts']);
Route::get('/getallproducts', [CustomController::class, 'getallproducts']);
Route::get('/getspecificproduct/{id}', [CustomController::class, 'getspecificproduct']);
Route::get('/getclients', [CustomController::class, 'getclients']);
Route::get('/getallclients', [CustomController::class, 'getallclients']);
Route::get('/getmissionvision', [CustomController::class, 'getmissionvision']);
Route::get('/getcompanyhistory', [CustomController::class, 'getcompanyhistory']);
Route::get('/getcontactdetails', [CustomController::class, 'getcontactdetails']);
Route::get('/getallservices', [CustomController::class, 'getallservices']);
