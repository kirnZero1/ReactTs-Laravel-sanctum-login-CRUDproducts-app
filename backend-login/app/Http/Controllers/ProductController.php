<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use  App\Models\Product;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        $auth = auth()->user();
        
        $response = [
            "products" => $products,
            "user" => $auth
        ];
        return response($response, 200);
    }
    public function show(string $id){
        $product = Product::find($id);
        $auth = auth()->user();
        $response = [
            "product" => $product,
            "user" => $auth
        ];
        return response($response, 200);
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required|string",
            "qty" => "required|integer",
            "price" => "required|decimal:0,2",
            "description" => "nullable"
        ]);
        $auth = auth()->user();
        $product = Product::create($data);

        $response = [
            'product' => $product,
            "message" => "Successfully create a product",
            "user" => $auth
        ];

        return response($response, 200);
    }
    public function update(Request $request, string $id){
        $data = $request->validate([
            "name" => "required|string",
            "qty" => "required|integer",
            "price" => "required|decimal:0,2",
            "description" => "nullable"
        ]);


        $product = Product::find($id);
        $product->update($data);
        $auth = auth()->user();
        $response = [
            'product' => $product,
            "message" => "Successfully update a product",
            "user" => $auth
        ];

        return response($response, 200);
    }
    public function destroy(string $id){
        $product = Product::find($id);
        $product->delete();
        $auth = auth()->user();
        $response = [
            "product" => $product,
             "message" => "Successfully delete a product",
             "user" => $auth
        ];
        return response($response, 200);
    }
}
