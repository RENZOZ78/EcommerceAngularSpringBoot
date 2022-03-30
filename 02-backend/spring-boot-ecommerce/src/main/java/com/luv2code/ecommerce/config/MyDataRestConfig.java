package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions =  {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};


        //disableHTTPS methods for Products: PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        //disableHTTPS methods for ProductCategory: PUT, POST, and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        //call an internal helper method to
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //exposeIds(config entityType ids

        //afficher une list of all entities classes a partir de l'entiy manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //creer una liste des types entité
        List<Class> entityClasses = new ArrayList<>();

        //afficher les types entités pour toutes les entités
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        //exposer les ids des entités pour les tableaux des d'entité
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }


}
