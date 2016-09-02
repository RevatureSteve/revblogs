app.controller("BlogIndexController", ["$scope", "$http", function($scope, $http) 
{
	// Domain DTO mockup
	$scope.posts = {				/* 10 posts per page is default; can be changed by using ?perPage=25 */
		page: 1,					/* current page */
		totalPages: 7,				/* total number of pages */
		totalPosts: 65,				/* total number of posts */
		prev: null,					/* link to previous set of posts */
		next: "/api/posts?page=2",	/* link to next set of posts */
		posts: [					/* array of post objects */
					{
/* post id */			id: 1,
/* post link */			link: "/post/yearMonthDayOfCreation/blogTitle.html",
/* post title */		title: "The Joy of Coding",
/* post subtitle */		subtitle: "40 ways to enhance your productivity whilst coding",
/* post content, plain 
   text (use JS to 
   clamp length) */		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
/* post tag array */	tags: ["Java", ".NET", "General Programming", "Productivity"],
/* post author
   object */			author: {
   							id: 1,
							name: "Trey McDeane",
/* link to user posts */	link: "/author/1/posts"
						},
/* post date as ms */	postDate: 1472588905064
					},
					{
						id: 2,
						title: "Blah Man Blah",
						subtitle: "This is a thing",
						content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
						tags: ["Java", ".NET", "General Programming", "Productivity"],
						author: {
   							id: 1,
							name: "Trey McDeane",
							link: "/author/1/posts"
						},
						postDate: 1472588905064
					},
			]
		}
	
	$scope.numOfPages = [];
	var totalPages = 10;
	
	for (var i = 0; i < totalPages; i++) 
	{
		$scope.numOfPages[i] = i+1		
	}
	
	$scope.getPage = function(page, postsPP)
	{
		$http.get("/revblogs/api/posts?page=" + page).success(
		    function(resp)
			{
				console.log("getPage");
				//var postsPerPage = postsPP;  //postsPerPage, if implemented will be tacked onto url
				var postsPerPage = 10;
				var postsToDisplay = resp.ptd;  //array of posts
				var tPages = resp.totalPages;  //totalPages
				var tPosts = resp.totalPosts;  //totalPosts
				var curPage = page;  //current page

				console.log(curPage);
				
				var prevPage = curPage;
				console.log(prevPage);
				var nextPage = curPage;
				
				if(curPage > 1)
				{
					prevPage = curPage - 1;
					console.log(prevPage);
				}
				
				if(curPage < tPages)
				{
					nextPage = curPage + 1;
				}

				console.log(prevPage);
				$scope.postPage = 
				{									/* 10 posts per page is default; can be changed by using ?perPage=25 */
						page: page,					/* current page */
						totalPages: tPages,	/* total number of pages */
						totalPosts: tPages,	/* total number of posts */
						prev: prevPage,				/* link to previous set of posts */
						next: nextPage,				/* link to next set of posts */
						posts: resp.postsList
				};
				
				if(curPage < tPages)
				{
					preloadPage(nextPage);
				}
				
				preloadPage(nextPage);
				
				if(curPage > 1)
				{
					preloadPage(prevPage);
				}
			}
		);
	}
	
	function preloadPage(page, postsPP)
	{
		$http.get("/revblogs/api/posts?page=" + page).success(
		    function(resp)
			{
				console.log("getPage");
				//var postsPerPage = postsPP;  //postsPerPage, if implemented will be tacked onto url
				var postsPerPage = 10;
				var postsToDisplay = resp.posts;
				var tPages = resp.tPages;  //totalPages
				var tPosts = resp.tPosts;  //totalPosts
				var curPage = page;
				
				var prevPage = curPage;
				console.log(prevPage);
				var nextPage = curPage;
				
				if(curPage > 1)
				{
					var prepPage = curPage - 1;
				}
				
				if(curPage > 1)
				{
					var nextPage = curPage + 1;
				}
				
				$scope.nextPostPage = 
				{									/* 10 posts per page is default; can be changed by using ?perPage=25 */
						page: page,					/* current page */
						totalPages: resp.tPages,	/* total number of pages */
						totalPosts: resp.tPages,	/* total number of posts */
						prev: prevPage,				/* link to previous set of posts */
						next: nextPage,				/* link to next set of posts */
						posts: resp.ptd
				};
			}
		);
	}
	
	function prevPostPage(page, postsPP)
	{
		$http.get("/revblogs/api/posts?page=" + page).success(
		    function(resp)
			{
				console.log("getPage");
				//var postsPerPage = postsPP;  //postsPerPage, if implemented will be tacked onto url
				var postsPerPage = 10;
				var postsToDisplay = resp.ptd;
				var tPages = resp.tPages;  //totalPages
				var tPosts = resp.tPosts;  //totalPosts
				var curPage = page;
				
				if(curPage > 1)
				{
					var prePage = curPage - 1;
				}
				
				if(curPage > 1)
				{
					var nextPage = curPage + 1;
				}
				
				$scope.nextPostPage = 
				{									/* 10 posts per page is default; can be changed by using ?perPage=25 */
						page: page,					/* current page */
						totalPages: resp.tPages,	/* total number of pages */
						totalPosts: resp.tPages,	/* total number of posts */
						prev: prevPage,				/* link to previous set of posts */
						next: nextPage,				/* link to next set of posts */
						posts: resp.ptd
				};
			}
		);
	}
	
	$scope.pageBuffer = function(curPage)
	{
		var postsPerPage = 10;
		var postsToDisplay = $http.getPosts;
		
		$scope.postsArray = 
		{				/* 10 posts per page is default; can be changed by using ?perPage=25 */
				page: curPage,					/* current page */
				totalPages: 7,				/* total number of pages */
				totalPosts: 65,				/* total number of posts */
				prev: null,					/* link to previous set of posts */
				next: "/api/posts?page=2",	/* link to next set of posts */
				posts: $http.getPosts(curPage) 
		}
		if(curPage > 1)
		{
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}]);