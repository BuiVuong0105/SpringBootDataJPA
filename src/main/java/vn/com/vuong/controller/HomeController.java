package vn.com.vuong.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.com.vuong.entity.School;
import vn.com.vuong.service.SchoolService;


@RestController
public class HomeController {
	
	public static final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private SchoolService schoolService;
	
	@GetMapping(value = "/schools")
	public ResponseEntity<List<School>> home(@RequestParam(name = "name", required = false) String name) {
        LOGGER.info("search school");
		List<School> listSchool = schoolService.search(name);
		return new ResponseEntity<List<School>>(listSchool ,HttpStatus.OK);
	}
}
