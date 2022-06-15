<?php

namespace App\Http\Controllers;

use App\Models\CalculationActivity;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CalculationActivityController extends Controller
{
    public function index()
    {
        return CalculationActivity::all();
    }
    public function create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'calculation_name' => 'required',
            'result_value' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseFailed('Error Validation', $validator->errors(), 400);
        }


        $calculation = CalculationActivity::create([
            'calculation_name' => $input['calculation_name'],
            'user_id' => auth()->user()->id,
            'result_value' => $input['result_value'],
        ]);

        return $this->responseSuccess('Calculation Created Successfully', $calculation, 201);
    }
}
