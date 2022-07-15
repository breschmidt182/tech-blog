

async function createPost() {

    const postTitle = document.querySelector("#post_title").value

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle,
            post_text: '',
            post_id: '',
            user_id: ''
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.status == 200) {
        window.location.replace('/dashboard')
    }else{
        window.alert('Unable to create post')
    }
};

createPostBtn.addEventListener('submit', createPost);