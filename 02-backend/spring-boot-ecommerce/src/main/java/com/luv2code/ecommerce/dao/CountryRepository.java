package com.luv2code.ecommerce.dao;

        import com.luv2code.ecommerce.entity.Country;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@CrossOrigin(value = "http://localhost:4200", exposedHeaders = "Access-Control-Allow-Origin")
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {


}
