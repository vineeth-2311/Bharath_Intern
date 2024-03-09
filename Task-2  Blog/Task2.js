document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    // Fetch posts from the server
    const fetchPosts = () => {
        fetch('/posts')
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('post');
                    postDiv.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                    `;
                    postsContainer.appendChild(postDiv);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    };

    // Handle form submission
    postForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        // Submit post data to the server
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(newPost => {
            console.log('New post added:', newPost);
            // Fetch and display updated posts
            fetchPosts();
            // Clear form fields
            postForm.reset();
        })
        .catch(error => console.error('Error adding post:', error));
    });

    // Fetch posts when the page loads
    fetchPosts();
});