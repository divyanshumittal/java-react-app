package org.springframework.samples.petclinic.vet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Controller
@RequestMapping(value = "/vets")
class VetRestController {

    @Autowired
    VetRepository vets;

    @RequestMapping(value = "/all", produces = "application/json")
    @ResponseBody
    public Collection<Vet> getVets() {
        Collection<Vet> list =  this.vets.findAll();

        return list;
    }

    @RequestMapping(value = "/add", produces = "application/json", consumes = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public Vet addVet(@RequestBody Vet vet) {
        vets.save(vet);
        return vet;
    }
}
