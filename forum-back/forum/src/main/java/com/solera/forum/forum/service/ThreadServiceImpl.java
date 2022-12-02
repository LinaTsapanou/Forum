package com.solera.forum.forum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solera.forum.forum.models.ThreadPosts;
import com.solera.forum.forum.repository.IThreadRepository;

@Service
public class ThreadServiceImpl implements IThreadService {

	@Autowired
	IThreadRepository repo;
	
	
	
	@Override
	public List<ThreadPosts> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}



	@Override
	public ThreadPosts create(ThreadPosts posts) {
		// TODO Auto-generated method stub
		return repo.save(posts);
	}

}
