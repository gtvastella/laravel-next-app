<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use App\Util\ResponseUtil;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        $middleware->api(remove: [
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Auth\Middleware\Authenticate::class,
            \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e) {
            $data = $e instanceof ValidationException ? $e->validator->errors()->getMessages() : [];
            if (config('app.debug')) {
                $trace = $e->getTrace() ?? [];
                $data['trace'] = $trace;
            }
            $code = match (true) {
                $e instanceof HttpException => $e->getStatusCode(),
                $e instanceof ValidationException => 422,
                $e instanceof AuthenticationException => 401,
                default => 500,
            };

            return ResponseUtil::errorResponse(
                message: $e->getMessage(),
                data: $data,
                statusCode: $code,
            );
        });

    })->create();
