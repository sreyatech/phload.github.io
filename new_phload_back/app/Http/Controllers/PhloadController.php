<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Phload;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Stroage;



class PhloadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function imageList() 
    {
        return Phload::select('image','category')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allData()
    {
        $data = Phload::all();
       return $data; 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addImage(Request $req)
    {
        // $validatedData = $req->validate([
        //     'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
    
        //    ]);

        $data = new Phload;
        $data->name = $req->name;
        $data->category = $req->category;
        $data->description = $req->description;
        $data->place = $req->place;
        $data->user_id = $req->user_id;
        $data->user_name = $req->user_name;
        $image = $req->file;
        $imagename = time().'.'.$image->getClientoriginalExtension();
        $req->file->move('gallary',$imagename);
        $data->image=$imagename;
        $data->save();
        return response([
            'message' =>["your data has been saved and safe with us..."],
            'user' => $data
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function api()
    {
        $token = Str::random(42);
        return $token;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateImage($id)
    {
        $data = Phload::where('user_id',$id)->get();
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function download($id)
    {
        $data = Phload::where('id',$id)->first();
        return response()->download(public_path("gallary/$data->image"));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteImage($id)
    {
        $data = Phload::where('id',$id)->delete();
       return response('data deleted successfully...');
    }

    public function editImage(Request $req, $id){
       $data = Phload::find($id);
       $data->name = $req->name;
       $data->category = $req->category;
       $data->description = $req->description;
       $data->place = $req->place;

       $image = $req->file;
       $imagename = time().'.'.$image->getClientoriginalExtension();
       $req->file->move('gallary',$imagename);
       $data->image=$imagename;
       
       $data->save();
       
       
       return response([
        'message' =>["your data updated successfully..."],
        'user' => $data
    ],200);
       
    }



}
