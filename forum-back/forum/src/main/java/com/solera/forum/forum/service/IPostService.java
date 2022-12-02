package com.solera.forum.forum.service;

import java.util.List;

import com.solera.forum.forum.models.Post;

public interface IPostService {

	public List<Post> getAll();

	public Post getById(String id);

	public Post create(Post post);
	
	public Boolean checkDuplicate(Post post);
}
