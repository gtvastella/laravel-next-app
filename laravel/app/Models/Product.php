<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $table = 'products';
    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = [
        'category_id' => 'integer',
        'price' => 'float',
    ];

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
        'image_url',
    ];
}
