@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show Client Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Client Name:</strong>
                <br>
                {{ $client->client_name }}
            </div>

            <div class="form-group py-3">
                <strong>Client Address:</strong>
                <br>
                {{ $client->client_address }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-5">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($client->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    
    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('clients.index') }}"> Back</a>
    </div>
    
@endsection