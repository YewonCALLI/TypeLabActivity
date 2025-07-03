// TypeLab 공통 데이터 및 함수

// 슬라이드 데이터
const SLIDES = [
  {
    title: "컴퓨터의 발명",
    content:
      '<a href="https://blog.naver.com/moons4ir/223439412594">아타나소프-베리 컴퓨터(Atanasoff–Berry Computer)</a>는 세계 최초의 전자식 컴퓨터이다.',
    contentType: "html",
    image: "static/firstcomputer.jpeg",
  },
  {
    title: "타이포와 알고리즘",
    content:
      '<a href="https://youtu.be/AgjtKQCm95I?si=m2DePNvVELHLYv1s&t=622">Ben Laposky의 전자 추상화 실험</a>, 최초의 디지털 그래픽 실험.',
    contentType: "html",
    image: "static/images (3).jpg",
  },
  {
    content: "차피노체의 디지털화 (1993)",
    image: "static/download (1).jpeg",
  },
  {
    content:
      '2000년대 중반부터 타이포를 활용한 재밌는 실험들이 등장하기 시작했다. 실용적인 것부터 기괴한 것까지.<br> <a href="https://erikdemaine.org/fonts/">Mathematical and Puzzle Fonts/Typefaces (MIT EECS)</a>',
    contentType: "html",
    image: "static/image4.png",
  },
  {
    content: "Yeohyun Ahn (TYPE I)",
    image: "static/image5.png",
  },
];

// 공통 함수들

// 메시지 포매팅 함수
function formatMessage(message) {
  if (!message) return "";
  return message.replace(/\n/g, "<br>");
}

// 쓰로틀링 함수
function throttle(func, delay) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
}

// 디바운싱 함수
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

// 랜덤 숫자 생성 함수
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 위치 생성 함수
function getRandomPosition(
  containerWidth = window.innerWidth,
  containerHeight = window.innerHeight,
  elementWidth = 150,
  elementHeight = 50,
  padding = 20
) {
  const maxX = containerWidth - elementWidth - padding;
  const maxY = containerHeight - elementHeight - padding;
  return {
    x: Math.max(padding, Math.floor(Math.random() * maxX)),
    y: Math.max(padding, Math.floor(Math.random() * maxY)),
  };
}

// 요소 생성 헬퍼 함수
function createElement(tag, className = "", textContent = "", attributes = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });

  return element;
}

// 슬라이드 렌더링 헬퍼 함수
function createSlideElement(slide, index) {
  const slideElement = createElement("div", "slide-content");
  slideElement.dataset.slideIndex = index;

  // title이 있을 경우에만 추가
  if (slide.title) {
    const titleElement = createElement("h2", "", slide.title);
    slideElement.appendChild(titleElement);
  }

  // content가 있을 경우에만 추가
  if (slide.content) {
    const contentElement = createElement("div");
    // contentType을 확인하여 HTML 여부 결정
    if (slide.contentType === "html") {
      contentElement.innerHTML = slide.content;
    } else {
      contentElement.innerHTML = formatMessage(slide.content);
    }
    slideElement.appendChild(contentElement);
  }

  // 이미지 추가
  if (slide.image) {
    const imageElement = createElement("img", "", "", {
      src: slide.image,
      alt: slide.title || "Slide " + (index + 1),
    });
    imageElement.style.maxWidth = "100%";
    imageElement.style.maxHeight = "300px";
    slideElement.appendChild(imageElement);
  }

  return slideElement;
}

// 빈 슬라이드 생성 함수
function createEmptySlideElement(index) {
  const emptyElement = createElement("div", "slide-content empty-slide");
  emptyElement.dataset.slideIndex = index;
  emptyElement.innerHTML =
    '<div class="empty-slide-text">슬라이드 ' + (index + 1) + "</div>";
  return emptyElement;
}

// 로컬 스토리지 헬퍼 함수 (브라우저 환경에서만 사용)
const storage = {
  get: function (key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.warn("localStorage get error:", e);
      return defaultValue;
    }
  },

  set: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("localStorage set error:", e);
      return false;
    }
  },

  remove: function (key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn("localStorage remove error:", e);
      return false;
    }
  },
};

// URL 파라미터 헬퍼 함수
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// 클립보드 복사 함수
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("클립보드 복사 실패:", err);
    // 폴백: 텍스트 선택 방식
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

// 이미지 로드 확인 함수
function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

// 전체 화면 토글 함수
function toggleFullscreen(element = document.documentElement) {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      console.error("전체화면 전환 실패:", err);
    });
  } else {
    document.exitFullscreen();
  }
}

// 키보드 이벤트 핸들링을 위한 키 코드 매핑
const KEYBOARD_KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  SPACE: " ",
  ENTER: "Enter",
  ESCAPE: "Escape",
  HOME: "Home",
  END: "End",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
};

// TypeLab 전용 설정
const TYPELAB_CONFIG = {
  PRESENTATION_MODE: "presenter",
  VIEWER_MODE: "viewer",
  DEFAULT_TRANSITION_DURATION: 500,
  SCROLL_THROTTLE_DELAY: 100,
  ASCII_ART_COUNT: { min: 8, max: 15 },
  PARTICIPANT_COLORS: [
    "rgba(251, 0, 255, 0.8)",
    "rgba(0, 255, 255, 0.8)",
    "rgba(255, 255, 0, 0.8)",
    "rgba(255, 0, 128, 0.8)",
    "rgba(128, 255, 0, 0.8)",
  ],
};

// 전역에서 사용할 수 있도록 window 객체에 할당 (브라우저 환경에서만)
if (typeof window !== "undefined") {
  window.SLIDES = SLIDES;
  window.formatMessage = formatMessage;
  window.throttle = throttle;
  window.debounce = debounce;
  window.getRandomNumber = getRandomNumber;
  window.getRandomPosition = getRandomPosition;
  window.createElement = createElement;
  window.createSlideElement = createSlideElement;
  window.createEmptySlideElement = createEmptySlideElement;
  window.storage = storage;
  window.getURLParameter = getURLParameter;
  window.copyToClipboard = copyToClipboard;
  window.imageExists = imageExists;
  window.toggleFullscreen = toggleFullscreen;
  window.KEYBOARD_KEYS = KEYBOARD_KEYS;
  window.TYPELAB_CONFIG = TYPELAB_CONFIG;
}
