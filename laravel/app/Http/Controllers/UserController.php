<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Services\UserService;
use App\Util\ResponseUtil;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $this->userService->createUser($request->all());

        if (!$user) {
            return ResponseUtil::errorResponse("Falha no registro do usuário", $request->errors(), 500);
        }

        return ResponseUtil::successResponse("Usuário registrado com sucesso", [
            'userId' => $user->id,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = $this->userService->getUserByEmail($request->email);

        if (!$user) {
            return ResponseUtil::errorResponse("As credenciais informadas são inválidas.", [], 401);
        }

        $token = $this->userService->authenticateUser($user, $request->password);

        if (!$token) {
            return ResponseUtil::errorResponse("As credenciais informadas são inválidas.", [], 401);
        }

        $data = [
            'userId' => $user->id,
            'token' => $token,
        ];
        $bearer = "Bearer $token";
        return ResponseUtil::successResponse("Login realizado com sucesso.", $data, 200)->withCookie(
            cookie('Authorization', $bearer, 0, null, null, false, false, true, 'Strict')
        );
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $this->userService->logoutUser($user);

        return ResponseUtil::successResponse("Logout realizado com sucesso.", [], 200)
            ->withCookie(cookie('Authorization', '', 0, null, null, false, false, true, 'Strict'));
    }
}
