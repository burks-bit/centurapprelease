@extends('layouts.app')
 
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2><span class="fa fa-phone-square"></span> Contacts</h2>
            </div>
            <div class="" style="text-align:right;">
                <a class="btn btn-sm btn-success mb-2" href="{{ route('contacts.create') }}"><span class="fa fa-plus-square"></span> Create New</a>
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
            <th>Contact Number</th>
            <th>Telephone Number</th>
            <th>Email</th>
            <th>Company Address</th>
            <th>Status</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($contacts as $contactKey => $contactDetails)
            <tr>
                <td>{{ $contactKey++ +1 }}</td>
                <td>{{ $contactDetails->contact_no }}</td>
                <td>{{ $contactDetails->tel_no }}</td>
                <td>{{ $contactDetails->email }}</td>
                <td>{{ $contactDetails->company_address }}</td>
                <td>{{ $contactDetails->enabled }}</td>
                <td>
                    <form action="{{ route('contacts.destroy',$contactDetails->id) }}" method="POST">
                        <a class="btn btn-sm btn-warning" href="{{ route('contacts.show',$contactDetails->id) }}">
                            <span class="fa fa-eye"></span> Show</a>
                        <a class="btn btn-sm btn-primary" href="{{ route('contacts.edit',$contactDetails->id) }}">
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