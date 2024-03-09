@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show Vision Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Vision:</strong>
                <br>
                {{ $vision->vision }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-5">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($vision->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('visions.index') }}"> Back</a>
    </div>
@endsection