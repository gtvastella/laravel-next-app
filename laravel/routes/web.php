<?php

use Illuminate\Support\Facades\Route;
use app\Http\Controllers\ProductController;
use app\Http\Controllers\CategoryController;
use app\Http\Controllers\UserController;
Route::get('/', function () {
    return view('welcome');
});
