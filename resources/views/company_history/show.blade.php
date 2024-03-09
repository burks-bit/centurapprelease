@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show Mission Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Mission:</strong>
                <br>
                {{ $company_history->company_history }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-5">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($company_history->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    
    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('company_history.index') }}"> Back</a>
    </div>
@endsection