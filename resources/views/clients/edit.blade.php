@extends('layouts.app')
   
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Edit Client</h2>
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
  
    <form action="{{ route('clients.update',$client->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Client Logo:</strong>
                    <input type="file" class="form-control" style="" name="client_logo" value="{{ $client->client_logo }}">
                </div>
                <div class="form-group">
                    <strong>Client Name:</strong>
                    <input type="text" class="form-control" style="" name="client_name" value="{{ $client->client_name }}">
                </div>
                <div class="form-group py-3">
                    <strong>Client Address:</strong>
                    <textarea class="form-control" style="height:80px;resize:none;" name="client_address" placeholder="">{{ $client->client_address }}</textarea>
                </div>
                <div class="form-group">
                    <strong>Category:</strong>
                    <input type="text" class="form-control" style="" name="category" value="{{ $client->category }}">
                </div>
                <div class="form-group py-2">
                    <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="..." {{ $client->enabled == 1 ? 'checked' : '' }}>
                    Enable
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 py-2">
                <a class="btn btn-sm btn-primary" href="{{ route('clients.index') }}"> Back</a>
                <button type="submit" class="btn btn-sm btn-primary">Submit</button>
            </div>
        </div>
   
    </form>
@endsection