const SUPABASE_URL = "https://apyldjlgrccsrfxkkecd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFweWxkamxncmNjc3JmeGtrZWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NTgxOTIsImV4cCI6MjA2NzEzNDE5Mn0.DdmqgulSvwPHbujwSl8-TY1cfPaAVsO-f5rf1Vj0GL0";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 댓글 시스템 초기화
initCommentsSystem();
function initCommentsSystem() {
  const commentsPanel = document.getElementById("commentsPanel");
  const commentsHeader = document.querySelector(".comments-header");

  // 🆕 기존 댓글들 로드
  loadExistingComments();

  // 댓글 전송 부분 수정
  document
    .getElementById("submitBtn")
    .addEventListener("click", async function () {
      const nameInput = document.getElementById("nameInput");
      const commentInput = document.getElementById("commentInput");

      const name = nameInput.value.trim() || "익명";
      const content = commentInput.value.trim();

      if (!content) return;

      try {
        // currentSlideIndex 대신 현재 슬라이드 감지 로직 사용
        let currentSlide = "general"; // 기본값

        // 현재 보이는 슬라이드 찾기
        const slides = document.querySelectorAll(".slide-content");
        slides.forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSlide = `slide_${index}`;
          }
        });

        await supabase.from("comments").insert([
          {
            content: content,
            author: name,
            slide_id: currentSlide,
            user_id: "user_" + Date.now(),
            created_at: new Date().toISOString(),
          },
        ]);

        commentInput.value = "";
      } catch (error) {
        console.error("댓글 전송 실패:", error);
      }
    });

  // 실시간 댓글 구독
  supabase
    .channel("comments")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "comments",
      },
      (payload) => {
        addCommentToUI(payload.new);
      }
    )
    .subscribe();
}

// 🆕 기존 댓글 로드 함수 추가
async function loadExistingComments() {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true }); // 오래된 순으로 정렬

    if (error) throw error;

    // 기존 댓글들을 UI에 추가
    if (data && data.length > 0) {
      data.forEach((comment) => {
        addCommentToUI(comment, false); // false = 새 댓글 애니메이션 없이
      });

      // 전체 댓글 수 업데이트
      const count = document.getElementById("commentCount");
      count.textContent = data.length;
    }
  } catch (error) {
    console.error("기존 댓글 로드 실패:", error);
  }
}

// addCommentToUI 함수도 약간 수정
function addCommentToUI(comment, isNew = true) {
  const commentsList = document.getElementById("commentsList");
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment-item";

  // 🆕 시간 표시 추가
  const timeString = new Date(comment.created_at).toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  commentDiv.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-time">${timeString}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
    `;

  commentsList.appendChild(commentDiv);
  commentsList.scrollTop = commentsList.scrollHeight;

  // 새 댓글일 때만 카운트 증가
  if (isNew) {
    const count = document.getElementById("commentCount");
    count.textContent = parseInt(count.textContent) + 1;
  }
}
