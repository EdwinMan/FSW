<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
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
            'buyer_id' => ['required',],
            'seller_id' => ['required',],
            'product_id' => ['required','integer'],
            'quantity' => ['required',],
            'address' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }

        $transaction = new Transaction;
        $transaction->buyer_id = request()->buyer_id;
        $transaction->seller_id = request()->seller_id;
        $transaction->product_id = request()->product_id;
        $transaction->quantity = request()->quantity;
        $transaction->address = request()->address;
        // $transaction->status = request()->status;
        // $transaction->stage = request()->stage;
        $transaction->save();

        return response()->json(['data' => $transaction], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    public function showBuyerTransactions($id)
    {
        $transaction = DB::table('transactions')
        ->join('products', 'transactions.product_id', '=', 'products.id')
        // ->join('users', 'transactions.buyer_id', '=', 'users.id')
        ->select('transactions.id as id',
                 'transactions.status as status',
                 'transactions.stage as stage',
                 'products.name as name',
                 'transactions.created_at as created_at',
                 'products.price as price',
                 'transactions.address as address',
                 
                 )
        ->where("transactions.buyer_id",$id)
        ->orderBy('transactions.created_at', 'desc')
        ->get();

        return response()->json(['data' => $transaction],200);
    }
    public function showSellerTransactions($id)
    {
        $tr = DB::table('transactions')
        ->join('products', 'transactions.product_id', '=', 'products.id')
        ->join('stores', 'products.store_id', '=', 'stores.id')
        ->select('transactions.id as id',
                 'transactions.status as status',
                 'transactions.stage as stage',
                 'transactions.address as address',
                 'products.name as product_name',
                 'stores.id as store_id',
                 'stores.name as store_name',
                 )
        ->where("transactions.seller_id",$id)
        ->orderBy('transactions.created_at', 'desc')
        ->get();

        $transaction = $tr->groupBy('store_name');
        return response()->json(['data' => $transaction],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return "edit";
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
            'buyer_id' => ['required',],
            'seller_id' => ['required',],
            'product_id' => ['required','integer'],
            'quantity' => ['required',],
            'address' => ['required',],

        ]);

        if ($validator->fails()) {
            return response()->json(["data" => false],200);
        }

        $transaction = Transaction::findOrFail($id);

        if ($request->has('status')){
            $transaction->status = $request->status;
        }
        
        if ($request->has('stage')){
            $transaction->stage = $request->stage;
        }

        $transaction->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return response()->json(['data' => $transaction], 200);
    }

    public function getTotalRevenue($id)
    {

        $res = DB::table('transactions')
                ->join('products', 'transactions.product_id', '=', 'products.id')
                ->select(DB::raw('SUM(products.price) as total_Revenue'))
                ->where('transactions.stage',2)
                ->where('transactions.seller_id',$id)
                ->get();

        return response()->json($res, 200);
    }
    
    public function getTotalSold($id)
    {

        $res = DB::table('transactions')
                ->join('products', 'transactions.product_id', '=', 'products.id')
                ->where('transactions.stage',2)
                ->where('transactions.seller_id',$id)
                ->get()
                ->count();

        return response()->json($res, 200);
    }

    public function getStoresStatus($id)
    {
        //Thats the one to use for graph 1
        $res = DB::table('transactions')
        ->join('products', 'transactions.product_id', '=', 'products.id')
        ->select(DB::raw('DATE(transactions.created_at) as date'), DB::raw('SUM(products.price) as total_Revenue') , DB::raw('count(*) as views'))
        ->where('transactions.stage',2)
        ->where('transactions.seller_id',$id)
        ->groupBy('date')
        ->orderBy('transactions.updated_at','DESC')
        ->get();

        return response()->json($res, 200);

    }

    
    
}
