<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Seller;
use App\Models\Transaction;
use App\Models\Category;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'quantity',
        'status',
        'image',
        'seller_id',
        'category_id',
        'rate',
        'new',
        'deliverytime',
        'returnable',
    ];


    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function sellers()
    {
        return $this->belongsTo(Seller::class);
    }

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
