<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{route('user.autentificar')}}" method="POST">
        @csrf
        <label>Email</label>
        <input type="email" id="email">
        <label>Pasword</label>
        <input type="password" id="password">
        <input type="submit">
    </form>
    <div id="register"><a href="{{url('register')}}">Registrarse</a></div>
</body>
</html>