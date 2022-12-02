package com.solera.forum.forum.service;

import java.util.List;

import com.solera.forum.forum.models.ThreadPosts;

public interface IThreadService {

	public List<ThreadPosts> getAll();
	
	public ThreadPosts create(ThreadPosts posts);
}
