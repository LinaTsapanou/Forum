package com.solera.forum.forum.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solera.forum.forum.models.Post;
import com.solera.forum.forum.service.IPostService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin
public class PostController {

	@Autowired
	IPostService service;

	String[] banned = new String[] { "Dialect", "Differently", "Dirty old man", "Disabled", "Dissenter", "Distaff",
			"Dogma", "Doorman", "Down's syndrome", "Draftsman", "Drunk", "Duffer", "Dummy", "Dwarf", "Heretic",
			"Heroine", "Hispanic", "Homosexual", "Hordes", "Horseman", "Horsemanship", "Hottentot", "Houseman",
			"Housewife", "Hussy", "Huts", "Pollyanna", "Polo", "Pop", "Postman", "Postmaster", "Pressman", "Primitive",
			"Primitive man", "Profoundly deaf", "Provider", "Sect", "Senile", "Senility", "Serviceman", "Showman",
			"Sickly", "Sightless", "Sioux", "Sissy", "Sissified", "Slave", "Sneaky", "Snow ball", "Snow cone",
			"Snowman", "Sob sister", "Soda", "Songstress", "Sophisticated", "Soul food" };

	@GetMapping()
	public ResponseEntity<List<Post>> getAll() {

		List<Post> list = service.getAll();
		return new ResponseEntity<List<Post>>(list, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Post> getById(@PathVariable Integer id) throws Exception {

		Post post = service.getById(id);
		if (post == null) {
			return new ResponseEntity<>(post, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(post, HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<String> create(@RequestBody Post post) {

		if(service.checkDuplicate(post)) {
			return new ResponseEntity<String>("Duplicated title",HttpStatus.BAD_REQUEST);
		}
		for (String item : banned) {
			if(post.getTitle().equalsIgnoreCase(item)) {
				return new ResponseEntity<String>("Banned word inside title",HttpStatus.BAD_REQUEST);
			}
		}
		service.create(post);
		return new ResponseEntity<String>("Item created",HttpStatus.CREATED);
	}

}
