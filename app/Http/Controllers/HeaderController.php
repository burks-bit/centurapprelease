<?php

namespace App\Http\Controllers;

use App\Models\Header;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $headers = DB::table('headers')->get();
        return view('headers.index', compact('headers'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('headers.create');
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
            'header_title' => 'required',
            'header_body' => 'required',
        ]);
    
        $data = $request->all();
        $data['enabled'] = $request->has('enabled') ? 1 : 0;
    
        Header::create($data);
     
        return redirect()->route('headers.index')->with('success','New Headers created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Header  $header
     * @return \Illuminate\Http\Response
     */
    public function show(Header $header)
    {
        return view('headers.show', compact('header'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Header  $header
     * @return \Illuminate\Http\Response
     */
    public function edit(Header $header)
    {
        return view('headers.edit',compact('header'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Header  $header
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'header_title' => 'required',
            'header_body' => 'required',
        ]);

        $header = Header::findOrFail($id); 
        $header->header_title = $request->input('header_title');
        $header->header_body = $request->input('header_body');

        $header->enabled = $request->has('enabled') ? 1 : 0;

        $header->save(); 

        return redirect()->route('headers.index')
            ->with('success', 'Header updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Header  $header
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $header = Header::findOrFail($id); 
        $header->delete();

        return redirect()->route('headers.index')
            ->with('success', 'Header deleted successfully.');
    }
}
