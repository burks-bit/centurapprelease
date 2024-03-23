<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Header;
use App\Models\Mission;
use App\Models\Product;
use App\Models\Career;
use App\Models\Service;
use App\Models\Vision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CustomController extends Controller
{
    public function getWebData(){

        $headers = DB::table('headers')->where('enabled', 1)->get();
        $missions = DB::table('missions')->where('enabled', 1)->get();
        $visions = DB::table('visions')->where('enabled', 1)->get();
        $products = DB::table('products')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($headers as $headerkey => $header){
            // $tmpdata['allwebdata'] = $header;
        }
        foreach($missions as $missionkey => $mission){
            // $tmpdata['allwebdata'] = $header;
        }
        foreach($visions as $visionkey => $vision){
            // $tmpdata['allwebdata'] = $header;
        }

        return view('welcome', compact('header', 'mission', 'vision', 'products'));
    }

    public function getWebDatav2(){

        $headers = DB::table('headers')->where('enabled', 1)->get();
        $missions = DB::table('missions')->where('enabled', 1)->get();
        $visions = DB::table('visions')->where('enabled', 1)->get();
        
        $webdatas = array();
        foreach($headers as $headerkey => $header){
            
        }
        
        foreach($missions as $missionkey => $mission){
            
        }
        foreach($visions as $visionkey => $vision){
            
        }
        // foreach($products as $productkey => $product){
            
        // }

        $webdatas = array($header,$mission,$vision);
        

        // return view('welcome', compact('header', 'mission', 'vision', 'products'));
        return response()->json([
            'status' => 'success',
            'webdata' => $webdatas
        ]);
    }

    public function getproducts(){

        $products = DB::table('products')->where('enabled', 1)->limit(4)->get();
        
        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }

    public function getclients(){

        $clients = DB::table('clients')->where('enabled', 1)->limit(4)->get();
        
        return response()->json([
            'status' => 'success',
            'clients' => $clients
        ]);
    }

    public function getallclients(){

        $clients = DB::table('clients')->where('enabled', 1)->get();
        
        return response()->json([
            'status' => 'success',
            'clients' => $clients
        ]);
    }

    public function getallproducts(){

        $products = DB::table('products')->where('enabled', 1)->get();
        
        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }

    public function getspecificproduct($id){

        $products = DB::table('products')->find($id);
        
        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }

    public function getmissionvision(){

        $missions = DB::table('missions')->where('enabled', 1)->get();
        $visions = DB::table('visions')->where('enabled', 1)->get();
        
        foreach($missions as $missionkey => $mission){
            
        }
        foreach($visions as $visionkey => $vision){
            
        }

        $missionvision = array($mission, $vision);

        return response()->json([
            'status' => 'success',
            'missionvision' => $missionvision
        ]);
    }


    public function getcompanyhistory(){
        
        $companyhistories = DB::table('company_histories')->where('enabled', 1)->get();
        foreach($companyhistories as $companyhistorykey => $companyhistory){
            
        }
        $companyhistorydtl = array($companyhistory);

        return response()->json([
            'status' => 'success',
            'companyhistorydtl' => $companyhistorydtl
        ]);
    }

    public function getcontactdetails(){
        
        $contacts = DB::table('contacts')->where('enabled', 1)->get();
        foreach($contacts as $contactskey => $contact){
            
        }
        $contactdetails = array($contact);

        return response()->json([
            'status' => 'success',
            'contactdetails' => $contactdetails
        ]);
    }

    public function getallservices(){

        $services = DB::table('services')->where('enabled', 1)->get();
        foreach($services as $serviceskey => $services){
            
        }
        $servicedetails = array($services);

        return response()->json([
            'status' => 'success',
            'servicedetails' => $servicedetails
        ]);
    }

    public function addnewmgmtheader(Request $request){

        // Create a new Career instance
        $header = new Header();
        $header->header_title = $request->input('header_title');
        $header->header_body = $request->input('header_body');
        $header->enabled = $request->input('enabled') ? 1 : 0;

        // Save the career
        $header->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Header added successfully'], 201);
    }

    public function getHeader(){

        $headers = DB::table('headers')->get();

        Log::info($headers);
        
        $tmpdata = array();
        foreach($headers as $headerkey => $header){
            // $tmpdata['allwebdata'] = $header;
        }
        $webdatas = array($header);
        
        return response()->json([
            'status' => 'success',
            'header' => $headers
        ]);
    }

    public function updateMgmtHeader(Request $request, $id){

        $header = Header::findOrFail($id); 
        $header->header_title = $request->input('header_title');
        $header->header_body = $request->input('header_body');
        $header->enabled = $request->input('enabled') ? 1 : 0;

        if($header->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function deletemgmtheader($id)
    {
        try {
            $header = Header::findOrFail($id);
            $header->delete();
            return response()->json(['message' => 'Header deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete header', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function addnewmgmtmission(Request $request){

        $mission = new Mission();
        $mission->mission = $request->input('mission');
        $mission->enabled = $request->input('enabled') ? 1 : 0;

        $mission->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Mission added successfully'], 201);
    }

    public function getMgmtMission(){

        $missions = DB::table('missions')->get();
        
        // $tmpdata = array();
        // foreach($missions as $missionskey => $mission){
        //     // $tmpdata['allwebdata'] = $header;
        // }
        // $missions = array($mission);
        
        return response()->json([
            'status' => 'success',
            'mission' => $missions
        ]);
    }

    public function updateMgmtMission(Request $request, $id){

        $mission = Mission::findOrFail($id); 
        $mission->mission = $request->input('mission');
        $mission->enabled = $request->input('enabled') ? 1 : 0;

        if($mission->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function deletemgmtmission($id)
    {
        try {
            $mission = Mission::findOrFail($id);
            $mission->delete();
            return response()->json(['message' => 'Mission deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete mission', 'error' => $e->getMessage()], 500);
        }
    }

    public function addnewmgmtvision(Request $request){

        $vision = new Vision();
        $vision->vision = $request->input('vision');
        $vision->enabled = $request->input('enabled') ? 1 : 0;

        $vision->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Vision added successfully'], 201);
    }

    public function getMgmtVision(){

        $visions = DB::table('visions')->get();
        
        // $tmpdata = array();
        // foreach($visions as $visionskey => $vision){
        //     // $tmpdata['allwebdata'] = $header;
        // }
        // $visions = array($vision);
        
        return response()->json([
            'status' => 'success',
            'vision' => $visions
        ]);
    }

    public function updateMgmtVision(Request $request, $id){

        $visions = Vision::findOrFail($id); 
        $visions->vision = $request->input('vision');
        $visions->enabled = $request->input('enabled') ? 1 : 0;

        if($visions->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function deletemgmtvision($id)
    {
        try {
            $vision = Vision::findOrFail($id);
            $vision->delete();
            return response()->json(['message' => 'Vision deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete vision', 'error' => $e->getMessage()], 500);
        }
    }

    public function addnewmgmtservice(Request $request){

        $service = new Service();
        $service->services = $request->input('services');
        $service->enabled = $request->input('enabled') ? 1 : 0;

        $service->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Services added successfully'], 201);
    }

    public function getMgmtServices(){

        $services = DB::table('services')->get();
        
        // $tmpdata = array();
        // foreach($services as $serviceskey => $service){
        //     // $tmpdata['allwebdata'] = $header;
        // }
        // $services = array($service);
        
        return response()->json([
            'status' => 'success',
            'service' => $services
        ]);
    }

    public function updateMgmtServices(Request $request, $id){

        $services = Service::findOrFail($id); 
        $services->services = $request->input('services');
        $services->enabled = $request->input('enabled') ? 1 : 0;

        if($services->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function deletemgmtservices($id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->delete();
            return response()->json(['message' => 'Services deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete vision', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function addnewmgmtcontact(Request $request){

        $contact = new Contact();
        $contact->contact_no = $request->input('contact_no');
        $contact->tel_no = $request->input('tel_no');
        $contact->email = $request->input('email');
        $contact->company_address = $request->input('company_address');
        $contact->facebook_url = $request->input('facebook_url');
        $contact->ig_url = $request->input('ig_url');
        $contact->xtwitter_url = $request->input('xtwitter_url');
        $contact->enabled = $request->input('enabled') ? 1 : 0;

        $contact->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Contact added successfully'], 201);
    }

    public function getMgmtContacts(){

        $contacts = DB::table('contacts')->get();
        
        // $tmpdata = array();
        // foreach($contacts as $contactskey => $contact){
        //     // $tmpdata['allwebdata'] = $header;
        // }
        // $contacts = array($contact);
        
        return response()->json([
            'status' => 'success',
            'contact' => $contacts
        ]);
    }

    public function updateMgmtContacts(Request $request, $id){

        $contacts = Contact::findOrFail($id); 
        $contacts->contact_no = $request->input('contact_no');
        $contacts->tel_no = $request->input('tel_no');
        $contacts->email = $request->input('email');
        $contacts->company_address = $request->input('company_address');
        $contacts->facebook_url = $request->input('facebook_url');
        $contacts->ig_url = $request->input('ig_url');
        $contacts->xtwitter_url = $request->input('xtwitter_url');
        $contacts->enabled = $request->input('enabled') ? 1 : 0;

        if($contacts->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function deletemgmtcontact($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            $contact->delete();
            return response()->json(['message' => 'Contact deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete contact', 'error' => $e->getMessage()], 500);
        }
    }

    public function getMgmtProducts(){

        $products = DB::table('products')->get();
        
        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }

    public function updateMgmtProducts(Request $request, $id){
        try {
            $product = Product::findOrFail($id);
            
            $product->product_name = $request->input('product_name');
            $product->product_model = $request->input('product_model');
            $product->product_description = $request->input('product_description');
            $product->product_manufacturer = $request->input('product_manufacturer');
            $product->product_specimen_type = $request->input('product_specimen_type');
            $product->enabled = $request->input('enabled') ? 1 : 0;
    
            if($request->has('product_image')){
                $base64_image = $request->input('product_image');
                $image_parts = explode(";base64,", $base64_image);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $imageName = time().'.'.$image_type;
                file_put_contents(public_path('product_images/'.$imageName), $image_base64);
                $product->product_image = $imageName;
            } else {
                $imageName = $product->product_image;
            }

            // previous
            // if ($request->has('product_image')) {
            //     $base64_image = $request->input('product_image');
            //     $image_parts = explode(";base64,", $base64_image);
            //     $image_type_aux = explode("image/", $image_parts[0]);
            //     $image_type = $image_type_aux[1];
            //     $image_base64 = base64_decode($image_parts[1]);
            //     $imageName = time().'.'.$image_type;
            //     file_put_contents(public_path('product_images/'.$imageName), $image_base64);
            //     $product->product_image = $imageName;
            // }
            
            $product->save();
            
            return response()->json(['status' => 'success', 'message' => 'Product updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Failed to update product: ' . $e->getMessage()], 500);
        }
    }

    // public function updateMgmtProductImage(Request $request, $id){
    //     $product = Product::findOrFail($id); 
    
    //     // Handle image upload
    //     if($request->hasFile('product_image')) {
    //         $image = $request->file('product_image');
    //         $imageName = time().'.'.$image->getClientOriginalExtension();
    //         $image->move(public_path('product_images'), $imageName);
    //         $product->product_image = $imageName;
    //     }
    
    //     if($product->save()) {
    //         return response()->json([
    //             'status' => 'success'
    //         ]);
    //     }
    // }

    public function getMgmtCareers(){

        $careers = DB::table('careers')->get();

        $careers = $careers->toArray();
        
        return response()->json([
            'status' => 'success',
            'career' => $careers
        ]);
    }

    public function updateMgmtCareers(Request $request, $id){

        $career = Career::findOrFail($id);

        $career->title = $request->input('title');
        $career->description = $request->input('description');
        $career->status = $request->input('status');

        if ($career->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            // Handle error case
        }
    }

    public function getspecificcareer($id){

        $careers = DB::table('careers')->find($id);
        
        return response()->json([
            'status' => 'success',
            'careers' => $careers
        ]);
    }

    public function addnewmgmtcareer(Request $request){

        // Create a new Career instance
        $career = new Career();
        $career->title = $request->input('title');
        $career->description = $request->input('description');
        $career->status = $request->input('status');

        // Save the career
        $career->save();

        // Optionally, you can return a response indicating success
        return response()->json(['message' => 'Career added successfully'], 201);
    }

    public function deletemgmtcareer($id)
    {
        try {
            $career = Career::findOrFail($id);
            $career->delete();
            return response()->json(['message' => 'Career deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete career', 'error' => $e->getMessage()], 500);
        }
    }
}




