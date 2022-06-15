<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
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

    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required|string|unique:students,name',
            'school_name' => 'required|string',
            'age' => 'required',
            'address' => 'required|string',
            'telp' => 'required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->responseFailed('Error Validation', $validator->errors(), 400);
        }

        $user = User::create([
            'email' => $input['email'],
            'password' => bcrypt($input['password']),
        ]);

        $student = Student::create([
            'name' => $input['name'],
            'user_id' => $user->id,
            'school_name' => $input['school_name'],
            'age' => $input['age'],
            'address' => $input['address'],
            'telp' => $input['telp'],
        ]);
        $token = $user->createToken('token')->plainTextToken;

        $data = [
            'user' => $user,
            'student' => $student,
            'token' => $token,
        ];

        return $this->responseSuccess('Registration Successful', $data, 201);
    }

    public function login(Request $request)
    {
        $input = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|between:8,255'
        ]);

        if (!Auth::attempt($input)) {
            return $this->responseFailed('Email or Password is incorrect', '', 401);
        }

        $user = User::where('email', $input['email'])->first();
        $student = Student::where('user_id', $user->id)->first();
        $token = $user->createToken('token')->plainTextToken;

        $data = [
            'user' => $user,
            'student' => $student,
            'token' => $token
        ];

        auth()->logoutOtherDevices($request->password);

        return $this->responseSuccess('Login Successful', $data, 200);
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
