<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(2)->create([
            'password' => Hash::make('abcd1234'),
        ]);
        Category::factory(3)->create()->each(function ($category) {
            Product::factory(5)->create([
                'category_id' => $category->id,
            ]);
        });
    }
}
