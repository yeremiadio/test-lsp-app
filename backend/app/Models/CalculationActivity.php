<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalculationActivity extends Model
{
    use HasFactory;

    protected $fillable = ['calculation_name', 'result_value', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
