<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stores = Store::all();
        return response()->json(['data' => $stores], 200);
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
            'name' => ['required',],
            'description' => ['required',],
            'rate' => ['required','integer'],
            'user_id' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }


        $data = $request->all();
        // $store = Store::create($data);
        

        $store = new Store;
        $store->name = request()->name;
        $store->description = request()->description;
        $store->rate = request()->rate;
        $store->user_id = request()->user_id;
        $store->save();
        
        return response()->json(['data' => $store], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
            'name' => ['required',],
            'description' => ['required',],
            'rate' => ['required','integer'],
            'user_id' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }

        $store = Store::findOrFail($id);

        
        if ($request->has('name')){
            $store->name = $request->name;
        }

        if ($request->has('description')){
            $store->description = $request->description;
        }

        $store->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $store = Store::findOrFail($id);
        $store->delete();
        return response()->json(['data' => $store], 200);
    }

    public function storesByUser($id) // takes user ID
    {
        $result = DB::table('stores')
                ->join('users', 'stores.user_id', '=', 'users.id')
                ->select('stores.id as id',
                         'stores.name as name',
                         'stores.description as description')
                ->where('users.id', '=', $id)
                ->orderBy('stores.created_at', 'desc')
                ->get();
            
        return response()->json([
                'data' => $result
                ], 200);
    }


    public function getTotalStores($id) 
    {
        $res = Store::get()->where("user_id",$id)->count();
       
          return response()->json([
            'data' => $res
            ], 200);
    }

    public function getStoresStatus($id) 
    {
        $result1 = DB::table('stores')
        ->join('products', 'stores.id', '=', 'products.store_id')
        ->select(DB::raw('SUM(products.quantity) as total_products'))
        ->where('stores.user_id', '=', $id)
        ->get()
        ->groupBy('store.name');

        $result2 = DB::table('stores')
        ->join('products', 'stores.id', '=', 'products.store_id')
        ->join('transactions', 'products.id', '=', 'transactions.product_id')
        ->select(
                'products.price as profit',
                'stores.name as store_name'
                 )
        ->where('stores.user_id', '=', $id)
        ->where('transactions.stage', '=', 2)
        ->get()
        ->groupBy('store_name');


        $result3 = DB::table('stores')
        ->join('products', 'stores.id', '=', 'products.store_id')
        ->join('transactions', 'products.id', '=', 'transactions.product_id')
        ->where('stores.user_id', '=', $id)
        ->where('transactions.stage', '=', 2)
        ->get()
        ->count();
    
        return response()->json([$result1, $result3], 200);

    }

    
    
}
