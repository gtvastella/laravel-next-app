<?php

namespace App\Services;
use App\Repositories\ProductRepository;
use App\Services\BaseService;

class ProductService extends BaseService
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts()
    {
        return $this->productRepository->all();
    }

    public function getProductById($id)
    {
        return $this->productRepository->find($id);
    }

    public function getProductsByCategory($categoryId)
    {
        return $this->productRepository->findByCategory($categoryId);
    }

    public function getProductsPaginated($page, $perPage, $categoryId, $search)
    {
        return $this->productRepository->findByCategoryAndTermPaginated($page, $perPage, $categoryId, $search);
    }

}
