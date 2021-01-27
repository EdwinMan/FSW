<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class Seller extends User
{
    use HasFactory;

    public function Product()
    {
        return $this->hasMany(Product::class);
    }
}
