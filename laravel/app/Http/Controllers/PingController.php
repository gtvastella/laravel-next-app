<?php
namespace App\Http\Controllers;
use Illuminate\Http\Response;
use App\Util\ResponseUtil;

class PingController extends Controller
{
    public function index()
    {
        return ResponseUtil::successResponse("Pong", null, Response::HTTP_OK);
    }
}
