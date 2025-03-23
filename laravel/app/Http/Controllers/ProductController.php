<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use App\Util\ResponseUtil;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
            'category_id' => 'integer|min:1',
            'search' => 'string|max:255',
        ]);
        $categoryId = $request->query('category_id');
        $search = $request->query('search');
        $perPage = $request->query('per_page');
        $page = $request->query('page');

        $products = $this->productService->getProductsPaginated($page, $perPage, $categoryId, $search);
        $data = [
            'total' => $products->total(),
            'totalPages' => $products->lastPage(),
            'perPage' => $products->perPage(),
            'currentPage' => $products->currentPage(),
            'products' => $products->items(),
        ];

        return ResponseUtil::successResponse("Produtos obtidos com sucesso", $data);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $id = (int) $id;

        if (!is_numeric($id) || $id <= 0) {
            return ResponseUtil::errorResponse("ID de produto inválido", []);
        }

        $product = $this->productService->getProductById($id);
        if (!$product) {
            return ResponseUtil::errorResponse("Produto não encontrado", [], 404);
        }

        return ResponseUtil::successResponse("Produto obtido com sucesso", $product);
    }

}
