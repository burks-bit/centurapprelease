<?php

namespace App\Http\Controllers;

use App\Models\Vision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visions = DB::table('visions')->get();
        return view('visions.index', compact('visions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('visions.create');
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
            'vision' => 'required',
        ]);
    
        $data = $request->all();
        $data['enabled'] = $request->has('enabled') ? 1 : 0;
    
        Vision::create($data);
     
        return redirect()->route('visions.index')->with('success','New Vision created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vision  $vision
     * @return \Illuminate\Http\Response
     */
    public function show(Vision $vision)
    {
        return view('visions.show', compact('vision'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vision  $vision
     * @return \Illuminate\Http\Response
     */
    public function edit(Vision $vision)
    {
        return view('visions.edit',compact('vision'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vision  $vision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'vision' => 'required',
        ]);

        $vision = Vision::findOrFail($id); 
        $vision->vision = $request->input('vision');
        $vision->enabled = $request->has('enabled') ? 1 : 0;

        $vision->save();

        return redirect()->route('visions.index')
            ->with('success', 'Vision updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vision  $vision
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $vision = Vision::findOrFail($id);
        $vision->delete();

        return redirect()->route('visions.index')
            ->with('success', 'Vision deleted successfully.');
    }
}
