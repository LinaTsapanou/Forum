package com.solera.forum.forum;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale.Category;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.solera.forum.forum.models.Post;
import com.solera.forum.forum.service.PostServiceImpl;


@WebMvcTest
public class PostControllerTests {
	
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PostServiceImpl service;

	@Autowired
	private ObjectMapper mapper;


	//test for create post
	@Test
	public void givenPostObject_whenCreate_thenReturnStatusCreated() throws Exception {

		// given - precondition or setup
		
		List<String> cat= new ArrayList<>();
		cat.add("question");
		Post post = new Post();
		post.setId("1234");
		post.setBody("any text");
		post.setCategory(cat);
		post.setTitle("title");
	

		given(service.create(any(Post.class))).willAnswer((invocation) -> invocation.getArgument(0));

		// when - action or behaviour that we are going test

		ResultActions response = mockMvc.perform(post("http://localhost:8080/api/posts")
				.contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(post)));

		// then - verify the result or output using assert statements
		response.andDo(print()).andExpect(status().isCreated());
	}

	// JUnit test for Get All
	@Test
	public void givenListOfPostss_whenGetAll_thenReturnPostsList() throws Exception {

		// given - precondition or setup
		List<String> cat= new ArrayList<>();
		cat.add("question");
		
		Post post = new Post();
		post.setId("123");
		post.setBody("any text");
		post.setCategory(cat);
		post.setTitle("title");
		List<Post> users = new ArrayList<>();
		

		given(service.getAll()).willReturn(users);

		// when - action or the behaviour that we are going test

		ResultActions response = mockMvc.perform(get("http://localhost:8080/api/posts"));

		// then - verify the output
		response.andExpect(status().isOk()).andDo(print()).andExpect(jsonPath("$.size()", is(users.size())));

	}

	// positive scenario - valid user id
	// JUnit test for GET post by id REST API

	@Test
	public void givenPostId_whenGetById_thenReturnPostObject() throws Exception {

		// given - precondition or setup

		String userId = "1";
		List<String> cat= new ArrayList<>();
		cat.add("question");
		
		Post post = new Post();
		post.setId("1234");
		post.setBody("any text");
		post.setCategory(cat);
		post.setTitle("title");
		post.setId(userId);

		given(service.getById(userId)).willReturn(post);

		// when - action or the behaviour that we are going test

		ResultActions response = mockMvc.perform(get("http://localhost:8080/api/posts/{id}", userId));

		// then - verify the output
		response.andExpect(status().isOk()).andDo(print()).andExpect(jsonPath("$.body", is(post.getBody())))
				.andExpect(jsonPath("$.category", is(post.getCategory())))
				.andExpect(jsonPath("$.title", is(post.getTitle())))
				.andExpect(jsonPath("$.id", is(post.getId())));
	}

	// negative scenario - invalid user id
	// JUnit test for GET post by id REST API
	@Test
	public void givenInvalidPostId_whenGetById_thenReturnEmpty() throws Exception {
		// given - precondition or setup

				String userId = "33";
				List<String> cat= new ArrayList<>();
				cat.add("question");
				
				Post post = new Post();
				
				post.setBody("any text");
				post.setCategory(cat);
				post.setTitle("title");
				

				given(service.getById(userId)).willReturn(null);

				// when - action or the behaviour that we are going test

				ResultActions response = mockMvc.perform(get("http://localhost:8080/api/posts/{id}", userId));

		// then - verify the output
		response.andExpect(status().isNotFound()).andDo(print());

	}
}
