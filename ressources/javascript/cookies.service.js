// Manage URL handling and provide navigation tools

Dashboard.service("Cookies", function( $cookies ){
	
	var vm_Cookies = this;
	
	vm_Cookies.set = function(name , value) {
		$cookies.put(name , value);
	};
	
	vm_Cookies.get = function(name) {
		return $cookies.get(name);
	};
	
});