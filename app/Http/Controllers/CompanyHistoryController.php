<?php

namespace App\Http\Controllers;

use App\Models\CompanyHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyHistoryController extends Controller
{
    public function index()
    {
        $histories = DB::table('company_histories')->get();
        return view('company_history.index', compact('histories'));
    }

    public function create()
    {
        return view('company_history.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_history' => 'required',
        ]);
    
        $data = $request->all();
        $data['enabled'] = $request->has('enabled') ? 1 : 0;
    
        CompanyHistory::create($data);
     
        return redirect()->route('company_history.index')->with('success','New Hisstory created successfully.');
    }

    public function show(CompanyHistory $company_history)
    {
        return view('company_history.show', compact('company_history'));
    }

    public function edit(CompanyHistory $company_history)
    {
        return view('company_history.edit',compact('company_history'));
    }

    public function update(Request $request, $id){

        $request->validate([
            'company_history' => 'required',
        ]);
        $company_history = CompanyHistory::findOrFail($id); 
        $company_history->company_history = $request->input('company_history'); 
    
        $company_history->enabled = $request->has('enabled') ? 1 : 0;
    
        $company_history->save(); 
    
        return redirect()->route('company_history.index')
            ->with('success', 'company_history updated successfully.');
    }
    
}

