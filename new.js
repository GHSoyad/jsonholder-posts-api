document.getElementById('get-post').addEventListener('click', function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => displayPosts(posts))

    function displayPosts(posts) {
        const postContainer = document.getElementById('post-section');
        posts.slice(0, 5).map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            postDiv.innerHTML = `
            <h3>Title: ${post.title}</h3>
            <em class='post-author'>Author: ${post.userId}</em>
            <p>Description: ${post.body}</p>
            <button onclick='getComments(${post.id})' id='commentsPost${post.id}Btn'>Show Comments</button>
            <div id='commentsPost${post.id}' class='comments'></div>
            `
            postContainer.appendChild(postDiv);
        });
    }
});

const getComments = postId => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(data => showComment(data))

    function showComment(data) {
        const commentContainer = document.getElementById(`commentsPost${postId}`);
        data.map(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p>User: ${comment.email}</p>
                <p>${comment.body}</p>
                `
            commentContainer.appendChild(commentDiv);
        });
    }
};