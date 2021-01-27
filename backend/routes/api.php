<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Buyer\BuyerController;
use App\Http\Controllers\Seller\SellerController;
use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Store\StoreController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Wish\WishController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\AuthController;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::get('/user-create', function(Request $request){
//     App\Models\User::create([
//         'fName' => 'Omar',
//         'lName' => 'Mansour',
//         'address' => 'Mazraa',
//         'phone' => '712507397',
//         'email' => 'abdo@gmail.com',
//         'password' => Hash::make('mysuperdupersecretpassword')
//     ]);
// });


Route::post('/login', function(Request $request){

    $email = $request->get('email');
    $password = $request->get('password');
    if (Auth::attempt(array('email' => $email, 'password' => $password)))
    {
        $user =  User::select('id')->where('email', '=', $email)->get();
        
        $credentials = request()->only(['email','password']);
        $token = auth()->attempt($credentials);
        return response()->json(['data' => [$user, $token]], 200);
     }
    else{
        return "User Does not Exists ";
    }

    $credentials = request()->only(['email','password']);
    $token = auth()->attempt($credentials);
    return $token;
});


Route::middleware('auth')->get('/getuser', function(){
    return auth()->user();
});

// User
Route::resource('users', App\Http\Controllers\User\UserController::class);
// Buyer
Route::resource('buyers', App\Http\Controllers\Buyer\BuyerController::class, ['only'=> ['index', 'show']]);
// Seller
Route::resource('sellers', BuyerController::class);
// Category
Route::resource('categories', App\Http\Controllers\Category\CategoryController::class);
// Product
Route::resource('products', ProductController::class);
Route::GET('/products/category/{id}', [App\Http\Controllers\Product\ProductController::class, 'productByCategory']);
Route::GET('/products/store/{id}', [App\Http\Controllers\Product\ProductController::class, 'productByStore']);
Route::GET('/products/totalproducts/{id}', [App\Http\Controllers\Product\ProductController::class, 'totalProducts']);
// Store
Route::resource('stores', StoreController::class);
Route::GET('/stores/user/{id}', [App\Http\Controllers\Store\StoreController::class, 'storesByUser']);
Route::GET('/stores/total/{id}', [App\Http\Controllers\Store\StoreController::class, 'getTotalStores']);
Route::GET('/stores/storestatus/{id}', [App\Http\Controllers\Store\StoreController::class, 'getStoresStatus']);
// Transaction
Route::resource('transactions', TransactionController::class);
// Comment
Route::resource('comments', CommentController::class);

Route::group([
    'middleware' => 'auth'
    // 'prefix' => 'auth'
], function ($router) {
    // Product
    Route::GET('/products/user/{id}', [App\Http\Controllers\Product\ProductController::class, 'productByUser']);
    // Store
    Route::GET('/stores/user/{id}', [App\Http\Controllers\Store\StoreController::class, 'storesByUser']);
    // Transaction
    Route::GET('/transactions/buyer/{id}', [App\Http\Controllers\Transaction\TransactionController::class, 'showBuyerTransactions']);
    Route::GET('/transactions/seller/{id}', [App\Http\Controllers\Transaction\TransactionController::class, 'showSellerTransactions']);
    Route::GET('/totalrevenue/{id}', [App\Http\Controllers\Transaction\TransactionController::class, 'getTotalRevenue']);
    Route::GET('/totalsold/{id}', [App\Http\Controllers\Transaction\TransactionController::class, 'getTotalSold']);
    Route::GET('/transactions/storestatus/{id}', [App\Http\Controllers\Transaction\TransactionController::class, 'getStoresStatus']);

});

