<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $missions = DB::table('missions')->get();
        return view('missions.index', compact('missions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('missions.create');
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
            'mission' => 'required',
        ]);
    
        $data = $request->all();
        $data['enabled'] = $request->has('enabled') ? 1 : 0;
    
        Mission::create($data);
     
        return redirect()->route('missions.index')->with('success','New Mission created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function show(Mission $mission)
    {
        return view('missions.show', compact('mission'));
    } 

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function edit(Mission $mission)
    {
        return view('missions.edit',compact('mission'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'mission' => 'required',
        ]);

        $mission = Mission::findOrFail($id); 
        $mission->mission = $request->input('mission'); 

        $mission->enabled = $request->has('enabled') ? 1 : 0;

        $mission->save(); 

        return redirect()->route('missions.index')
            ->with('success', 'Mission updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mission = Mission::findOrFail($id); 
        $mission->delete();

        return redirect()->route('missions.index')
            ->with('success', 'Mission deleted successfully.');
    }
}
