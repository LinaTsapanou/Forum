package com.solera.forum.forum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solera.forum.forum.models.ThreadPosts;

public interface IThreadRepository extends MongoRepository<ThreadPosts, Integer> {

}
