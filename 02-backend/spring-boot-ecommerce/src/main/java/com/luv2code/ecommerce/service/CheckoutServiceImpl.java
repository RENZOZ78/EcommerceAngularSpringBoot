package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements  CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public  CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        //recupere la commande information a partir du dto
        Order order = purchase.getOrder();

        //genere un numero de suivi- de commande
        String orderTrackingNumber = generateOrderTrackingNUmber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //rempli les commande avec les orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item-> order.add(item));

        //rempli la commande avec billingaddress et shippingaddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //rempli les customeres avec l'order
        Customer customer = purchase.getCustomer();

        //Verifie s'il ya un client existant grace a l'email
        String theEmail = customer.getEmail();
        Customer custormerFromDB = customerRepository.findByEmail(theEmail);
        if (custormerFromDB != null ){
            customer = custormerFromDB;
        }

        customer.add(order);

        //savegarde dans le database
          customerRepository.save(customer);

        //return avec une response
        return new PurchaseResponse(orderTrackingNumber);

    }

    private String generateOrderTrackingNUmber() {

        //generer un UUID aleatoire
        return UUID.randomUUID().toString();
        
    }
}
