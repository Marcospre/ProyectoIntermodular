<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{route('user.registrar')}}" method="POST">
        @csrf
        <label>Nombre</label>
        <input type="text" id="name">
        <label>Email</label>
        <input type="email" id="email">
        <label>Pasword</label>
        <input type="password" id="password">
        <input type="submit">
    </form>
</body>
</html>