<template>
  <div class="comments-page">

    <section class="comments-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Komentari zajednice</h1>
        <p class="hero-subtitle">Podijelite svoja iskustva i mišljenja s drugim ljubiteljima prirode</p>
      </div>
    </section>

    <div class="comments-container">
      <div class="comment-form">
        <div class="user-avatar">
          <img src="https://ui-avatars.com/api/?name=Korisnik&background=ff7675&color=fff" alt="Profilna slika">
        </div>
        <div class="form-content">
          <textarea v-model="newComment" placeholder="Napišite svoj komentar..." rows="3"></textarea>
          <div class="form-actions">
            <button class="btn-post" @click="postComment" :disabled="!newComment.trim()">
              Objavi
            </button>
          </div>
        </div>
      </div>

      <div class="comments-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-card">
          <div class="comment-header">
            <div class="user-avatar">
              <img :src="comment.avatar" :alt="comment.author">
            </div>
            <div class="user-info">
              <h4>{{ comment.author }}</h4>
              <span class="comment-date">{{ comment.date }}</span>
            </div>
            <button class="btn-like" @click="toggleLike(comment)">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path :fill="comment.liked ? '#ff6b6b' : 'none'" stroke="#ff6b6b" stroke-width="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>{{ comment.likes }}</span>
            </button>
          </div>
          <div class="comment-body">
            <p>{{ comment.text }}</p>
          </div>
          <div class="comment-footer">
            <button class="btn-reply">Odgovori</button>
          </div>

          <div v-if="comment.replies.length" class="replies-container">
            <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply-card">
              <div class="reply-header">
                <div class="user-avatar small">
                  <img :src="reply.avatar" :alt="reply.author">
                </div>
                <div class="user-info">
                  <h5>{{ reply.author }}</h5>
                  <span class="reply-date">{{ reply.date }}</span>
                </div>
              </div>
              <div class="reply-body">
                <p>{{ reply.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsPage',
  data() {
    return {
      newComment: '',
      comments: [
        {
          id: 1,
          author: 'Marko Marković',
          avatar: 'https://ui-avatars.com/api/?name=Marko+Marković&background=e84393&color=fff',
          date: 'Prije 2 dana',
          text: 'Ovo je nevjerojatna stranica! Volim kako prezentirate životinje i njihova staništa. Svaka čast na trudu!',
          likes: 15,
          liked: false,
          replies: [
            {
              id: 101,
              author: 'Ana Anić',
              avatar: 'https://ui-avatars.com/api/?name=Ana+Anić&background=0984e3&color=fff',
              date: 'Prije 1 dan',
              text: 'Potpuno se slažem s tobom, Marko! Fotografije su spektakularne.'
            }
          ]
        },
        {
          id: 2,
          author: 'Ivana Ivić',
          avatar: 'https://ui-avatars.com/api/?name=Ivana+Ivić&background=00b894&color=fff',
          date: 'Prije 1 tjedan',
          text: 'Voljela bih vidjeti više sadržaja o morskim životinjama. Imate li planova za nove epizode o morskim dubinama?',
          likes: 8,
          liked: true,
          replies: []
        }
      ]
    }
  },
  methods: {
    postComment() {
      if (!this.newComment.trim()) return;

      const newComment = {
        id: Date.now(),
        author: 'Trenutni Korisnik',
        avatar: 'https://ui-avatars.com/api/?name=Korisnik&background=ff7675&color=fff',
        date: 'Upravo sada',
        text: this.newComment,
        likes: 0,
        liked: false,
        replies: []
      };

      this.comments.unshift(newComment);
      this.newComment = '';
    },
    toggleLike(comment) {
      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
    }
  }
}
</script>

<style scoped>

.comments-page {
  font-family: 'Poppins', sans-serif;
  color: #2d3436;
  line-height: 1.6;
}

.comments-hero {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #2b2d42 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.comments-container {
  max-width: 800px;
  margin: -50px auto 50px;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.comment-form {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-content {
  flex: 1;
}

textarea {
  width: 100%;
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  padding: 12px 15px;
  font-family: 'Poppins', sans-serif;
  resize: none;
  transition: all 0.3s ease;
}

textarea:focus {
  outline: none;
  border-color: #74b9ff;
  box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn-post {
  background: linear-gradient(to right, #ff6b6b, #e84393);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-post:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(232, 67, 147, 0.3);
}

.btn-post:disabled {
  background: #b2bec3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.comment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.user-info {
  flex: 1;
  margin-left: 15px;
}

.user-info h4 {
  margin: 0;
  font-size: 1rem;
  color: #2d3436;
}

.comment-date {
  font-size: 0.8rem;
  color: #636e72;
}

.btn-like {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #636e72;
  font-size: 0.9rem;
}

.btn-like svg {
  transition: all 0.3s ease;
}

.btn-like:hover svg {
  transform: scale(1.1);
}

.comment-body p {
  margin: 0;
  color: #2d3436;
  line-height: 1.7;
}

.comment-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.btn-reply {
  background: none;
  border: none;
  color: #0984e3;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-reply:hover {
  text-decoration: underline;
}

.replies-container {
  margin-top: 20px;
  padding-left: 30px;
  border-left: 2px solid #f0f0f0;
}

.reply-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.reply-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar.small {
  width: 35px;
  height: 35px;
}

.user-info h5 {
  margin: 0;
  font-size: 0.9rem;
}

.reply-date {
  font-size: 0.7rem;
  color: #636e72;
}

.reply-body p {
  margin: 0;
  font-size: 0.9rem;
  color: #2d3436;
}

body.dark-theme .comment-form,
body.dark-theme .comment-card,
body.dark-theme .reply-card {
  background: #2b2d42;
  color: #f9f9f9;
}

body.dark-theme .comment-body p,
body.dark-theme .reply-body p,
body.dark-theme .user-info h4,
body.dark-theme .user-info h5 {
  color: #f9f9f9;
}

body.dark-theme textarea {
  background: #1a1a2e;
  color: white;
  border-color: #3d3d5c;
}

body.dark-theme .comment-footer {
  border-top-color: #3d3d5c;
}

body.dark-theme .replies-container {
  border-left-color: #3d3d5c;
}

body.dark-theme .reply-card {
  background: #1a1a2e;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .comment-form {
    flex-direction: column;
  }

  .user-avatar {
    margin-bottom: 15px;
  }

  .replies-container {
    padding-left: 15px;
  }
}
</style>