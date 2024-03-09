@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-globe"></span> Missions</h2>
            </div>
            <div class="pull-right" style="text-align:right">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('missions.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
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
            <th>Mission</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($missions as $missionKey => $missionDetails)
            <tr>
                <td>{{ $missionKey++ +1 }}</td>
                <td>{{ $missionDetails->mission }}</td>
                <td>{{ $missionDetails->enabled }}</td>
                <td>
                    <form action="{{ route('missions.destroy',$missionDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('missions.show',$missionDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('missions.edit',$missionDetails->id) }}">
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