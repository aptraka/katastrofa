const Report = {
    async render() {
        return `
        <main>
            <div class="first-content">
                <h2>Forum Diskusi</h2>
                <h1>Informasi Terkini Mengenai Bencana Banjir di Jakarta</h1>
            </div>
            <div class="mainContent">
                <div class="aside">
                    <div class="button-content">
                        <a href="#" id="openFormButton">Mulai Bertanya</a>
                    </div>
                    <div class="filter-content">
                        <ul>
                            <li>Semua Diskusi</li>
                            <li>Pertanyaan Saya</li>
                            <li>Jawaban Saya</li>
                            <li>Diskusi Terlama</li>
                            <li>Diskusi Terbaru</li>
                        </ul>
                    </div>
                </div>
                <div class="right-side">
                    <div class="search-content">
                        <form>
                            <div class="search-container">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="Cari Permasalahan Yang Serupa">
                            </div>
                        </form>
                    </div>
                    <div class="discussion" id="discussion-container">
                        <!-- Discussion items will be dynamically inserted here -->
                    </div>
                </div>
            </div>
        </main>
        <div id="popupForm" class="popup-form" style="display:none;">
            <div class="popup-content">
                <span class="close-button" id="closeFormButton">&times;</span>
                <h2>Buat pertanyaan baru</h2>
                <form id="questionForm">
                    <label for="userName">Deskripsi Pertanyaan</label>
                    <input type="text" id="userName" name="userName" placeholder="Silahkan tulis judul pertanyaan..." required>
                    <label for="content">Judul Pertanyaan</label>
                    <textarea id="content" name="content" placeholder="Ketik sesuatu disini..." required></textarea>
                    <button type="submit">Buat Pertanyaan</button>
                </form>
            </div>
        </div>`;
    },

    async afterRender() {
        const discussions = [
            {
                avatar: "../images/avatar.jpeg",
                userName: "Ervalsa Dwi Nanda",
                postTime: "1 jam yang lalu",
                content: "Halo teman-teman semuanya. Saya barusan saja melewati jalan TB Simatupang dan terdapat genangan air yang disebabkan oleh hujan dari jam 10 pagi hingga sekarang yang belum reda.",
                replies: "10 Jawaban",
                comments: [
                    {
                        avatar: "../images/avatar.jpeg",
                        userName: "Ahmad Taufik",
                        postTime: "30 menit yang lalu",
                        content: "Saya juga baru lewat sana, benar sekali, genangan air cukup dalam."
                    }
                ]
            },
            {
                avatar: "../images/avatar.jpeg",
                userName: "Ervalsa Dwi Nanda",
                postTime: "1 jam yang lalu",
                content: "Halo teman-teman semuanya. Saya barusan saja melewati jalan TB Simatupang dan terdapat genangan air yang disebabkan oleh hujan dari jam 10 pagi hingga sekarang yang belum reda.",
                replies: "10 Jawaban",
                comments: [
                    {
                        avatar: "../images/avatar.jpeg",
                        userName: "Ahmad Taufik",
                        postTime: "30 menit yang lalu",
                        content: "Saya juga baru lewat sana, benar sekali, genangan air cukup dalam."
                    }
                ]
            }
        ];

        const discussionContainer = document.getElementById('discussion-container');
        discussions.forEach(discussion => {
            const item = createDiscussionItem(discussion);
            discussionContainer.appendChild(item);
        });

        document.getElementById('openFormButton').addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById('popupForm').style.display = 'block';
        });

        document.getElementById('closeFormButton').addEventListener('click', function() {
            document.getElementById('popupForm').style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == document.getElementById('popupForm')) {
                document.getElementById('popupForm').style.display = 'none';
            }
        });

        document.getElementById('questionForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const userName = document.getElementById('userName').value;
            const content = document.getElementById('content').value;
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const postTime = `${hours}:${minutes}:${seconds}`;

            const newDiscussion = {
                avatar: "../images/default-avatar.jpeg",
                userName: userName,
                postTime: postTime,
                content: content,
                replies: "0 Jawaban",
                comments: []
            };
            
            discussions.push(newDiscussion);
            const item = createDiscussionItem(newDiscussion);
            discussionContainer.appendChild(item);
            
            document.getElementById('userName').value = '';
            document.getElementById('content').value = '';
            document.getElementById('popupForm').style.display = 'none';
        });
    }
}; 

