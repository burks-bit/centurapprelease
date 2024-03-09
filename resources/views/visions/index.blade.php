@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-globe"></span> Visions</h2>
            </div>
            <div class="pull-right" style="text-align:right">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('visions.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
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
            <th>Vision</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($visions as $visionKey => $visionDetails)
            <tr>
                <td>{{ $visionKey++ +1 }}</td>
                <td>{{ $visionDetails->vision }}</td>
                <td>{{ $visionDetails->enabled }}</td>
                <td>
                    <form action="{{ route('visions.destroy',$visionDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('visions.show',$visionDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('visions.edit',$visionDetails->id) }}">
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