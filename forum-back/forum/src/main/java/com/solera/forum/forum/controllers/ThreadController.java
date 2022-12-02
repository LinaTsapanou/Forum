package com.solera.forum.forum.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solera.forum.forum.models.ThreadPosts;
import com.solera.forum.forum.service.IThreadService;

@RestController
@RequestMapping("/api/threads")
@CrossOrigin
public class ThreadController {

	
	@Autowired
	IThreadService service;
	
	@GetMapping()
	public ResponseEntity<List<ThreadPosts>> getAll() {

		List<ThreadPosts> list = service.getAll();
		return new ResponseEntity<List<ThreadPosts>>(list, HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<Void> create(ThreadPosts post){
		service.create(post);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
