<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Header;
use App\Models\Mission;
use App\Models\Product;
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

    public function getHeader(){

        $headers = DB::table('headers')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($headers as $headerkey => $header){
            // $tmpdata['allwebdata'] = $header;
        }
        $webdatas = array($header);
        
        return response()->json([
            'status' => 'success',
            'header' => $webdatas
        ]);
    }

    public function updateMgmtHeader(Request $request, $id){

        $header = Header::findOrFail($id); 
        $header->header_title = $request->input('header_title');
        $header->header_body = $request->input('header_body');

        if($header->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function getMgmtMission(){

        $missions = DB::table('missions')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($missions as $missionskey => $mission){
            // $tmpdata['allwebdata'] = $header;
        }
        $missions = array($mission);
        
        return response()->json([
            'status' => 'success',
            'mission' => $missions
        ]);
    }

    public function updateMgmtMission(Request $request, $id){

        Log::info($request);

        $header = Mission::findOrFail($id); 
        $header->mission = $request->input('mission');

        if($header->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function getMgmtVision(){

        $visions = DB::table('visions')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($visions as $visionskey => $vision){
            // $tmpdata['allwebdata'] = $header;
        }
        $visions = array($vision);
        
        return response()->json([
            'status' => 'success',
            'vision' => $visions
        ]);
    }

    public function updateMgmtVision(Request $request, $id){

        $visions = Vision::findOrFail($id); 
        $visions->vision = $request->input('vision');

        if($visions->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function getMgmtServices(){

        $services = DB::table('services')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($services as $serviceskey => $service){
            // $tmpdata['allwebdata'] = $header;
        }
        $services = array($service);
        
        return response()->json([
            'status' => 'success',
            'service' => $services
        ]);
    }

    public function updateMgmtServices(Request $request, $id){

        $services = Service::findOrFail($id); 
        $services->services = $request->input('services');

        if($services->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        } else {
            
        }
    }

    public function getMgmtContacts(){

        $contacts = DB::table('contacts')->where('enabled', 1)->get();
        
        $tmpdata = array();
        foreach($contacts as $contactskey => $contact){
            // $tmpdata['allwebdata'] = $header;
        }
        $contacts = array($contact);
        
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

    public function getMgmtProducts(){

        $products = DB::table('products')->where('enabled', 1)->get();
        
        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }

    public function updateMgmtProducts(Request $request, $id){
        $array = array($request);
        Log::info($array);

        try {
            $product = Product::findOrFail($id);
            
            $product->product_name = $request->input('product_name');
            $product->product_model = $request->input('product_model');
            $product->product_description = $request->input('product_description');
            $product->product_manufacturer = $request->input('product_manufacturer');
            $product->product_specimen_type = $request->input('product_specimen_type');
    
            // Handling product image
            if ($request->has('product_image')) {
                $base64_image = $request->input('product_image');
                // Extracting the image data
                $image_parts = explode(";base64,", $base64_image);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $imageName = time().'.'.$image_type;
                // Saving the image
                file_put_contents(public_path('product_images/'.$imageName), $image_base64);
                // Save only the filename to the product's product_image attribute
                $product->product_image = $imageName;
            }
            
            $product->save();
            
            return response()->json(['status' => 'success', 'message' => 'Product updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Failed to update product: ' . $e->getMessage()], 500);
        }
    }

    public function updateMgmtProductImage(Request $request, $id){
        $product = Product::findOrFail($id); 
    
        // Handle image upload
        if($request->hasFile('product_image')) {
            $image = $request->file('product_image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('product_images'), $imageName);
            $product->product_image = $imageName;
        }
    
        if($product->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        }
    }
}




