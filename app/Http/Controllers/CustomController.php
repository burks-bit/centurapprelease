<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Header;
use App\Models\Mission;
use App\Models\Product;
use App\Models\Vision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
}




