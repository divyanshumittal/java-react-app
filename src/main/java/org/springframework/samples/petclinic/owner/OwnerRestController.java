package org.springframework.samples.petclinic.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.visit.Visit;
import org.springframework.samples.petclinic.visit.VisitRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping(value = "/petOwners")
class OwnerRestController {

    @Autowired
    OwnerRepository owners;
    @Autowired
    PetRepository pets;
    @Autowired
    VisitRepository visits;


    @RequestMapping(value = "/all", produces = "application/json")
    @ResponseBody
    public Collection<Owner> getOwners() {
      Collection<Owner> list =  this.owners.findByLastName("");

      return list;
    }

    @RequestMapping(value = "/pet/add", produces = "application/json", consumes = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public Owner addPet(@RequestBody Pet pet) {
        Owner owner = pet.getOwner();
        owner.addPet(pet);
        owners.save(owner);
        return owner;
    }

    @RequestMapping(value="/petTypes", produces = "application/json")
    @ResponseBody
    public Collection<PetType> populatePetTypes() {
        return this.pets.findPetTypes();
    }

    @RequestMapping(value = "/pet/addVisit", produces = "application/json", consumes = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public Visit addVisit(@RequestBody Visit visit) {
        visits.save(visit);
        return visit;
    }

    @RequestMapping(value = "/pet/cancelVisit", produces = "application/json", consumes = "application/json", method = RequestMethod.DELETE)
    @ResponseBody
    public boolean cancelVisit(@RequestBody Visit visit) {
        visits.delete(visit);
        return true;
    }

    @RequestMapping(value = "/pet/allVisits", produces = "application/json", method = RequestMethod.GET)
    @ResponseBody
    public List<Visit> getVisits() {
        Collection<Owner> ownersList = getOwners();
        Iterator<Owner> iterator = ownersList.iterator();
        List<Visit> visitsList = new ArrayList<Visit>();

        // while loop
        while (iterator.hasNext()) {
            List<Pet> pets = iterator.next().getPets();
            for(int i = 0; i < pets.size(); ++i)
                for(int j = 0; j < pets.get(i).getVisits().size(); ++j)
                    visitsList.add(pets.get(i).getVisits().get(j));
        }

        return visitsList;
    }
}
