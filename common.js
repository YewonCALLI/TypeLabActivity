const SLIDES = [
  {
    title: "오늘의 온도",
    content: "오늘은 2025년 7월 4일입니다. 각자의 온도를 알려주세요. (0도에서 10도 사이의 숫자)",
    contentType: "html",
    image: "assets/image0.jpg"
  },
  {
    title: "웹사이트란 무엇일까?"
  },
  {
    title: "웹사이트란 무엇일까?",
    content:
      '웹사이트는 컴퓨터에 저장된 여러 파일이 들어 있는 폴더와 같다.',
    contentType: "html",
    image: "assets/image1.png",
  },
  {
    content: "웹사이트는 내 컴퓨터에 있을 수도 있지만, 보통은 '서버'라고 불리는 항상 켜져 있는 컴퓨터에 저장됩니다.",
    image: "assets/image2.jpg",
  },
  {
    title:
      "서버가 인터넷에서 어디에 있는지는 'IP 주소'라는 네 개의 숫자로 표현됩니다.",
    contentType: "html",
    image: "assets/image3.png",
  },
  {
    title: "이런 숫자들을 다 외우긴 힘들겠죠?",
    content: 'DNS라는 서비스는 우리가 google.com처럼 쉽게 기억할 수 있는 주소를 입력하면, 그것을 해당 페이지가 있는 서버의 실제 주소(IP 주소)로 바꿔줍니다.',
    image: "assets/image4.jpg",
  },
  {
    title: "웹사이트를 만드는 데 꼭 이걸 이해할 필요는 없지만, 알고 있으면 도움이 됩니다. 다시 파일 이야기로 돌아가 봅시다."
  },
  {
    title: "웹사이트를 만드는 데 가장 기본이 되는 파일은 HTML 파일",
    content:"이 파일은 HTML이라는 언어로 작성됩니다.",
    contentType: "html",
    image: "assets/image5.png",
  },
  {
    title: "그럼 HTML 파일은 무엇일까요?",
    content:"HTML은 HyperText Markup Language의 약자로, 웹 페이지의 구조를 정의하는 언어입니다. HTML 파일은 웹 페이지의 내용을 구성하는 텍스트, 이미지, 링크 등을 포함합니다.",
    contentType: "html",
    image: "assets/image6.png",
  },
  {
    title:"HTML은 웹 브라우저에 화면에 무엇을 어떻게 보여줄지 지시하는 '마크업 언어', 즉 일종의 시각적 지시 언어입니다."
  },
  {
    image: "assets/image7.png"
  },
  {
    title: '웹 브라우저란?',
    content: "웹 브라우저는 HTML 파일을 읽고, 그 내용을 화면에 표시해주는 프로그램입니다. 우리가 웹사이트를 볼 때 사용하는 Chrome, Firefox, Safari 등이 웹 브라우저입니다.",
    contentType: "html",
    image: "assets/image8.png",
  },
  {
    title: "다음 시간에는 ^^한용파 선생님^^의 도움으로 HTML 파일을 직접 만들어 볼 거예요.",
    content: "HTML 파일을 만드는 것은 웹사이트를 만드는 첫걸음입니다.",
    contentType: "html",
    image: "assets/image9.png"
  },
  {
    title: "그럼 오늘 뭐하냐구요?",
    content: "오늘은 우리가 알고 있는 웹사이트를 공유하고 서로의 웹사이트를 탐험해 볼 거예요.",
    contentType: "html",
    image: "assets/image10.jpg"
  },
  {
    title: "재밌는 웹사이트를 찾을 수 있는 곳",
    content: '<a href="https://gossipsweb.net/" target="_blank">GossipsWeb</a><br><a href="https://thehtml.review/04/" target="_blank">The HTML Review</a><br><a href="https://www.naiveweekly.com/" target="_blank">Naive Weekly</a><br><a href="https://theuselessweb.com/">The Useless Web</a><br> <a href="https://anthology.rhizome.org/natural-process">Rhizome Net Art Anthology(1984-2019)</a><br><a href="https://web.archive.org/">Wayback Machine</a><br><a href="https://cyberfeminismindex.com/">Cyberfeminisim Index</a>',
    contentType: "html",
  },
  {
    title: "웹은 자유의 공간??",
    content: '<a href="https://www.watching-grass-grow.com/">Watching Grass Grow</a><br><a href="https://motherfuckingwebsite.com/">Motherf***ing Website</a><br><a href="https://palestineonline.net/?site=jerusalem-i-love-you">Palestine Online</a>',
    contentType: "html",
  },
  { 
    content: "<iframe src='https://padlet.com/typelabkr/0604-y7bao34tczxuzg2n' width='1200px' frameborder='0' allowfullscreen></iframe>",
    contentType: "html",
  }
];

function formatMessage(message) {
  if (!message) return "";
  return message.replace(/\n/g, "<br>");
}

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
    imageElement.style.maxHeight = "500px";
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
