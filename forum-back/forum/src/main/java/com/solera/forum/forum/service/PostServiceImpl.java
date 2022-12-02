package com.solera.forum.forum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solera.forum.forum.models.Post;
import com.solera.forum.forum.repository.IPostRepository;
@Service
public class PostServiceImpl implements IPostService {
	
	@Autowired
	IPostRepository repository;
	

	@Override
	public List<Post> getAll() {

		return repository.findAll();
	}

	@Override
	public Post getById(String id) {

		return repository.findById(id).orElse(null);
	}

	@Override
	public Post create(Post post) {

		return repository.save(post);
	}
	
	public Boolean checkDuplicate(Post post) {
		
		List<Post> list = getAll();
		Boolean checked= false;
		
		for (Post item : list) {
			if(item.getTitle().equalsIgnoreCase(post.getTitle())) {
				checked= true;
			}
		}
		return checked;
	}

}
