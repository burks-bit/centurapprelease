@extends('layouts.app')
  
@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2>Add New Product</h2>
        </div>
    </div>
</div>
   
@if ($errors->any())
    <div class="alert alert-danger">
        There were some problems with your input.<br><br>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
   
<form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
     <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Product Image:</strong>
                <input type="file" class="form-control" style="" name="product_image" placeholder="">
            </div>
            <div class="form-group py-3">
                <strong>Product Name:</strong>
                <input type="text" class="form-control" style="" name="product_name" placeholder="">
            </div>
            <div class="form-group">
                <strong>Product Model:</strong>
                <input type="text" class="form-control" style="" name="product_model" placeholder="">
            </div>
            <div class="form-group py-3">
                <strong>Product Description:</strong>
                <textarea class="form-control" style="height:80px;resize:none;" name="product_description" placeholder=""></textarea>
            </div>
            <div class="form-group">
                <strong>Product Manufacturer:</strong>
                <input type="text" class="form-control" style="" name="product_manufacturer" placeholder="">
            </div>
            <div class="form-group py-3">
                <strong>Product Specimen Type:</strong>
                <input type="text" class="form-control" style="" name="product_specimen_type" placeholder="">
                <small>Use "," as separator if multiple. Example: Urine, Serum</small>
            </div>
            <div class="form-group py-2">
                <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="...">
                Enable
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-2">
            <a class="btn btn-sm btn-primary" href="{{ route('products.index') }}"> Back</a>
            <button type="submit" class="btn btn-sm btn-primary">Submit</button>
        </div>
    </div>
</form>
@endsection