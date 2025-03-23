<?php

namespace App\Repositories;
use App\Repositories\BaseRepository;
use App\Models\Product;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function findByCategory($categoryId)
    {
        return $this->model->where('category_id', $categoryId)->get();
    }

    public function findByCategoryAndTermPaginated($page, $perPage, $categoryId, $search)
    {
        $query = $this->model->query();
        $query->select('products.*', 'categories.name as category_name')
              ->join('categories', 'products.category_id', '=', 'categories.id');

        if ($categoryId) {
            $query->where('categories.id', $categoryId);
        }
        if ($search) {
            $query->where(function ($q) use ($search) {
            $q->where('products.name', 'like', "%{$search}%")
              ->orWhere('products.description', 'like', "%{$search}%");
            });
        }
        \Log::info($query->toSql());

        return $query->paginate($perPage, ['*'], 'page', $page);
    }


}
