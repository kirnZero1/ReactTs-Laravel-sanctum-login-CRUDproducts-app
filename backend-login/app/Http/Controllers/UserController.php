<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request){
            $fields = $request->validate([
                'username' => "required|string",
                "email" => "required|email|unique:users,email",
                "password" => "required|string|confirmed|min:5"
            ]);

            $user = User::create([
                "username" => $fields['username'],
                "email" => $fields['email'],
                "password" => bcrypt($fields['password'])
            ]);

            $token = $user->createToken('mytokensamting')->plainTextToken;
            $cookie = Cookie::make('auth_token', $token, 60,  '/', null, true, false);

           $response = [
            'user' => $user,
            'token' => $token,
            'message' => "Successfully create a user"
           ];

           return response($response, 200)->cookie($cookie);
    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        $response = [
            'message' => "Logout successfully"
           ];
    
           return response($response, 200);
    }

    public function login(Request $request){
        $fields = $request->validate([
            "email" => "required|email",
            "password" => "required|string|min:5"
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            $response = [
                'failed' => "Bad credentials"
               ];
            return response($response, 400);
        }

       $token = $user->createToken('mytokensamting')->plainTextToken;
       $cookie = Cookie::make('auth_token', $token, 60,  '/', null, true, false);

       $response = [
        'user' => $user,
        'token' => $token,
        'message' => "Successfully login user"
       ];

       return response($response, 200)->cookie($cookie);
}
}
