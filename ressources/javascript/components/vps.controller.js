Dashboard.controller('VPS_Controller', function($scope, $timeout, ApiService, PopupService, ListManager) {
	
    var VPS                 = this;
    var Dashboard           = null; 

    VPS.OS_List             = [];
    VPS.Price               = null;
    VPS.Calculated_Price    = 0;
    VPS.Calculated_Days     = 31;
    VPS.FormState           = '';
    VPS.FormError           = '';

    // VPS Creation & Edition settings
    VPS.Settings    = {
        vCores          : {title: "vCores"          , name : "vCores"       , type:"range"  , icon: "fas fa-microchip"          , range_start   : 1 , range_end : 8   , value : 1     , unit: "CPU"   },
        Ram             : {title: "RAM"             , name : "Ram"          , type:"range"  , icon: "fas fa-memory"             , range_start   : 1 , range_end : 12  , value : 1     , unit: "GB"    , display_step:2},
        Disk            : {title: "Stockage"        , name : "Disk"         , type:"range"  , icon: "fas fa-hdd"                , range_start   : 1 , range_end : 300 , value : 50    , unit: "GB"    ,range_step: 10 , display_step:50},
        Bandwidth       : {title: "Bande Passante"  , name : "Bandwidth"    , type:"range"  , icon: "fas fa-tachometer-alt"     , range_start   : 1 , range_end : 150 , value : 100   , unit: "Mbps"  ,range_step: 10 , display_step:50},
        IPv4            : {title: "Nombre d'IPv4"   , name : "IPv4"         , type:"range"  , icon: "fas fa-server"             , range_start   : 1 , range_end : 8   , value : 1     , unit: "IPv4"  },
        IPv6            : {title: "Nombre d'IPv6"   , name : "IPv6"         , value: 0      , visibility : "hidden"            },
        Type            : {title: "Architecture"    , name : "Type"         , type:"option" , icon: "fas fa-server"             , on_change     : 'setOS_List'        , value : 1     ,
            options :   [
                {value : 1 , title : "HDD - Linux"      ,icon: "fab fa-linux"},
                {value : 2 , title : "SSD - Linux"      ,icon: "fab fa-linux"},
                {value : 3 , title : "HDD - Windows"    ,icon: "fab fa-windows"},
                {value : 4 , title : "SSD - Windows"    ,icon: "fab fa-windows"},
            ]
        },
        OS              : {title: "OS"              , name : "OS"          , type:"option" , icon: "fas fa-server"             , options        : [] , value  : "Ubuntu 18.04"  },
    };
    
    
    VPS.Calculator    = {
        Days            : {title: "Jours"           , name : "Day"          , type:"range"  , icon: "far fa-calendar-alt"      , on_change      : 'update_CalculatedPrice', range_start : 0 , range_end : 31   , value : 31     , unit: "Jours", display_step: 7},
    };
    
    
    VPS.load     = function() {
        // Chargement de la liste des VPS
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { VPS.Listing = response  });
        
        // Chargement de la liste des OS disponibles
        ListManager.init( { endpoint : "VPS" , action : "List_OS"  } ).then(function(response) {  VPS.OS_List = response; VPS.setOS_List(1); });
        
        
        VPS.init = function(Dashboard) {
            VPS.Dashboard = Dashboard;
        };
    };
    
    
    VPS.ReloadList = function() {
        angular.element( $('.Frame') ).scope().VPS.load();
    };
    
    // Set OS List of selected VPS Type
    VPS.setOS_List = function(Type) {
        
        VPS.Settings.Disk.range_end = (VPS.Settings.Type.value == 2 || VPS.Settings.Type.value == 4 ? 80 : 300) ;
        
        VPS.Settings.OS.options = [];
        
        angular.forEach(VPS.OS_List[Type], function(value, key) {
            
            var icon =  "fab fa-linux";
            
            if(value.indexOf("Ubuntu") !== -1) {
               icon =  "fab fa-ubuntu";
            }
            
            VPS.Settings.OS.options.push( {value : value , title : value, icon : icon} );
        });
    };
    
    
    $scope.$watch('VPS.Settings', function(newValue, oldValue, scope){
        VPS.GetPricing();
        }, true);
        
    
    VPS.GetPricing = function() {
        let settings = ListManager.getValuesOf(this);
        ApiService.post('VPS', 'Pricing' , settings).then(function(response) { VPS.Price = response.data.Price_Per_Month; VPS.update_CalculatedPrice(); });
    };
    
    
    
    // Submit
    VPS.AddSubmit = function(Form) {
        if(VPS.Price) {
            let settings = ListManager.getValuesOf(this);
            
            ApiService.post('VPS', 'Add' , settings).then(function(response) { 
                Form.process(response); 
            
                if(response.valid) {
                    VPS.ReloadList();
                    $timeout(function() {
                        PopupService.close();      
                    }, 1500);
                }
            });
        }
    };
    
    
    
    // Calculate the estimated price
    VPS.update_CalculatedPrice  = function(Days = false) {
        
        if(Days) {
            VPS.Calculated_Days     = Days;
        }
        
        VPS.Calculated_Price    = Math.round( ((VPS.Price * (VPS.Calculated_Days / 31 )) + ((1+(2.4* VPS.Settings.IPv4.value )) * ( (31 - VPS.Calculated_Days) / 31 )) ) * 100) / 100    ;
    };
    
    
    VPS.Edit = function(VPS) {
        PopupService.openNew(  {Endpoint : 'VPS', Action:'Edit', Title:'Editer un VPS', ID_VPS:VPS.ID, VPS_Hostname : VPS.Hostname }    );
    };
    
    
    // Delete - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    VPS.Delete = function(VPS) {
        PopupService.openNew(  {Endpoint : 'VPS', Action:'Delete', Title:'Supprimer un VPS', ID_VPS:VPS.ID }    );
    };
    

    VPS.DeleteSubmit = function(Form) {
        ApiService.post('VPS', 'Delete' , VPS).then(function(response) {
           Form.process(response);  
           VPS.ReloadList();
           $timeout(function() { PopupService.close() } , 1500);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    VPS.load();
});