<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhloadController;
use App\Http\Controllers\UserController;

// public api
Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);
Route::get('/download/{id}',[PhloadController::class,'download']);

// private api
Route::post('/addimage',[PhloadController::class,'addImage']);
Route::post('/api',[PhloadController::class,'api']);
Route::get('/imagelist',[PhloadController::class,'imageList']);
Route::post('/updateimage/{id}',[PhloadController::class,'updateImage']);
Route::post('/deleteimage/{id}',[PhloadController::class,'deleteImage']);
Route::post('/editimage/{id}',[PhloadController::class,'editImage']);




Route::middleware('auth:sanctum')->get('/getall',[PhloadController::class,'allData']);
