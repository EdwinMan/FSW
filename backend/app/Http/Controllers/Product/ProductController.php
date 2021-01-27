<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
        $validator = Validator::make($request->all(), [
            'image' => ['required',],
            'name' => ['required',],
            'quantity' => ['required','integer'],
            'description' => ['required',],
            'store_id' => ['required',],
            'category_id' => ['required',],
            'seller_id' => ['required',],
            'rate' => ['required',],
            'price' => ['required',],
            'new' => ['required',],
            'deliverytime' => ['required',],
            'returnable' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }

        $product = new Product;
        
        if ($request->has('store_id')){
            $product->store_id = request()->store_id;
        }

        if ($request->has('seller_id')){
            $product->seller_id = request()->seller_id;
        }

        if ($request->hasFile('image'))
        {
            $file      = $request->file('image');
         // $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $filename  = $product->seller_id . '-' . $product->store_id . '-' . time() . '.' . $extension;
            // $file->move(public_path('img'), $filename);
            $file->move('C:\Users\omarm\OneDrive\Desktop\Final Project\frontend\public\images', $filename);
            
            $product->image = $filename;
            // $product->image = public_path('img/' . $filename);

        }             
            if ($request->has('name')){
                $product->name = request()->name;
            }

            if ($request->has('quantity')){
                $product->quantity = request()->quantity;
            }

            if ($request->has('description')){
                $product->description = request()->description;
            }


            if ($request->has('category_id')){
                $product->category_id = request()->category_id;
            }


            if ($request->has('rate')){
                $product->rate = request()->rate;
            }

            if ($request->has('price')){
                $product->price = request()->price;
            }
            
            
            $product->save();
            return response()->json(['data' => $product]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        
        return response()->json(['data' => $product], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    
        $validator = Validator::make($request->all(), [
            'image' => ['required',],
            'name' => ['required',],
            'quantity' => ['required','integer'],
            'description' => ['required',],
            'store_id' => ['required',],
            'category_id' => ['required',],
            'seller_id' => ['required',],
            'rate' => ['required',],
            'price' => ['required',],
            'new' => ['required',],
            'deliverytime' => ['required',],
            'returnable' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }
    
        $product = Product::findOrFail($id);

        
        if ($request->has('name')){
            $product->name = $request->name;
        }

        if ($request->has('description')){
            $product->description = $request->description;
        }

        if ($request->has('price')){
            $product->price = $request->price;
        }

        // if ($request->has('image')){
        //     $product->image = $request->image;
        // }

        if ($request->has('quantity')){
            $product->quantity = $request->quantity;
        }

        if ($request->has('category_id')){
            $product->category_id = $request->category_id;
        }


        $product->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['data' => $product], 200);
    }

    public function productByCategory($id)
    {
        // $result = Product::get()->where('category_id',$id)->groupBy("category_id");
        $result = DB::table('products')
        ->select('products.id as id',
                'products.name as name',
                'products.description as description',
                'products.quantity as quantity',
                'products.status as status',
                'products.image as image',
                'products.rate as rate',
                'products.price as price',
                'products.seller_id as seller_id',
                'products.category_id as category_id',
                'products.created_at as created_at',
                'products.updated_at as updated_at',
                )
        ->where('products.category_id', '=', $id)
        ->orderBy('products.created_at', 'desc')
        ->get();
        return response()->json(['data' => $result], 200);

        // $file = public_path('img/2-3.JPG');

        // return response()->json(['data' => $file], 200);
    }


    public function productByUser($id) // still not is use
    {
        $result = DB::table('products')
        ->select('products.id as id',
                'products.name as name',
                'products.description as description',
                'products.quantity as quantity',
                'products.price as price',
                'products.status as status',
                'products.image as image',
                'products.seller_id as seller_id',
                'products.category_id as category_id',
                'products.created_at as created_at',
                'products.updated_at as updated_at',
                )
        ->where('products.seller_id', '=', $id)
        ->orderBy('products.created_at', 'desc')
        ->get();
        return response()->json(['data' => $result], 200);
    }

    public function productByStore($id) 
    {
        $result = DB::table('products')
        ->select('products.id as id',
                'products.name as name',
                'products.description as description',
                'products.quantity as quantity',
                'products.status as status',
                'products.image as image',
                'products.price as price',
                'products.rate as rate',
                'products.seller_id as seller_id',
                'products.store_id as store_id',
                'products.category_id as category_id',
                'products.created_at as created_at',
                'products.updated_at as updated_at',
                )
        ->where('products.store_id', '=', $id)
        ->orderBy('products.created_at', 'desc')
        ->get();
        return response()->json(['data' => $result], 200);
    }


    public function totalProducts($id) 
    {
        $res = Product::where('seller_id', $id)
                    ->get()
                    ->count();
        return response()->json($res,200);
    }
}
