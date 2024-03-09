@extends('layouts.app')
   
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Edit Contact</h2>
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
  
    <form action="{{ route('contacts.update',$contact->id) }}" method="POST">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Contact Number:</strong>
                    <input type="text" class="form-control" style="" name="contact_no" value="{{ $contact->contact_no }}">
                </div>
                <div class="form-group py-3">
                    <strong>Telephone Number:</strong>
                    <input type="text" class="form-control" style="" name="tel_no" value="{{ $contact->tel_no }}">
                </div>
                <div class="form-group py-3">
                    <strong>Email Address:</strong>
                    <input type="text" class="form-control" style="" name="email" value="{{ $contact->email }}">
                </div>
                <div class="form-group py-3">
                    <strong>Company Address:</strong>
                    <textarea class="form-control" style="height:80px;resize:none;" name="company_address" placeholder="">{{ $contact->company_address }}</textarea>
                </div>
                <div class="form-group py-3">
                    <strong>Facebook Page:</strong>
                    <input type="text" class="form-control" style="" name="facebook_url" value="{{ $contact->facebook_url }}">
                </div>
                <div class="form-group py-3">
                    <strong>Instagram:</strong>
                    <input type="text" class="form-control" style="" name="ig_url" value="{{ $contact->ig_url }}">
                </div>
                <div class="form-group py-3">
                    <strong>X | Twitter:</strong>
                    <input type="text" class="form-control" style="" name="xtwitter_url" value="{{ $contact->xtwitter_url }}">
                </div>
                <div class="form-group py-2">
                    <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="..." {{ $contact->enabled == 1 ? 'checked' : '' }}>
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