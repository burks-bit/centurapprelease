@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-globe"></span> Company History</h2>
            </div>
            <div class="pull-right" style="text-align:right">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('company_history.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
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
            <th>History</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($histories as $historyKey => $historyDetails)
            <tr>
                <td>{{ $historyKey++ +1 }}</td>
                <td>{{ $historyDetails->company_history }}</td>
                <td>{{ $historyDetails->enabled }}</td>
                <td>
                    <form action="{{ route('company_history.destroy',$historyDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('company_history.show',$historyDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('company_history.edit',$historyDetails->id) }}">
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