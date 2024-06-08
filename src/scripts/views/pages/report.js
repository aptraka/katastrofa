const Report = {
    async render() {
        return `
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
                </div>
            </div>
        </div>
        
        
        <!--Popup Form-->
        <div id="popupForm" class="popup-form">
            <div class="popup-content">
                <span class="close-button" id="closeFormButton">&times;</span>
                <h2>Buat pertanyaan baru</h2>
                <form id="questionForm">
                    <label for="userName">Nama Anda</label>
                    <input type="text" id="userName" name="userName" placeholder="Silahkan tulis nama anda..." required>
                    <label for="content">Isi Konten</label>
                    <textarea id="content" name="content" placeholder="Ketik sesuatu disini..." required></textarea>
                    <button type="submit">Buat Pertanyaan</button>
                </form>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const discussions = [
            {
                id: 1,
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
                    // More comments can be added here
                ]
            },
            {
                id: 2,
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
                    // More comments can be added here
                ]
            },
            {
                id: 3,
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
                    // More comments can be added here
                ]
            },
           
            // Tambahkan lebih banyak objek diskusi sesuai kebutuhan
        ];

        const discussionContainer = document.getElementById('discussion-container');

        discussions.forEach(discussion => {
            const item = createDiscussionItem(discussion);
            discussionContainer.appendChild(item);
        });

        function createDiscussionItem(data) {
            const discussionItem = document.createElement('div');
            discussionItem.classList.add('discussion-item');

            discussionItem.innerHTML = `
                <a href="/#/detail/${data.id}">
                <div class="discussion-header">
                    <img src="${data.avatar}" alt="${data.userName}" class="avatar">
                    <div class="user-info">
                        <span class="user-name">${data.userName}</span>
                        <span class="post-time">${data.postTime}</span>
                    </div>
                </div>
                <div class="discussion-content">
                    <p>${data.content}</p>
                </div>
                <div class="discussion-footer">
                    <i class="fa-solid fa-comment">Balas</i>
                    <span>${data.replies}</span>
                </div>
                </a>
            `;

            const commentsContainer = document.createElement('div');
            commentsContainer.className = 'comments-container';
            data.comments.forEach(comment => {
                const commentElement = createComment(comment);
                commentsContainer.appendChild(commentElement);
            });
            discussionItem.appendChild(commentsContainer);

            // Add comment form
            const commentForm = document.createElement('form');
            commentForm.className = 'comment-form';
            commentForm.innerHTML = `
                <input type="text" placeholder="Tulis komentar..." class="comment-input">
                <button type="submit" class="comment-submit">Kirim</button>
            `;
            commentForm.onsubmit = function(event) {
                event.preventDefault();
                const input = commentForm.querySelector('.comment-input');
                const newComment = {
                    avatar: "../images/avatar.jpeg", // Default avatar or user's avatar
                    userName: "Orang Sekitar", // Should be replaced with actual user's name
                    postTime: new Date().toLocaleTimeString(),
                    content: input.value
                };
                data.comments.push(newComment);
                const newCommentElement = createComment(newComment);
                commentsContainer.appendChild(newCommentElement);
                input.value = ''; // Clear input after submitting
            };
            discussionItem.appendChild(commentForm);

            return discussionItem;
        }

        function createComment(comment) {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';

            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.avatar}" alt="${comment.userName}" class="avatar">
                    <div class="user-info">
                        <h4>${comment.userName}</h4>
                        <span class="post-time">${comment.postTime}</span>
                    </div>
                </div>
                <div class="comment-body">
                    <p>${comment.content}</p>
                </div>
            `;

            return commentElement;
        }

        // popUpForm
        const openFormButton = document.getElementById('openFormButton');
        const popupForm = document.getElementById('popupForm');
        const closeFormButton = document.getElementById('closeFormButton');

        openFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            popupForm.style.display = 'block';
        });

        closeFormButton.addEventListener('click', function() {
            popupForm.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == popupForm) {
                popupForm.style.display = 'none';
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
                id: discussions.length + 1,
                avatar: "../images/avatar.jpeg",
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
            popupForm.style.display = 'none';
        });

        // Fungsi balas komentar
        function createComment(comment) {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
        
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.avatar}" alt="${comment.userName}" class="avatar">
                    <div class="user-info">
                        <h4>${comment.userName}</h4>
                        <span class="post-time">${comment.postTime}</span>
                    </div>
                </div>
                <div class="comment-body">
                    <p>${comment.content}</p>
                </div>
            `;
        
            return commentElement;
        }
    }
};

export default Report;