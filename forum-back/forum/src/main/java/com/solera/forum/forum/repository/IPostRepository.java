package com.solera.forum.forum.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.solera.forum.forum.models.Post;

public interface IPostRepository extends MongoRepository<Post, String> {

}
