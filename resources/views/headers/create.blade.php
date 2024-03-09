@extends('layouts.app')
  
@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2>Add New Header</h2>
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
   
<form action="{{ route('headers.store') }}" method="POST">
    @csrf
     <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Header Title:</strong>
                <input type="text" class="form-control" style="" name="header_title" placeholder="Type here">
            </div>
            <div class="form-group">
                <strong>Header Body:</strong>
                <textarea class="form-control" style="height:150px;resize:none;" name="header_body" placeholder="Type here"></textarea>
            </div>
            <div class="form-group py-2">
                <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="...">
                Enable
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-2">
            <a class="btn btn-sm btn-primary" href="{{ route('headers.index') }}"> Back</a>
            <button type="submit" class="btn btn-sm btn-primary">Submit</button>
        </div>
    </div>
</form>
@endsection