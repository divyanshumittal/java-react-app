package org.springframework.samples.petclinic.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;

@Controller
@RequestMapping(value = "/petOwners")
class OwnerRestController {

    @Autowired
    OwnerRepository owners;
    @Autowired
    PetRepository pets;


    @RequestMapping(value = "/all", produces = "application/json")
    @ResponseBody
    public Collection<Owner> getOwners() {
      Collection<Owner> list =  this.owners.findByLastName("");

      return list;
    }

    @RequestMapping(value = "/pet/add", produces = "application/json")
    @ResponseBody
    public Owner addPet(@RequestParam("ownerId") String ownerId) {
        System.out.println("ownerId" + ownerId);

        return new Owner();
    }

    @RequestMapping(value="/petTypes", produces = "application/json")
    @ResponseBody
    public Collection<PetType> populatePetTypes() {
        return this.pets.findPetTypes();
    }
}
