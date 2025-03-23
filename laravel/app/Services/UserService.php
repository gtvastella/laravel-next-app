<?php

namespace App\Services;
use App\Repositories\UserRepository;
use App\Services\BaseService;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        return $this->userRepository->all();
    }

    public function getUserById($id)
    {
        return $this->userRepository->find($id);
    }

    public function createUser(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function updateUser($id, array $data)
    {
        return $this->userRepository->update($data, $id);
    }

    public function deleteUser($id)
    {
        return $this->userRepository->delete($id);
    }

    public function getUserByEmail($email)
    {
        return $this->userRepository->findByEmail($email);
    }

    public function authenticateUser($user, $password)
    {
        if (!$user || !Hash::check($password, $user->password)){
            return false;
        }

        $token = $user->createToken('authToken')->plainTextToken;
        return $token;
    }

    public function logoutUser($user)
    {
        $user->currentAccessToken()->delete();
        return true;
    }

}
