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
Route::post('/addnewmgmtheader', [CustomController::class, 'addnewmgmtheader']);
Route::get('/getmgmtheader', [CustomController::class, 'getHeader']);
Route::put('/updatemgmtheader/{id}', [CustomController::class, 'updateMgmtHeader']);
Route::post('/deletemgmtheader/{id}', [CustomController::class, 'deletemgmtheader']);

Route::post('/addnewmgmtmission', [CustomController::class, 'addnewmgmtmission']);
Route::get('/getmgmtmission', [CustomController::class, 'getMgmtMission']);
Route::put('/updatemgmtmission/{id}', [CustomController::class, 'updateMgmtMission']);
Route::post('/deletemgmtmission/{id}', [CustomController::class, 'deletemgmtmission']);

Route::post('/addnewmgmtvision', [CustomController::class, 'addnewmgmtvision']);
Route::get('/getmgmtvision', [CustomController::class, 'getMgmtVision']);
Route::put('/updatemgmtvision/{id}', [CustomController::class, 'updateMgmtVision']);
Route::post('/deletemgmtvision/{id}', [CustomController::class, 'deletemgmtvision']);

Route::post('/addnewmgmtservice', [CustomController::class, 'addnewmgmtservice']);
Route::get('/getmgmtservice', [CustomController::class, 'getMgmtServices']);
Route::put('/updatemgmtservice/{id}', [CustomController::class, 'updateMgmtServices']);
Route::post('/deletemgmtservices/{id}', [CustomController::class, 'deletemgmtservices']);

Route::post('/addnewmgmtcontact', [CustomController::class, 'addnewmgmtcontact']);
Route::get('/getmgmtcontact', [CustomController::class, 'getMgmtContacts']);
Route::put('/updatemgmtcontact/{id}', [CustomController::class, 'updateMgmtContacts']);
Route::post('/deletemgmtcontact/{id}', [CustomController::class, 'deletemgmtcontact']);

Route::get('/getmgmtproduct', [CustomController::class, 'getMgmtProducts']);
Route::put('/updatemgmtproduct/{id}', [CustomController::class, 'updateMgmtProducts']);

Route::get('/getmgmtcareer', [CustomController::class, 'getMgmtCareers']);
Route::get('/getspecificcareer/{id}', [CustomController::class, 'getspecificcareer']);
Route::put('/updatemgmtcareer/{id}', [CustomController::class, 'updateMgmtCareers']);
Route::post('/addnewmgmtcareer', [CustomController::class, 'addnewmgmtcareer']);
Route::post('/deletemgmtcareer/{id}', [CustomController::class, 'deletemgmtcareer']);


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
