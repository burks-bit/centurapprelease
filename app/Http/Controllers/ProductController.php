<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = DB::table('products')->get();
        return view('products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('products.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'product_name' => 'required',
            'product_model' => '',
            'product_description' => '',
            'product_manufacturer' => '',
            'product_specimen_type' => '',
        ]);

        if($request->hasFile('product_image')){
            $image = $request->file('product_image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('product_images'), $imageName);

                
            $data = $request->all();
            $data['product_image'] = $imageName;
            $data['enabled'] = $request->has('enabled') ? 1 : 0;
        
            Product::create($data);
        
            return redirect()->route('products.index')->with('success','New Product added successfully.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return view('products.show',compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return view('products.edit',compact('product'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'product_name' => 'required',
            'product_model' => '',
            'product_description' => '',
            'product_manufacturer' => '',
            'product_specimen_type' => '',
        ]);

        if($request->hasFile('product_image')){
            $image = $request->file('product_image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('product_images'), $imageName);

            $product = Product::findOrFail($id); 
            $product->product_image = $imageName;
            $product->product_name = $request->input('product_name');
            $product->product_model = $request->input('product_model');
            $product->product_description = $request->input('product_description');
            $product->product_manufacturer = $request->input('product_manufacturer');
            $product->product_specimen_type = $request->input('product_specimen_type');

            $product->enabled = $request->has('enabled') ? 1 : 0;

            $product->save(); 

            return redirect()->route('products.index')
                ->with('success', 'product updated successfully.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id); 
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
