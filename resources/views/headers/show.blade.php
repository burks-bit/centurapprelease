@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show Header Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Header Title:</strong>
                <br>
                {{ $header->header_title }}
            </div>

            <div class="form-group py-3">
                <strong>Header Body:</strong>
                <br>
                {{ $header->header_body }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-5">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($header->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    
    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('headers.index') }}"> Back</a>
    </div>
    
@endsection