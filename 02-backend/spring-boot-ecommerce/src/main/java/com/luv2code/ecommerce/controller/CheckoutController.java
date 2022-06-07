package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(value = "http://localhost:4200", exposedHeaders = "Access-Control-Allow-Origin")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;


    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    // methode qui renvoie une response d'achat
    @PostMapping("/purchase")
    public  PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }


}
