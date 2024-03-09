@extends('layouts.app')
  
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show Contact Details</h2>
            </div>
        </div>
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Contact Number:</strong>
                <br>
                {{ $contact->contact_no }}
            </div>

            <div class="form-group py-2">
                <strong>Telephone Number:</strong>
                <br>
                {{ $contact->tel_no }}
            </div>

            <div class="form-group py-2">
                <strong>Email Address:</strong>
                <br>
                {{ $contact->email }}
            </div>
            
            <div class="form-group py-2">
                <strong>Company Address:</strong>
                <br>
                {{ $contact->company_address }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 py-2">
            <div class="form-group">
                <strong>Enabled:</strong>
                @if($contact->enabled === 0)
                    No
                @else
                    Yes
                @endif
            </div>
        </div>
    </div>

    
    <div class="pull-right">
        <a class="btn btn-sm btn-primary" href="{{ route('contacts.index') }}"> Back</a>
    </div>
    
@endsection