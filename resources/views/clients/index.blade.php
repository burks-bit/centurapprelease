@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-hospital"></span> Clients</h2>
            </div>
            <div class="" style="text-align:right;">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('clients.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
            </div>
        </div>
    </div>
   
    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif

    <table class="table table-bordered">
        <tr>
            <th>No</th>
            <th>Client Name</th>
            <th>Client Address</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($clients as $clientKey => $clientDetails)
            <tr>
                <td>{{ $clientKey++ +1 }}</td>
                <td>{{ $clientDetails->client_name }}</td>
                <td>{{ $clientDetails->client_address }}</td>
                <td>{{ $clientDetails->enabled }}</td>
                <td>
                    <form action="{{ route('clients.destroy',$clientDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('clients.show',$clientDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('clients.edit',$clientDetails->id) }}">
                            <span class="fa fa-edit"></span> Edit</a>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger">
                            <span class="fa fa-trash"></span> Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
  
    
      
@endsection