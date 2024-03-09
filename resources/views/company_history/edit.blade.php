@extends('layouts.app')
   
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Edit history</h2>
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
  
    <form action="{{ route('company_history.update',$company_history->id) }}" method="POST">
        @csrf
        @method('PUT')
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Mission:</strong>
                    <textarea class="form-control ckeditor" style="height:150px" name="company_history" placeholder="Email">{{ $company_history->company_history }}</textarea>
                </div>
                <div class="form-group py-2">
                    <input class="form-check-input me-1" name="enabled" type="checkbox" value="1" aria-label="..." {{ $company_history->enabled == 1 ? 'checked' : '' }}>
                    Enable
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 py-2">
                <a class="btn btn-sm btn-primary" href="{{ route('company_history.index') }}"> Back</a>
                <button type="submit" class="btn btn-sm btn-primary">Submit</button>
            </div>
        </div>
   
    </form>

    
<script>
    ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } );
</script>
@endsection