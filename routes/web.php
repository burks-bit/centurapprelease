<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CustomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\VisionController;
use App\Http\Controllers\HeaderController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CompanyHistoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', [CustomController::class, 'getWebData']);
Route::get('/', [HomeController::class, 'index']);

Route::resource('/home/users', UserController::class)->middleware('auth');
Route::resource('/home/missions', MissionController::class)->middleware('auth');
Route::resource('/home/visions', VisionController::class)->middleware('auth');
Route::resource('/home/headers', HeaderController::class)->middleware('auth');
Route::resource('/home/contacts', ContactController::class)->middleware('auth');
Route::resource('/home/clients', ClientController::class)->middleware('auth');
Route::resource('/home/products', ProductController::class)->middleware('auth');
Route::resource('/home/company_history', CompanyHistoryController::class)->middleware('auth');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
