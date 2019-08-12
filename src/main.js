var ko;

function ProductListingViewModel() {
    var self = this;
    self.productList = ko.observableArray();
    self.selectedProduct = ko.observable();
    self.loading = ko.observable(true);
    ko.bindingHandlers.price = {
        init:function(element, valueAccessor, allBinding, viewModel, BindingContext){
            var value = valueAccessor();
            var price = ko.unwrap(value);
            $(element).text('$' +  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    }
    self.handleAddToCart=function(){
        alert("Item has beed added to your cart!!!");
        $("#showSelectedProduct").removeClass('overlay');
        self.selectedProduct("");       
    };
    self.handleViewMore = function(product){
        $("#showSelectedProduct").addClass('overlay');
         $("html,body").animate({
            scrollTop:$("#container").offset().top
          },"1000");        
        self.selectedProduct(product);
    };
    self.logResults=function(json){
        console.log(json);
      };
    self.getProducts = function () {

        $.ajax({
            method:"GET",
            crossDomain:true,
            url: "http://localhost:3000/getProductListingData", 
            dataType:"json",
            
            success: function(result){
                if(result && result.productList){
                   self.productList(result.productList);
                   self.loading(false);
                }
            },
            error:function(error){
                console.log("error", error);
            }
        });
       
    };
    self.getProducts();
}


ko.applyBindings(new ProductListingViewModel());