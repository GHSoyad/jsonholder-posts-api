document.getElementById('get-post').addEventListener('click', function () {
    // Clear post container
    const postContainer = document.getElementById('post-section');
    postContainer.innerHTML = '';
    // Post loader
    const postLoader = document.getElementById('post-loader');
    postLoader.style.display = 'block';
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            postLoader.style.display = 'none';
            displayPosts(posts)
        })

    function displayPosts(posts) {
        console.log(posts);

        posts.slice(0, 10).map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            postDiv.innerHTML = `
            <h3>Title: ${post.title}</h3>
            <em class='post-author'>Author: ${post.userId}</em>
            <p>Description: ${post.body}</p>
            <button onclick='getComments(${post.id})' id='commentsPost${post.id}Btn'>Show Comments <span id='comment-loader${post.id}' class='comment-loader'></span></button>
            <div id='commentsPost${post.id}' class='comments hide'></div>
            `
            postContainer.appendChild(postDiv);
        });
    }
});

const getComments = postId => {
    // Comments loader
    const commentLoader = document.getElementById(`comment-loader${postId}`);
    commentLoader.style.display = 'inline-block';
    // Fetch comments
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(data => {
            commentLoader.style.display = 'none';
            showComment(data)
        })

    function showComment(data) {
        const commentContainer = document.getElementById(`commentsPost${postId}`);
        const commentBtn = document.getElementById(`commentsPost${postId}Btn`);

        if (commentBtn.innerText === 'Show Comments') {
            data.map(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                <p>User: ${comment.email}</p>
                <p>${comment.body}</p>
                `
                commentContainer.appendChild(commentDiv);
            });
            commentContainer.classList.remove('hide');
            commentBtn.innerHTML = `Hide Comments <span id='comment-loader${postId}' class='comment-loader'></span>`;
        } else {
            commentContainer.classList.add('hide');
            commentBtn.innerHTML = `Show Comments <span id='comment-loader${postId}' class='comment-loader'></span>`;
            commentContainer.innerHTML = '';
        }
    }
};