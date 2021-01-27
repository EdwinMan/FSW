<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $user = User::all();
        return response()->json(['data' => $user], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) //creates new Users
    {

        $validator = Validator::make($request->all(), [
            'fName' => ['required','string','max:10',],
            'lName' => ['required','max:10',],
            'phone' => ['required','integer',],
            'email' => ['required','email','unique:users',],
            'address' => ['string',],
            'password' => ['required','min:3'],
            
        ]);

        if ($validator->fails()) {
            return response()->json(["data" => "False"],200);
        }

        // User::create([
        //     'fName' => $request->fName,
        //     'lName' => $request->lName,
        //     'address' => $request->address,
        //     'phone' => $request->phone,
        //     'email' => $request->email,
        //     'password' => bcrypt($request->password)
        // ]);

        $data = $request->all();
        $data['password'] = bcrypt($request->password);
        
        $user = User::create($data);

        return response()->json(['data' => $user], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) // return users
    {
        $user = User::findOrFail($id);
        return response()->json(['data' => $user], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit($id)
    // {
    //     //
    // }

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
            'fName' => ['required','string','max:10',],
            'lName' => ['required','max:10',],
            'phone' => ['required','integer',],
            'email' => ['required','email','unique:users',],
            'address' => ['string',],
            'password' => ['required','min:3'],
            
        ]);

        if ($validator->fails()) {
            return response()->json(["data" => "False"],200);
        }

        $user = User::findOrFail($id);


        if ($request->has('fName')){
            $user->fName = $request->fName;
        }

        if ($request->has('lName')){
            $user->lName = $request->lName;
        }

        if ($request->has('password')){
            $user->password = $request->password;
        }

        if (!$user->isDirty()) {
            return response()->json(['error' => 'You need to change some value to perform the update',
            'code' => 422], 422);
        }

        $user->update();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['data' => $user], 200);
    }

    // public function Auth(Request $request){

    //         $email = $request->get('email');
    //         if (User::where('email', '=', $email)->where('password', '=', $password)->exists()) {
    //             $user =  User::where('email', '=', $email)->get('id');
    //             return response()->json(['data' => $user], 200);
    //          }
    //         else{
    //             return "User Does not Exists ";
    //         }
    // }

    
    }
