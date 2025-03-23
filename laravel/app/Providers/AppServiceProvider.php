<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use app\Repositories\UserRepository;
use app\Services\UserService;
use app\Repositories\BaseRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
