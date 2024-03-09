@extends('layouts.app')
  
@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2>Add New Contact</h2>
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
   
<form action="{{ route('contacts.store') }}" method="POST">
    @csrf
     <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Contact Number:</strong>
                <input type="text" class="form-control" style="" name="contact_no" placeholder="">
                <small style="color: grey">Note: Format bust be 09123456789 (11 digits)</small>
            </div>
            <div class="form-group py-2">
                <strong>Telephone Number:</strong>
                <input type="text" class="form-control" style="" name="tel_no" placeholder="">
            </div>
            <div class="form-group py-2">
                <strong>Email Address:</strong>
                <input type="email" class="form-control" style="" name="email" placeholder="">
            </div>
            <div class="form-group py-3">
                <strong>Company Address:</strong>
                <textarea class="form-control" style="height:70px;resize:none;" name="company_address" placeholder=""></textarea>
            </div>
            <div class="form-group py-2">
                <strong>Facebook Page:</strong>
                <input type="text" class="form-control" style="" name="facebook_url" placeholder="">
            </div>
            <div class="form-group py-2">
                <strong>Instagram:</strong>
                <input type="text" class="form-control" style="" name="ig_url" placeholder="">
            </div>
            <div class="form-group py-2">
                <strong>X | Twitter:</strong>
                <input type="text" class="form-control" style="" name="xtwitter_url" placeholder="">
            </div>
            <div class="form-group py-2">
                <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="...">
                Enable
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-2">
            <a class="btn btn-sm btn-primary" href="{{ route('contacts.index') }}"> Back</a>
            <button type="submit" class="btn btn-sm btn-primary">Submit</button>
        </div>
    </div>
</form>
@endsection