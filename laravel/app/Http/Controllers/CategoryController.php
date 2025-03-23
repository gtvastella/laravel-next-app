<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Util\ResponseUtil;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = $this->categoryService->getAllCategories();
        $data = [
            'total' => $categories->count(),
            'categories' => $categories->all(),
        ];

        return ResponseUtil::successResponse("Categorias obtidas com sucesso.", $data);
    }
}
