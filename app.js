document.getElementById('get-post').addEventListener('click', function () {
    // Clear post container
    const postContainer = document.getElementById('post-section');
    postContainer.innerHTML = '';
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
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
            `
            postContainer.appendChild(postDiv);
        });
    }
});