<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Buyer;
use App\Models\Product;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'product_id',
        'quantity',
        'address',
        'status',
        'stage',
        'buyershow',
        'sellershow',
    ];

    public function buyers()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
