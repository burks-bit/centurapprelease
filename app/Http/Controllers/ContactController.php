<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = DB::table('contacts')->get();
        return view('contacts.index', compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('contacts.create');
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
            'contact_no' => 'required',
            'tel_no' => 'required',
            'email' => 'required|email',
            'company_address' => 'required',
        ]);
    
        $data = $request->all();
        $data['enabled'] = $request->has('enabled') ? 1 : 0;
    
        Contact::create($data);
     
        return redirect()->route('contacts.index')->with('success','New Contact created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return view('contacts.show', compact('contact'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        return view('contacts.edit',compact('contact'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'contact_no' => 'required',
            'tel_no' => 'required',
            'email' => 'required|email',
            'company_address' => 'required',
        ]);

        $contact = Contact::findOrFail($id); 
        $contact->contact_no = $request->input('contact_no');
        $contact->tel_no = $request->input('tel_no');
        $contact->email = $request->input('email');
        $contact->company_address = $request->input('company_address');
        $contact->facebook_url = $request->input('facebook_url');
        $contact->ig_url = $request->input('ig_url');
        $contact->xtwitter_url = $request->input('xtwitter_url');

        $contact->enabled = $request->has('enabled') ? 1 : 0;

        $contact->save();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id); 
        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
