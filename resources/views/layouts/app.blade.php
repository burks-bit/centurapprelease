<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <script src="//cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        @include('components.navbar')
        <!-- import navbar.blade.php here from components folder -->
        <main class="container" style="margin-top: 5%;">
            @guest
                @yield('content')
            @else
            <div class="row">
                <div class="col-md-3">
                    <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                Menus
                            </a>
                            <a href="/home/headers" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Headers
                            </a>
                            <a href="/home/missions" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Missions
                            </a>
                            <a href="/home/visions" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Visions
                            </a>
                            <a href="/home/company_history" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Company History
                            </a>
                            <a href="/home/clients" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Clients
                            </a>
                            <a href="/home/products" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Products
                            </a>
                            <a href="/home/contacts" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Contact Details
                            </a>
                            <a href="/home/users" class="list-group-item list-group-item-action">
                                <span class="fa fa-th-list"></span> Moderators
                            </a>
                        </div>
                    </div>
                <div class="col-md-9">
                    @yield('content')
                </div>
            </div>
            @endguest
        </main>
    </div>
</body>
</html>

<script type="text/javascript">
    $(document).ready(function () {
        $('.ckeditor').ckeditor();
    });
</script>
