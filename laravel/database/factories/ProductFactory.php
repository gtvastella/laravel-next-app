<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Category;

class ProductFactory extends Factory
{
    /**
     * O Model correspondente a esse Factory
     *
     * @var string
     */
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'image_url' => 'https://placehold.co/' . $this->faker->numberBetween(300, 800) . 'x' . $this->faker->numberBetween(200, 600) . '?text=' . urlencode($this->faker->word()),
            'category_id' => Category::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
