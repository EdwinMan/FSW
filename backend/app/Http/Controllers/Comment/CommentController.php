<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Comment;
class CommentController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $res = Comment::get()->where('product_id',$id);

        $res = DB::table('comments')
                ->join('users','comments.user_id','users.id')
                ->select('users.fName as fname',
                         'users.LName as lname',
                         'comments.comment as comment',
                         'comments.created_at as date')
                ->where('comments.product_id',$id)
                ->orderBy('date', 'DESC')
                ->get();

        return response()->json($res,200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function graphInfo($id)
    {
        // $res = Comment::get()->where('product_id',$id);

        $res = DB::table('comments')
                ->join('users','comments.user_id','users.id')
                ->select('users.fName as fname',
                         'users.LName as lname',
                         'comments.comment as comment',
                         'comments.created_at as date')
                ->where('comments.product_id',$id)
                ->orderBy('date', 'DESC')
                ->get();

        return response()->json($res,200);
    }
}
