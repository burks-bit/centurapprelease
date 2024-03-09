@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Product Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <img src="{{ asset('product_images/'.$product->product_image) }}" class="img" height="200px" width="200px" alt="{{ $product->product_image }}">
            <div class="form-group py-3">
                <strong>Product Name:</strong> {{ $product->product_name }} <br>
                <strong>Product Model:</strong> {{ $product->product_model }} <br><br>
                <strong>Product Description:</strong> {{ $product->product_description }} <br>
                <strong>Product Specimens:</strong> {{ $product->product_specimen_type }} <br>
                <strong>Product Manufacturer:</strong> {{ $product->product_manufacturer }} <br>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($product->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    
    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('products.index') }}"> Back</a>
    </div>
    
@endsection