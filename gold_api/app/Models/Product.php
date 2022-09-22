<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product_master';
    protected $primaryKey = 'product_code'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    public $timestamps = false;
    private $product_description;
    private $product_category;
    private $price_code;
    private $agent_address;
    private $time_stamp;
    private $user_id;
    private $details;
    private $product_markuped;
    private $product_markup_value;
    public function productCategory() {
        return $this->belongsTo(ProductCategory::class , 'ID');
    }
}