function addCommentForm(discussionItem, discussion) {
    const form = document.createElement('form');
    form.className = 'comment-form';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Tulis komentar...';
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Kirim';
    form.appendChild(input);
    form.appendChild(submitBtn);
    
    form.onsubmit = function(event) {
        event.preventDefault();
        const commentContent = input.value;
        if (commentContent) {
            const userName = sessionStorage.getItem('userName') || 'Nama Pengguna Anonim';
            
            const newComment = {
                avatar: "../images/default-avatar.jpeg",
                userName: userName,
                postTime: new Date().toLocaleTimeString(),
                content: commentContent
            };
            discussion.comments.push(newComment);
            const commentElement = createComment(newComment);
            const commentsContainer = discussionItem.querySelector('.comments');
            commentsContainer.appendChild(commentElement);
            input.value = '';
        }
    };
    
    discussionItem.appendChild(form);
}

function createDiscussionItem(data) {
    const item = document.createElement('div');
    item.className = 'discussion-item';
    
    const header = document.createElement('div');
    header.className = 'discussion-header';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = data.avatar;
    avatarImg.alt = "User Avatar";
    avatarDiv.appendChild(avatarImg);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    const userName = document.createElement('h3');
    userName.textContent = data.userName;
    const postTime = document.createElement('p');
    postTime.textContent = data.postTime;
    infoDiv.appendChild(userName);
    infoDiv.appendChild(postTime);

    header.appendChild(avatarDiv);
    header.appendChild(infoDiv);
    
    const body = document.createElement('div');
    body.className = 'discussion-body';
    const content = document.createElement('p');
    content.textContent = data.content;
    body.appendChild(content);
    
    const footer = document.createElement('div');
    footer.className = 'discussion-footer';
    const replyBtn = document.createElement('button');
    replyBtn.className = 'reply-btn';
    replyBtn.textContent = data.replies;
    replyBtn.onclick = () => toggleComments(item);
    footer.appendChild(replyBtn);
    
    item.appendChild(header);
    item.appendChild(body);
    item.appendChild(footer);
    
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments';
    commentsContainer.style.display = 'none';
    data.comments.forEach(comment => {
        const commentElement = createComment(comment);
        commentsContainer.appendChild(commentElement);
    });
    item.appendChild(commentsContainer);
    
    addCommentForm(item, data);
    
    return item;
}

function createComment(commentData) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    
    const header = document.createElement('div');
    header.className = 'comment-header';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    const avatarImg = document.createElement('img');
    avatarImg.src = commentData.avatar;
    avatarImg.alt = "User Avatar";
    avatarDiv.appendChild(avatarImg);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    const userName = document.createElement('h4');
    userName.textContent = commentData.userName;
    const postTime = document.createElement('p');
    postTime.textContent = commentData.postTime;
    infoDiv.appendChild(userName);
    infoDiv.appendChild(postTime);
    
    header.appendChild(avatarDiv);
    header.appendChild(infoDiv);
    
    const body = document.createElement('div');
    body.className = 'comment-body';
    const content = document.createElement('p');
    content.textContent = commentData.content;
    body.appendChild(content);
    
    comment.appendChild(header);
    comment.appendChild(body);
    
    return comment;
}

function toggleComments(discussionItem) {
    const commentsContainer = discussionItem.querySelector('.comments');
    commentsContainer.style.display = commentsContainer.style.display === 'none' ? '' : 'none';
}

export default Report;

