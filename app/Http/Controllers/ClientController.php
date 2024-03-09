<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = DB::table('clients')->get();
        return view('clients.index', compact('clients'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('clients.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'client_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'client_name' => 'required',
            'client_address' => 'required',
            'category' => 'required',
        ]);
        
        if($request->hasFile('client_logo')){
            $image = $request->file('client_logo');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('client_logos'), $imageName);
            
            $data = $request->all();
            $data['client_logo'] = $imageName;
            $data['enabled'] = $request->has('enabled') ? 1 : 0;
        
            Client::create($data);
        
            return redirect()->route('clients.index')->with('success','New Client created successfully.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        return view('clients.show',compact('client'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        return view('clients.edit',compact('client'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'client_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'client_name' => 'required',
            'client_address' => 'required',
            'category' => 'required',
        ]);

        if($request->hasFile('client_logo')){
            $image = $request->file('client_logo');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('client_logos'), $imageName);
            
            
            $client = Client::findOrFail($id);
            $client->client_logo = $imageName;
            $client->client_name = $request->input('client_name');
            $client->client_address = $request->input('client_address');

            $client->enabled = $request->has('enabled') ? 1 : 0;

            $client->save(); 

            return redirect()->route('clients.index')
                ->with('success', 'Client updated successfully.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id); 
        $client->delete();

        return redirect()->route('clients.index')
            ->with('success', 'Client deleted successfully.');
    }
}
