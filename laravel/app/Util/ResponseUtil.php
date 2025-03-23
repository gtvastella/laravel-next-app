<?php

namespace App\Util;

class ResponseUtil
{
    /**
     * Generate a standardized JSON response.
     *
     * @param bool $success
     * @param string $message
     * @param mixed $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function jsonResponse($success, $message, $data = null, $statusCode = 200)
    {
        $response = [
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ];

        return response()->json($response, $statusCode);
    }

    /**
     * Generate a success JSON response.
     *
     * @param string $message
     * @param mixed $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function successResponse($message, $data = null, $statusCode = 200)
    {
        return self::jsonResponse(true, $message, $data, $statusCode);
    }

    /**
     * Generate an error JSON response.
     *
     * @param string $message
     * @param mixed $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function errorResponse($message, $data = null, $statusCode = 400)
    {
        return self::jsonResponse(false, $message, $data, $statusCode);
    }
}
