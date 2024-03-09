@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-th"></span> Products</h2>
            </div>
            <div class="" style="text-align:right;">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('products.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
            </div>
        </div>
    </div>
   
    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif

    <table class="table table-bordered">
        <tr>
            <th>No</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Model</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($products as $productKey => $productDetails)
            <tr>
                <td>{{ $productKey++ +1 }}</td>
                <td>
                    <img src="{{ asset('product_images/'.$productDetails->product_image) }}" height="50px" alt="{{ $productDetails->product_image }}">
                </td>
                <td>{{ $productDetails->product_name }}</td>
                <td>{{ $productDetails->product_model }}</td>
                <td>{{ $productDetails->enabled }}</td>
                <td>
                    <form action="{{ route('products.destroy',$productDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('products.show',$productDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('products.edit',$productDetails->id) }}">
                            <span class="fa fa-edit"></span> Edit</a>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger">
                            <span class="fa fa-trash"></span> Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
  
    
      
@endsection