const postContainer = document.querySelector('.post-container');

postContainer.addEventListener('click', async(e) => {
    e.preventDefault();

    // Голосование через fetch
    const votebtnid = e.target.dataset.votebtnid;
    if (votebtnid) {
        const res = await fetch('/posts/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: votebtnid }),
        });

        if (res.status === 200) {
            const data = await res.json();
            const points = e.target.parentNode.querySelector('#points');
            points.innerText = data.votes;
            e.target.style.color = 'orange';
        }
    }

    // Удаление поста
    const deleteId = e.target.dataset.delete;
    if (deleteId) {
        const res = await fetch(`/posts/${deleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteId }),
        });

        if (res.status === 200) {
            const article = document.getElementById(deleteId);
            article.remove();
        }
    }
})

// Создание поста
const newPostForm = document.forms.posts;

newPostForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const title = newPostForm.title.value;
    const res = await fetch('/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    if (res.status === 200) {
        const { newPost } = await res.json();
        console.log(newPost);
        const postBlock = document.createElement('article');
        postBlock.id = newPost._id;
        postBlock.innerHTML = `
            <button data-votebtnid='${newPost._id}' class="fa fa-sort-desc vote-button upvote-button"></button>
            <h2><a href='/posts/${newPost._id}'>${newPost.title}</a></h2>
            <p>
            <span id='points' class='points'>${newPost.votes.length}</span>
            <span class='username'>${newPost.username}</span>
            <span class='timestamp'>0</span>
            <span class='comment-count'>${newPost.commentCount}</span>
            <a data-delete='${newPost._id}' class="delete" href='/posts/${newPost._id}'></a>
            </p>
        `
        postContainer.prepend(postBlock);
    }
})