<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = 'product_cat';
    protected $primaryKey = 'ID'; // or null
    public $incrementing = true;
    private $category;
    private $category_header;
    private $calculation_method;

    public function products() {
        return $this->hasMany(Product::class, 'product_category');
    }
}
