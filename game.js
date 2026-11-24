/**
 * Logika Permainan 15 Level Lengkap untuk Anak Tunagrahita
 * Fitur:
 * - Touch & Mouse Drag and Drop (Pointer Events API) + Tap fallback
 * - Checklist visual interaktif untuk instruksi banyak kalimat
 * - Perbaikan Suara Umpan Balik: Tuntas, tidak terpotong saat transisi soal
 * - Efek audio positif lembut
 */

const gameLevelsConfig = [
  // --- LEVEL 1-10 (Fondasi Bertahap) ---
  {
    level: 1,
    title: "Sentuh Objek",
    desc: "1 aksi langsung",
    icon: "👆",
    color: "#4F46E5",
    questions: [
      { type: "touch", instruction: "Sentuh buah apel", icon: "🍎", name: "Apel" },
      { type: "touch", instruction: "Sentuh bola sepak", icon: "⚽", name: "Bola" }
    ]
  },
  {
    level: 2,
    title: "Pilih dari 2 Benda",
    desc: "Diskriminasi dasar",
    icon: "🎯",
    color: "#0D9488",
    questions: [
      {
        type: "choose",
        instruction: "Pilih buah pisang",
        correct: { icon: "🍌", name: "Pisang" },
        distractors: [{ icon: "🍎", name: "Apel" }]
      },
      {
        type: "choose",
        instruction: "Pilih mobil",
        correct: { icon: "🚗", name: "Mobil" },
        distractors: [{ icon: "🚲", name: "Sepeda" }]
      }
    ]
  },
  {
    level: 3,
    title: "Pilih dari 3 Benda",
    desc: "Fokus objek di antara 3 pilihan",
    icon: "🔍",
    color: "#0284C7",
    questions: [
      {
        type: "choose",
        instruction: "Pilih kucing lucu",
        correct: { icon: "🐱", name: "Kucing" },
        distractors: [{ icon: "🐶", name: "Anjing" }, { icon: "🐰", name: "Kelinci" }]
      },
      {
        type: "choose",
        instruction: "Pilih buku tulis",
        correct: { icon: "📖", name: "Buku" },
        distractors: [{ icon: "✏️", name: "Pensil" }, { icon: "🎒", name: "Tas" }]
      }
    ]
  },
  {
    level: 4,
    title: "Tarik ke Keranjang",
    desc: "Drag 1 benda ke keranjang",
    icon: "🧺",
    color: "#059669",
    questions: [
      {
        type: "drag_single",
        instruction: "Tarik pisang ke dalam keranjang",
        targetContainer: { id: "basket", icon: "🧺", label: "Keranjang" },
        targetItem: { id: "banana", icon: "🍌", name: "Pisang" },
        distractors: [{ id: "apple", icon: "🍎", name: "Apel" }]
      },
      {
        type: "drag_single",
        instruction: "Tarik bola ke dalam keranjang",
        targetContainer: { id: "basket", icon: "🧺", label: "Keranjang" },
        targetItem: { id: "ball", icon: "⚽", name: "Bola" },
        distractors: [{ id: "book", icon: "📖", name: "Buku" }]
      }
    ]
  },
  {
    level: 5,
    title: "Pilih Berdasarkan Warna",
    desc: "Instruksi atribut warna",
    icon: "🎨",
    color: "#D97706",
    questions: [
      {
        type: "choose",
        instruction: "Pilih bintang warna kuning",
        correct: { icon: "⭐", name: "Bintang Kuning" },
        distractors: [{ icon: "🔵", name: "Lingkaran Biru" }, { icon: "🔴", name: "Lingkaran Merah" }]
      },
      {
        type: "choose",
        instruction: "Pilih hati warna merah",
        correct: { icon: "❤️", name: "Hati Merah" },
        distractors: [{ icon: "💚", name: "Hati Hijau" }, { icon: "💙", name: "Hati Biru" }]
      }
    ]
  },
  {
    level: 6,
    title: "Pilah 2 Wadah",
    desc: "Kelompokkan ke wadah yang tepat",
    icon: "📦",
    color: "#7C3AED",
    questions: [
      {
        type: "drag_categorize",
        instruction: "Masukkan apel ke keranjang buah",
        containers: [
          { id: "fruit_box", icon: "🧺", label: "Keranjang Buah", accepts: "apple" },
          { id: "toy_box", icon: "📦", label: "Kotak Mainan", accepts: "car" }
        ],
        activeItem: { id: "apple", icon: "🍎", name: "Apel" },
        distractorItems: [{ id: "car", icon: "🚗", name: "Mobil" }]
      },
      {
        type: "drag_categorize",
        instruction: "Masukkan mobil ke kotak mainan",
        containers: [
          { id: "fruit_box", icon: "🧺", label: "Keranjang Buah", accepts: "apple" },
          { id: "toy_box", icon: "📦", label: "Kotak Mainan", accepts: "car" }
        ],
        activeItem: { id: "car", icon: "🚗", name: "Mobil" },
        distractorItems: [{ id: "apple", icon: "🍎", name: "Apel" }]
      }
    ]
  },
  {
    level: 7,
    title: "Instruksi Urutan 2 Aksi",
    desc: "Sentuh A lalu sentuh B secara berurutan",
    icon: "1️⃣",
    color: "#DB2777",
    questions: [
      {
        type: "sequence_tap",
        instructionSummary: "Pertama sentuh topi, lalu sentuh sepatu",
        steps: [
          { text: "Langkah 1: Sentuh topi", targetId: "hat" },
          { text: "Langkah 2: Sekarang sentuh sepatu", targetId: "shoes" }
        ],
        items: [
          { id: "hat", icon: "🧢", name: "Topi" },
          { id: "shoes", icon: "👟", name: "Sepatu" },
          { id: "shirt", icon: "👕", name: "Baju" }
        ]
      }
    ]
  },
  {
    level: 8,
    title: "Urutan Tarik 2 Benda",
    desc: "Masukkan 2 benda bergantian",
    icon: "2️⃣",
    color: "#E11D48",
    questions: [
      {
        type: "sequence_drag",
        instructionSummary: "Masukkan apel ke keranjang, lalu masukkan pisang",
        container: { id: "basket", icon: "🧺", label: "Keranjang" },
        steps: [
          { text: "Langkah 1: Masukkan apel ke keranjang", targetId: "apple" },
          { text: "Langkah 2: Masukkan pisang ke keranjang", targetId: "banana" }
        ],
        items: [
          { id: "apple", icon: "🍎", name: "Apel" },
          { id: "banana", icon: "🍌", name: "Pisang" },
          { id: "soccer", icon: "⚽", name: "Bola" }
        ]
      }
    ]
  },
  {
    level: 9,
    title: "Tugas Bertingkat: Piring & Buah",
    desc: "Ambil piring ke meja, lalu isi mangga",
    icon: "🍽️",
    color: "#B45309",
    questions: [
      {
        type: "nested_task",
        steps: [
          {
            text: "Langkah 1: Ambil piring dan letakkan di atas meja",
            type: "place_base",
            targetItemId: "plate",
            targetAreaId: "table",
            hint: "Tarik atau sentuh piring untuk ditaruh di meja"
          },
          {
            text: "Langkah 2: Hebat! Sekarang taruh mangga di atas piring",
            type: "place_inside",
            targetItemId: "mango",
            targetAreaId: "plate_on_table",
            hint: "Tarik atau sentuh mangga ke piring di atas meja"
          }
        ],
        baseItems: [
          { id: "plate", icon: "🍽️", name: "Piring" },
          { id: "bowl", icon: "🥣", name: "Mangkuk" }
        ],
        nestedItems: [
          { id: "mango", icon: "🥭", name: "Mangga" },
          { id: "cookie", icon: "🍪", name: "Kue" }
        ]
      }
    ]
  },
  {
    level: 10,
    title: "Tugas Mandiri: Siap Sekolah",
    desc: "Merapikan alat ke dalam tas",
    icon: "🎒",
    color: "#4338CA",
    questions: [
      {
        type: "nested_task",
        steps: [
          {
            text: "Langkah 1: Taruh tas sekolah di atas meja",
            type: "place_base",
            targetItemId: "bag",
            targetAreaId: "table",
            hint: "Pindahkan tas ke meja terlebih dahulu"
          },
          {
            text: "Langkah 2: Bagus! Sekarang masukkan buku ke dalam tas",
            type: "place_inside",
            targetItemId: "book",
            targetAreaId: "bag_on_table",
            hint: "Masukkan buku belajar ke dalam tas"
          }
        ],
        baseItems: [
          { id: "bag", icon: "🎒", name: "Tas Sekolah" },
          { id: "box", icon: "📦", name: "Kardus" }
        ],
        nestedItems: [
          { id: "book", icon: "📖", name: "Buku Pelajaran" },
          { id: "toy", icon: "🧸", name: "Boneka" }
        ]
      }
    ]
  },

  // --- LEVEL 11 - 15 (Instruksi Majemuk, Banyak Kalimat, & Nested Task Menantang) ---
  {
    level: 11,
    title: "Instruksi Rangkaian 3 Aksi",
    desc: "Tiga perintah berturut-turut dalam satu alur cerita",
    icon: "3️⃣",
    color: "#0891B2",
    questions: [
      {
        type: "multi_step_sequence",
        instructionStory: "Pagi ini kita berolahraga. Pertama sentuh sepatu. Setelah itu sentuh baju olahraga. Terakhir sentuh botol air minum.",
        steps: [
          { text: "1. Sentuh sepatu olahragamu", targetId: "shoes" },
          { text: "2. Sekarang sentuh baju olahragamu", targetId: "shirt" },
          { text: "3. Terakhir sentuh botol air minummu", targetId: "bottle" }
        ],
        items: [
          { id: "shoes", icon: "👟", name: "Sepatu" },
          { id: "shirt", icon: "👕", name: "Baju" },
          { id: "bottle", icon: "🧴", name: "Botol Air" },
          { id: "hat", icon: "🧢", name: "Topi" }
        ]
      }
    ]
  },
  {
    level: 12,
    title: "Pilah 2 Benda ke Wadah Berbeda",
    desc: "Instruksi ganda: benda A ke wadah 1, benda B ke wadah 2",
    icon: "🗂️",
    color: "#059669",
    questions: [
      {
        type: "dual_container_drag",
        instructionStory: "Ayo bantu merapikan ruangan. Masukkan mobil mainan ke dalam kotak mainan. Kemudian, masukkan buah apel ke dalam keranjang buah.",
        containers: [
          { id: "toy_box", icon: "📦", label: "Kotak Mainan" },
          { id: "fruit_box", icon: "🧺", label: "Keranjang Buah" }
        ],
        steps: [
          { text: "1. Masukkan mobil ke kotak mainan", itemId: "car", targetContainerId: "toy_box" },
          { text: "2. Sekarang masukkan apel ke keranjang buah", itemId: "apple", targetContainerId: "fruit_box" }
        ],
        items: [
          { id: "car", icon: "🚗", name: "Mobil" },
          { id: "apple", icon: "🍎", name: "Apel" },
          { id: "book", icon: "📖", name: "Buku" }
        ]
      }
    ]
  },
  {
    level: 13,
    title: "Instruksi Syarat & Pengecualian",
    desc: "Memahami aturan instruksi bersyarat / memilih yang benar",
    icon: "⚠️",
    color: "#D97706",
    questions: [
      {
        type: "conditional_task",
        instructionStory: "Hari ini matahari bersinar sangat terik. Pilihlah topi untuk melindungi kepala dari panas. Ingat, jangan sentuh jaket tebal karena hari tidak hujan.",
        steps: [
          { text: "Tarik topi pelindung kepala ke dalam lemari", itemId: "hat", targetId: "wardrobe" }
        ],
        targetContainer: { id: "wardrobe", icon: "🚪", label: "Lemari" },
        items: [
          { id: "hat", icon: "🧢", name: "Topi", isCorrect: true },
          { id: "jacket", icon: "🧥", name: "Jaket Tebal", isCorrect: false, forbidMsg: "Jangan pilih jaket, cuaca sedang panas terik!" },
          { id: "umbrella", icon: "☂️", name: "Payung Hujan", isCorrect: false, forbidMsg: "Hari ini cerah, tidak perlu payung." }
        ]
      }
    ]
  },
  {
    level: 14,
    title: "Sarapan Pagi Bertingkat (Nested)",
    desc: "Ambil piring ke meja, isi roti, lalu taruh susu",
    icon: "🥪",
    color: "#BE123C",
    questions: [
      {
        type: "nested_multi",
        instructionStory: "Waktunya sarapan pagi bersama. Pertama, ambil piring dan taruh di meja makan. Kedua, taruh roti di atas piring. Terakhir, letakkan susu di sebelah piring.",
        steps: [
          { text: "1. Taruh piring di atas meja makan", itemId: "plate", targetZone: "table_surface" },
          { text: "2. Taruh roti di atas piring", itemId: "bread", targetZone: "on_plate" },
          { text: "3. Terakhir, letakkan susu di atas meja makan", itemId: "milk", targetZone: "table_surface" }
        ],
        availableItems: [
          { id: "plate", icon: "🍽️", name: "Piring" },
          { id: "bread", icon: "🍞", name: "Roti" },
          { id: "milk", icon: "🥛", name: "Susu" },
          { id: "pot", icon: "🍲", name: "Panci" }
        ]
      }
    ]
  },
  {
    level: 15,
    title: "Merapikan Kamar Lengkap (Tugas Kompleks)",
    desc: "Instruksi multi-langkah: baju ke lemari, buku ke meja, sampah ke tong",
    icon: "🏆",
    color: "#4338CA",
    questions: [
      {
        type: "room_cleanup_nested",
        instructionStory: "Kamar kita masih berantakan sekali. Ayo bersihkan bersama. Pertama, masukkan baju ke lemari pakaian. Kedua, letakkan buku belajar di atas meja belajar. Ketiga, buang bungkus sampah ke dalam tempat sampah.",
        containers: [
          { id: "wardrobe", icon: "🚪", label: "Lemari Pakaian" },
          { id: "study_desk", icon: "🪑", label: "Meja Belajar" },
          { id: "trash_bin", icon: "🗑️", label: "Tempat Sampah" }
        ],
        steps: [
          { text: "1. Masukkan baju ke lemari pakaian", itemId: "shirt", targetContainerId: "wardrobe" },
          { text: "2. Letakkan buku di atas meja belajar", itemId: "book", targetContainerId: "study_desk" },
          { text: "3. Buang sampah ke tempat sampah", itemId: "trash", targetContainerId: "trash_bin" }
        ],
        items: [
          { id: "shirt", icon: "👕", name: "Baju" },
          { id: "book", icon: "📖", name: "Buku" },
          { id: "trash", icon: "📦", name: "Sampah Kotak" },
          { id: "shoe", icon: "👟", name: "Sepatu" }
        ]
      }
    ]
  }
];

// State Aplikasi
let currentLevelNumber = 1;
let currentQuestionIndex = 0;
let currentStepIndex = 0;
let isAudioEnabled = true;
let isProcessing = false;
let unlockInputTimer = null;

// DOM Referensi
const viewMenu = document.getElementById("viewMenu");
const viewGame = document.getElementById("viewGame");
const levelGrid = document.getElementById("levelGrid");
const btnHome = document.getElementById("btnHome");
const btnVoiceToggle = document.getElementById("btnVoiceToggle");
const levelLabel = document.getElementById("levelLabel");
const stepProgressLabel = document.getElementById("stepProgressLabel");
const progressLabel = document.getElementById("progressLabel");
const instructionText = document.getElementById("instructionText");
const btnSpeakInstruction = document.getElementById("btnSpeakInstruction");
const gamePlayArea = document.getElementById("gamePlayArea");
const feedbackBanner = document.getElementById("feedbackBanner");
const successModal = document.getElementById("successModal");
const btnRepeatLevel = document.getElementById("btnRepeatLevel");
const btnNextLevel = document.getElementById("btnNextLevel");

// Web Audio API untuk nada lembut
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(type) {
  if (!isAudioEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'step') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.25);
    } else if (type === 'tryAgain') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(349.23, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
}

// ================= SUARA TEXT-TO-SPEECH =================
function stopAllSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function speakText(text) {
  if (!isAudioEnabled || !('speechSynthesis' in window)) return;

  const cleanText = text.replace(/Langkah \d+:|\d+\./gi, '').trim();
  if (!cleanText) return;

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.85; // Tempo santai & artikulasi jelas
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
    if (idVoice) utterance.voice = idVoice;

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech synthesis error:", e);
  }
}

function speakInstructionWithProtection(text) {
  const wordCount = (text || "").split(/\s+/).filter(Boolean).length;
  const estimatedDurationMs = isAudioEnabled ? Math.min(6000, Math.max(1400, (wordCount * 450) + 600)) : 100;

  isProcessing = true;
  speakText(text);

  if (unlockInputTimer) clearTimeout(unlockInputTimer);
  unlockInputTimer = setTimeout(() => {
    isProcessing = false;
  }, estimatedDurationMs);
}

// Event Listeners Navigasi
btnHome.addEventListener("click", () => {
  viewGame.classList.remove("active");
  viewMenu.classList.add("active");
  successModal.classList.remove("active");
  if (unlockInputTimer) clearTimeout(unlockInputTimer);
  stopAllSpeech();
});

btnVoiceToggle.addEventListener("click", () => {
  isAudioEnabled = !isAudioEnabled;
  btnVoiceToggle.innerText = isAudioEnabled ? "🔊 Suara: Nyala" : "🔇 Suara: Mati";
  if (!isAudioEnabled) stopAllSpeech();
});

btnSpeakInstruction.addEventListener("click", () => {
  const textToRead = instructionText.innerText || "";
  speakInstructionWithProtection(textToRead);
});

btnRepeatLevel.addEventListener("click", () => {
  successModal.classList.remove("active");
  if (unlockInputTimer) clearTimeout(unlockInputTimer);
  stopAllSpeech();
  startLevel(currentLevelNumber);
});

btnNextLevel.addEventListener("click", () => {
  successModal.classList.remove("active");
  if (unlockInputTimer) clearTimeout(unlockInputTimer);
  stopAllSpeech();
  if (currentLevelNumber < 15) {
    startLevel(currentLevelNumber + 1);
  } else {
    viewGame.classList.remove("active");
    viewMenu.classList.add("active");
  }
});

// Render Menu 15 Level
function renderLevelMenu() {
  levelGrid.innerHTML = "";
  gameLevelsConfig.forEach(lvl => {
    const card = document.createElement("button");
    card.className = "level-card";
    card.innerHTML = `
      <span class="level-num-badge" style="background-color: ${lvl.color}">Tingkat ${lvl.level}</span>
      <span class="level-icon">${lvl.icon}</span>
      <h3>${lvl.title}</h3>
      <p>${lvl.desc}</p>
    `;
    card.addEventListener("click", () => startLevel(lvl.level));
    levelGrid.appendChild(card);
  });
}

// Memulai Level
function startLevel(lvlNumber) {
  currentLevelNumber = lvlNumber;
  currentQuestionIndex = 0;
  currentStepIndex = 0;
  if (unlockInputTimer) clearTimeout(unlockInputTimer);
  stopAllSpeech();

  viewMenu.classList.remove("active");
  viewGame.classList.add("active");
  successModal.classList.remove("active");

  renderCurrentQuestion();
}

// Helper Render Checklist Langkah untuk Level 11 - 15
function renderChecklist(steps, currentIdx) {
  let checklistHtml = '<div class="checklist-container">';
  steps.forEach((st, idx) => {
    let statusClass = "";
    let icon = "⚪";
    if (idx < currentIdx) {
      statusClass = "done-step";
      icon = "✅";
    } else if (idx === currentIdx) {
      statusClass = "active-step";
      icon = "👉";
    }
    checklistHtml += `<div class="checklist-item ${statusClass}">${icon} <span>${st.text}</span></div>`;
  });
  checklistHtml += '</div>';
  return checklistHtml;
}

// Render Soal Sesuai Level
function renderCurrentQuestion() {
  clearFeedback();

  const currentLevelData = gameLevelsConfig.find(l => l.level === currentLevelNumber);
  const qData = currentLevelData.questions[currentQuestionIndex];
  const totalQuestions = currentLevelData.questions.length;

  levelLabel.innerText = `Tingkat ${currentLevelNumber}`;
  progressLabel.innerText = `Soal ${currentQuestionIndex + 1}/${totalQuestions}`;
  gamePlayArea.innerHTML = "";

  // LEVEL 1: Sentuh Objek
  if (qData.type === "touch") {
    stepProgressLabel.style.display = "none";
    setInstruction(qData.instruction);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    const item = createGameItem(qData.icon, qData.name, () => {
      if (isProcessing) return;
      isProcessing = true;
      triggerSuccess(`Hebat!`);
    });
    itemsContainer.appendChild(item);
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 2, 3, 5: Memilih Opsi
  else if (qData.type === "choose") {
    stepProgressLabel.style.display = "none";
    setInstruction(qData.instruction);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    const allOptions = [
      { ...qData.correct, isCorrect: true },
      ...qData.distractors.map(d => ({ ...d, isCorrect: false }))
    ].sort(() => Math.random() - 0.5);

    allOptions.forEach(opt => {
      const item = createGameItem(opt.icon, opt.name, () => {
        if (isProcessing) return;
        if (opt.isCorrect) {
          isProcessing = true;
          triggerSuccess(`Bagus sekali!`);
        } else {
          triggerEncourage(`Ayo coba lagi, cari ${qData.correct.name}`);
        }
      });
      itemsContainer.appendChild(item);
    });
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 4: Drag Tunggal
  else if (qData.type === "drag_single") {
    stepProgressLabel.style.display = "none";
    setInstruction(qData.instruction);

    const targetsContainer = document.createElement("div");
    targetsContainer.className = "targets-container";
    const basket = createDropTarget(qData.targetContainer.id, qData.targetContainer.icon, qData.targetContainer.label);
    targetsContainer.appendChild(basket);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    const allItems = [
      { ...qData.targetItem, isTarget: true },
      ...qData.distractors.map(d => ({ ...d, isTarget: false }))
    ].sort(() => Math.random() - 0.5);

    allItems.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        handleItemDroppedOnTarget(itemData, itemEl, basket, qData);
      });
      enableTouchAndMouseDrag(itemEl, basket, () => {
        handleItemDroppedOnTarget(itemData, itemEl, basket, qData);
      });
      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(targetsContainer);
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 6: Pilah 2 Wadah
  else if (qData.type === "drag_categorize") {
    stepProgressLabel.style.display = "none";
    setInstruction(qData.instruction);

    const targetsContainer = document.createElement("div");
    targetsContainer.className = "targets-container";
    const targetElements = [];
    qData.containers.forEach(c => {
      const targetEl = createDropTarget(c.id, c.icon, c.label);
      targetEl.dataset.accepts = c.accepts;
      targetsContainer.appendChild(targetEl);
      targetElements.push(targetEl);
    });

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    const allItems = [
      { ...qData.activeItem, isTarget: true },
      ...qData.distractorItems.map(d => ({ ...d, isTarget: false }))
    ].sort(() => Math.random() - 0.5);

    allItems.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        const match = qData.containers.find(c => c.accepts === itemData.id);
        const targetEl = targetElements.find(t => t.dataset.targetId === match.id);
        handleCategorizeDrop(itemData, itemEl, targetEl, qData);
      });
      enableTouchAndMouseDragToMultiple(itemEl, targetElements, (droppedTarget) => {
        handleCategorizeDrop(itemData, itemEl, droppedTarget, qData);
      });
      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(targetsContainer);
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 7: Urutan 2 Aksi Sentuh
  else if (qData.type === "sequence_tap") {
    stepProgressLabel.style.display = "inline-block";
    updateSequenceStepDisplay(qData);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    qData.items.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        if (isProcessing) return;
        const currentExpectedStep = qData.steps[currentStepIndex];
        if (itemData.id === currentExpectedStep.targetId) {
          playTone('step');
          itemEl.style.transform = "scale(1.15)";
          itemEl.style.borderColor = "#10B981";
          itemEl.style.pointerEvents = "none";

          currentStepIndex++;
          if (currentStepIndex < qData.steps.length) {
            triggerEncourage(`Bagus!`);
            setTimeout(() => {
              updateSequenceStepDisplay(qData);
            }, 1200);
          } else {
            isProcessing = true;
            triggerSuccess("Hebat! Benar semua!");
          }
        } else {
          triggerEncourage(`Belum tepat.`);
        }
      });
      itemsContainer.appendChild(itemEl);
    });
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 8: Urutan Tarik 2 Benda
  else if (qData.type === "sequence_drag") {
    stepProgressLabel.style.display = "inline-block";
    updateSequenceDragStepDisplay(qData);

    const targetsContainer = document.createElement("div");
    targetsContainer.className = "targets-container";
    const basket = createDropTarget(qData.container.id, qData.container.icon, qData.container.label);
    targetsContainer.appendChild(basket);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";
    qData.items.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        handleSequenceDragAction(itemData, itemEl, basket, qData);
      });
      enableTouchAndMouseDrag(itemEl, basket, () => {
        handleSequenceDragAction(itemData, itemEl, basket, qData);
      });
      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(targetsContainer);
    gamePlayArea.appendChild(itemsContainer);
  }

  // LEVEL 9 & 10: Nested Task Dasar
  else if (qData.type === "nested_task") {
    renderNestedTaskLevel(qData);
  }

  // ================= LEVEL 11: RANGKAIAN 3 AKSI (3 KALIMAT INSTRUKSI) =================
  else if (qData.type === "multi_step_sequence") {
    stepProgressLabel.style.display = "inline-block";
    stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari ${qData.steps.length}`;

    const currentStep = qData.steps[currentStepIndex];
    instructionText.innerHTML = `<strong>${qData.instructionStory}</strong>` + renderChecklist(qData.steps, currentStepIndex);
    
    if (currentStepIndex === 0) {
      speakInstructionWithProtection(qData.instructionStory);
    } else {
      speakInstructionWithProtection(currentStep.text);
    }

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";

    qData.items.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        if (isProcessing) return;
        if (itemData.id === currentStep.targetId) {
          playTone('step');
          itemEl.style.transform = "scale(1.1)";
          itemEl.style.borderColor = "#10B981";
          itemEl.style.pointerEvents = "none";

          currentStepIndex++;
          if (currentStepIndex < qData.steps.length) {
            triggerEncourage(`Pintar!`);
            setTimeout(() => {
              renderCurrentQuestion();
            }, 1200);
          } else {
            isProcessing = true;
            triggerSuccess("Luar biasa!");
          }
        } else {
          triggerEncourage(`Belum tepat.`);
        }
      });
      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(itemsContainer);
  }

  // ================= LEVEL 12: PILAH 2 BENDA KE 2 WADAH (MULTI-KALIMAT) =================
  else if (qData.type === "dual_container_drag") {
    stepProgressLabel.style.display = "inline-block";
    stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari ${qData.steps.length}`;

    const currentStep = qData.steps[currentStepIndex];
    instructionText.innerHTML = `<strong>${qData.instructionStory}</strong>` + renderChecklist(qData.steps, currentStepIndex);
    
    if (currentStepIndex === 0) {
      speakInstructionWithProtection(qData.instructionStory);
    } else {
      speakInstructionWithProtection(currentStep.text);
    }

    const targetsContainer = document.createElement("div");
    targetsContainer.className = "targets-container";
    const targetElements = [];

    qData.containers.forEach(c => {
      const tEl = createDropTarget(c.id, c.icon, c.label);
      targetsContainer.appendChild(tEl);
      targetElements.push(tEl);
    });

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";

    qData.items.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        const dest = targetElements.find(t => t.dataset.targetId === currentStep.targetContainerId);
        handleDualContainerAction(itemData, itemEl, dest, qData);
      });

      enableTouchAndMouseDragToMultiple(itemEl, targetElements, (droppedTarget) => {
        handleDualContainerAction(itemData, itemEl, droppedTarget, qData);
      });

      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(targetsContainer);
    gamePlayArea.appendChild(itemsContainer);
  }

  // ================= LEVEL 13: INSTRUKSI SYARAT & PENGECUALIAN =================
  else if (qData.type === "conditional_task") {
    stepProgressLabel.style.display = "inline-block";
    stepProgressLabel.innerText = "Instruksi Aturan";

    instructionText.innerHTML = `<strong>${qData.instructionStory}</strong>`;
    speakInstructionWithProtection(qData.instructionStory);

    const targetsContainer = document.createElement("div");
    targetsContainer.className = "targets-container";
    const wardrobe = createDropTarget(qData.targetContainer.id, qData.targetContainer.icon, qData.targetContainer.label);
    targetsContainer.appendChild(wardrobe);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "items-container";

    qData.items.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        handleConditionalAction(itemData, itemEl, wardrobe, qData);
      });

      enableTouchAndMouseDrag(itemEl, wardrobe, () => {
        handleConditionalAction(itemData, itemEl, wardrobe, qData);
      });

      itemsContainer.appendChild(itemEl);
    });

    gamePlayArea.appendChild(targetsContainer);
    gamePlayArea.appendChild(itemsContainer);
  }

  // ================= LEVEL 14: SARAPAN PAGI BERTINGKAT (NESTED 3 LANGKAH) =================
  else if (qData.type === "nested_multi") {
    renderNestedMultiLevel(qData);
  }

  // ================= LEVEL 15: MERAPIKAN KAMAR LENGKAP (3 WADAH & 3 KALIMAT) =================
  else if (qData.type === "room_cleanup_nested") {
    renderRoomCleanupLevel(qData);
  }
}

// Logika Level 12 (Dual Container)
function handleDualContainerAction(itemData, itemEl, droppedTarget, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[currentStepIndex];

  if (itemData.id === currentStep.itemId && droppedTarget.dataset.targetId === currentStep.targetContainerId) {
    playTone('step');
    droppedTarget.classList.add("highlight-hover");
    const contents = droppedTarget.querySelector(".target-contents");
    if (contents) contents.innerText += " " + itemData.icon;
    itemEl.style.display = "none";

    currentStepIndex++;
    if (currentStepIndex < qData.steps.length) {
      triggerEncourage("Bagus sekali!");
      setTimeout(() => {
        renderCurrentQuestion();
      }, 1200);
    } else {
      isProcessing = true;
      triggerSuccess("Sempurna!");
    }
  } else {
    triggerEncourage(`Belum tepat.`);
  }
}

// Logika Level 13 (Syarat & Pengecualian)
function handleConditionalAction(itemData, itemEl, wardrobe, qData) {
  if (isProcessing) return;
  if (itemData.isCorrect) {
    isProcessing = true;
    playTone('success');
    wardrobe.classList.add("highlight-hover");
    const contents = wardrobe.querySelector(".target-contents");
    if (contents) contents.innerText = itemData.icon;
    itemEl.style.display = "none";
    triggerSuccess("Pintar!");
  } else {
    triggerEncourage(itemData.forbidMsg || "Bukan benda itu.");
  }
}

// Render Level 14: Sarapan Pagi (Nested 3 Langkah)
function renderNestedMultiLevel(qData) {
  stepProgressLabel.style.display = "inline-block";
  stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari 3`;

  const currentStep = qData.steps[currentStepIndex];
  instructionText.innerHTML = `<strong>${qData.instructionStory}</strong>` + renderChecklist(qData.steps, currentStepIndex);
  
  if (currentStepIndex === 0) {
    speakInstructionWithProtection(qData.instructionStory);
  } else {
    speakInstructionWithProtection(currentStep.text);
  }

  const nestedWrapper = document.createElement("div");
  nestedWrapper.className = "nested-workspace";

  // Meja Makan
  const table = document.createElement("div");
  table.className = "table-surface";
  table.id = "diningTable";
  table.innerHTML = `
    <span class="table-title">🍽️ Meja Makan</span>
    <div id="tableZone" class="target-contents" style="gap: 12px; align-items: center;"></div>
  `;
  nestedWrapper.appendChild(table);

  const tableZone = table.querySelector("#tableZone");
  let plateElement = null;

  if (currentStepIndex >= 1) {
    tableZone.innerHTML = `
      <div id="plateOnTable" class="drop-target" style="min-width: 130px; min-height: 110px; border-color: #059669; background: #DCFCE7;">
        <span class="target-icon">🍽️</span>
        <span class="target-label">Piring</span>
        <div id="plateFoodZone" class="target-contents"></div>
      </div>
    `;
    plateElement = table.querySelector("#plateOnTable");
  }

  if (currentStepIndex === 2 && plateElement) {
    const foodZone = plateElement.querySelector("#plateFoodZone");
    if (foodZone) foodZone.innerText = "🍞";
  }

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items-container";

  qData.availableItems.forEach(itemData => {
    if (currentStepIndex >= 1 && itemData.id === "plate") return;
    if (currentStepIndex >= 2 && itemData.id === "bread") return;

    const itemEl = createGameItem(itemData.icon, itemData.name, () => {
      handleNestedMultiAction(itemData, itemEl, table, plateElement, qData);
    });

    const dropTarget = (currentStep.targetZone === "on_plate") ? plateElement : table;
    enableTouchAndMouseDrag(itemEl, dropTarget, () => {
      handleNestedMultiAction(itemData, itemEl, table, plateElement, qData);
    });

    itemsContainer.appendChild(itemEl);
  });

  nestedWrapper.appendChild(itemsContainer);
  gamePlayArea.appendChild(nestedWrapper);
}

function handleNestedMultiAction(itemData, itemEl, table, plateElement, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[currentStepIndex];

  if (itemData.id === currentStep.itemId) {
    playTone('step');
    itemEl.style.transform = "scale(0.3)";
    itemEl.style.opacity = "0";

    currentStepIndex++;
    if (currentStepIndex < qData.steps.length) {
      triggerEncourage("Hebat!");
      setTimeout(() => {
        renderCurrentQuestion();
      }, 1200);
    } else {
      isProcessing = true;
      triggerSuccess("Luar biasa!");
    }
  } else {
    triggerEncourage(`Belum tepat.`);
  }
}

// Render Level 15: Merapikan Kamar Lengkap (3 Wadah Berbeda & 3 Kalimat Instruksi)
function renderRoomCleanupLevel(qData) {
  stepProgressLabel.style.display = "inline-block";
  stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari 3`;

  const currentStep = qData.steps[currentStepIndex];
  instructionText.innerHTML = `<strong>${qData.instructionStory}</strong>` + renderChecklist(qData.steps, currentStepIndex);
  
  if (currentStepIndex === 0) {
    speakInstructionWithProtection(qData.instructionStory);
  } else {
    speakInstructionWithProtection(currentStep.text);
  }

  const targetsContainer = document.createElement("div");
  targetsContainer.className = "targets-container";
  const targetElements = [];

  qData.containers.forEach(c => {
    const tEl = createDropTarget(c.id, c.icon, c.label);
    targetsContainer.appendChild(tEl);
    targetElements.push(tEl);
  });

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items-container";

  qData.items.forEach(itemData => {
    if (qData.steps.slice(0, currentStepIndex).some(s => s.itemId === itemData.id)) {
      return;
    }

    const itemEl = createGameItem(itemData.icon, itemData.name, () => {
      const dest = targetElements.find(t => t.dataset.targetId === currentStep.targetContainerId);
      handleRoomCleanupDrop(itemData, itemEl, dest, qData);
    });

    enableTouchAndMouseDragToMultiple(itemEl, targetElements, (droppedTarget) => {
      handleRoomCleanupDrop(itemData, itemEl, droppedTarget, qData);
    });

    itemsContainer.appendChild(itemEl);
  });

  gamePlayArea.appendChild(targetsContainer);
  gamePlayArea.appendChild(itemsContainer);
}

function handleRoomCleanupDrop(itemData, itemEl, droppedTarget, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[currentStepIndex];

  if (itemData.id === currentStep.itemId && droppedTarget.dataset.targetId === currentStep.targetContainerId) {
    playTone('step');
    droppedTarget.classList.add("highlight-hover");
    const contents = droppedTarget.querySelector(".target-contents");
    if (contents) contents.innerText += " " + itemData.icon;
    itemEl.style.display = "none";

    currentStepIndex++;
    if (currentStepIndex < qData.steps.length) {
      triggerEncourage("Bagus!");
      setTimeout(() => {
        renderCurrentQuestion();
      }, 1200);
    } else {
      isProcessing = true;
      triggerSuccess("Hebat luar biasa!");
    }
  } else {
    triggerEncourage(`Belum tepat.`);
  }
}

// Logika Level 9 & 10 (Nested Task 2 Langkah)
function renderNestedTaskLevel(qData) {
  stepProgressLabel.style.display = "inline-block";
  const stepData = qData.steps[currentStepIndex];
  stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari 2`;
  setInstruction(stepData.text);

  const nestedWrapper = document.createElement("div");
  nestedWrapper.className = "nested-workspace";

  const table = document.createElement("div");
  table.className = "table-surface";
  table.id = "mainTable";
  table.innerHTML = `
    <span class="table-title">🪑 Area Meja</span>
    <div id="tableDropZone" class="target-contents"></div>
  `;
  nestedWrapper.appendChild(table);

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "items-container";

  if (currentStepIndex === 0) {
    qData.baseItems.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        handleNestedStep1(itemData, itemEl, table, qData);
      });
      enableTouchAndMouseDrag(itemEl, table, () => {
        handleNestedStep1(itemData, itemEl, table, qData);
      });
      itemsContainer.appendChild(itemEl);
    });
  } else if (currentStepIndex === 1) {
    const targetBase = qData.baseItems.find(b => b.id === qData.steps[0].targetItemId);
    const dropZone = table.querySelector("#tableDropZone");
    dropZone.innerHTML = `
      <div id="plateOnTable" class="drop-target" style="min-width: 130px; min-height: 110px; border-color: #059669; background: #DCFCE7;">
        <span class="target-icon">${targetBase.icon}</span>
        <span class="target-label">${targetBase.name} di Meja</span>
        <div id="plateContent" class="target-contents"></div>
      </div>
    `;

    const activePlate = table.querySelector("#plateOnTable");
    qData.nestedItems.forEach(itemData => {
      const itemEl = createGameItem(itemData.icon, itemData.name, () => {
        handleNestedStep2(itemData, itemEl, activePlate, qData);
      });
      enableTouchAndMouseDrag(itemEl, activePlate, () => {
        handleNestedStep2(itemData, itemEl, activePlate, qData);
      });
      itemsContainer.appendChild(itemEl);
    });
  }

  nestedWrapper.appendChild(itemsContainer);
  gamePlayArea.appendChild(nestedWrapper);
}

function handleNestedStep1(itemData, itemEl, table, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[0];
  if (itemData.id === currentStep.targetItemId) {
    isProcessing = true;
    playTone('step');
    table.classList.add("highlight-hover");
    itemEl.style.transform = "scale(0.3) translateY(-100px)";
    itemEl.style.opacity = "0";

    triggerEncourage(`Pintar!`);
    setTimeout(() => {
      currentStepIndex = 1;
      isProcessing = false;
      renderCurrentQuestion();
    }, 1300);
  } else {
    triggerEncourage(`Bukan ${itemData.name}.`);
  }
}

function handleNestedStep2(itemData, itemEl, plate, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[1];
  if (itemData.id === currentStep.targetItemId) {
    isProcessing = true;
    itemEl.style.transform = "scale(0.3)";
    itemEl.style.opacity = "0";
    const plateContent = plate.querySelector("#plateContent");
    if (plateContent) plateContent.innerText = itemData.icon;
    triggerSuccess(`Sempurna!`);
  } else {
    triggerEncourage(`Bukan ${itemData.name}.`);
  }
}

// Handler Drop Dasar
function handleItemDroppedOnTarget(itemData, itemEl, basket, qData) {
  if (isProcessing) return;
  if (itemData.isTarget) {
    isProcessing = true;
    playTone('success');
    basket.classList.add("highlight-hover");
    const contents = basket.querySelector(".target-contents");
    if (contents) contents.innerText = itemData.icon;
    itemEl.style.display = "none";
    triggerSuccess(`Bagus sekali!`);
  } else {
    triggerEncourage(`Itu ${itemData.name}.`);
  }
}

function handleCategorizeDrop(itemData, itemEl, targetEl, qData) {
  if (isProcessing) return;
  if (targetEl.dataset.accepts === itemData.id) {
    isProcessing = true;
    playTone('success');
    targetEl.classList.add("highlight-hover");
    const contents = targetEl.querySelector(".target-contents");
    if (contents) contents.innerText = itemData.icon;
    itemEl.style.display = "none";
    triggerSuccess(`Hebat!`);
  } else {
    triggerEncourage(`Belum tepat.`);
  }
}

function handleSequenceDragAction(itemData, itemEl, basket, qData) {
  if (isProcessing) return;
  const currentStep = qData.steps[currentStepIndex];
  if (itemData.id === currentStep.targetId) {
    playTone('step');
    basket.classList.add("highlight-hover");
    const contents = basket.querySelector(".target-contents");
    if (contents) contents.innerText += " " + itemData.icon;
    itemEl.style.display = "none";

    currentStepIndex++;
    if (currentStepIndex < qData.steps.length) {
      triggerEncourage(`Pintar!`);
      setTimeout(() => {
        updateSequenceDragStepDisplay(qData);
        basket.classList.remove("highlight-hover");
      }, 1200);
    } else {
      isProcessing = true;
      triggerSuccess(`Luar biasa!`);
    }
  } else {
    triggerEncourage(`Belum tepat.`);
  }
}

function updateSequenceStepDisplay(qData) {
  stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari ${qData.steps.length}`;
  setInstruction(qData.steps[currentStepIndex].text);
}

function updateSequenceDragStepDisplay(qData) {
  stepProgressLabel.innerText = `Langkah ${currentStepIndex + 1} dari ${qData.steps.length}`;
  setInstruction(qData.steps[currentStepIndex].text);
}

// Helper Buat Elemen
function createGameItem(icon, name, onClick) {
  const btn = document.createElement("button");
  btn.className = "game-item";
  btn.innerHTML = `
    <span class="item-icon">${icon}</span>
    <span class="item-name">${name}</span>
  `;
  btn.setAttribute("aria-label", name);

  btn.addEventListener("click", (e) => {
    if (btn.dataset.wasDragged === "true") {
      delete btn.dataset.wasDragged;
      return;
    }
    onClick(e);
  });
  return btn;
}

function createDropTarget(id, icon, label) {
  const target = document.createElement("div");
  target.className = "drop-target";
  target.dataset.targetId = id;
  target.innerHTML = `
    <span class="target-icon">${icon}</span>
    <span class="target-label">${label}</span>
    <div class="target-contents"></div>
  `;
  return target;
}

function setInstruction(text) {
  instructionText.innerText = text;
  speakInstructionWithProtection(text);
}

// Drag & Drop Pointer Events (Touch Android & Mouse)
function enableTouchAndMouseDrag(itemEl, targetEl, onDropCallback) {
  let isDragging = false;
  let startX, startY, origX = 0, origY = 0;

  itemEl.addEventListener("pointerdown", (e) => {
    if (isProcessing) return;
    isDragging = true;
    itemEl.setPointerCapture(e.pointerId);
    itemEl.classList.add("touch-held");
    startX = e.clientX;
    startY = e.clientY;
    origX = 0;
    origY = 0;
  });

  itemEl.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    origX = dx;
    origY = dy;
    itemEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`;

    if (isOverlapping(itemEl, targetEl)) {
      targetEl.classList.add("highlight-hover");
    } else {
      targetEl.classList.remove("highlight-hover");
    }
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    itemEl.classList.remove("touch-held");
    targetEl.classList.remove("highlight-hover");

    if (Math.abs(origX) > 15 || Math.abs(origY) > 15) {
      itemEl.dataset.wasDragged = "true";
    }

    if (isOverlapping(itemEl, targetEl)) {
      itemEl.style.transform = "";
      onDropCallback(targetEl);
    } else {
      itemEl.style.transition = "transform 0.2s ease";
      itemEl.style.transform = "translate(0px, 0px)";
      setTimeout(() => {
        itemEl.style.transition = "";
      }, 200);
    }
  };

  itemEl.addEventListener("pointerup", endDrag);
  itemEl.addEventListener("pointercancel", endDrag);
}

function enableTouchAndMouseDragToMultiple(itemEl, targetElements, onDropCallback) {
  let isDragging = false;
  let startX, startY, origX = 0, origY = 0;

  itemEl.addEventListener("pointerdown", (e) => {
    if (isProcessing) return;
    isDragging = true;
    itemEl.setPointerCapture(e.pointerId);
    itemEl.classList.add("touch-held");
    startX = e.clientX;
    startY = e.clientY;
    origX = 0;
    origY = 0;
  });

  itemEl.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    origX = dx;
    origY = dy;
    itemEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`;

    targetElements.forEach(targetEl => {
      if (isOverlapping(itemEl, targetEl)) {
        targetEl.classList.add("highlight-hover");
      } else {
        targetEl.classList.remove("highlight-hover");
      }
    });
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    itemEl.classList.remove("touch-held");

    if (Math.abs(origX) > 15 || Math.abs(origY) > 15) {
      itemEl.dataset.wasDragged = "true";
    }

    const hitTarget = targetElements.find(targetEl => isOverlapping(itemEl, targetEl));
    targetElements.forEach(t => t.classList.remove("highlight-hover"));

    if (hitTarget) {
      itemEl.style.transform = "";
      onDropCallback(hitTarget);
    } else {
      itemEl.style.transition = "transform 0.2s ease";
      itemEl.style.transform = "translate(0px, 0px)";
      setTimeout(() => {
        itemEl.style.transition = "";
      }, 200);
    }
  };

  itemEl.addEventListener("pointerup", endDrag);
  itemEl.addEventListener("pointercancel", endDrag);
}

function isOverlapping(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

// Umpan Balik Positif
function triggerSuccess(msg) {
  playTone('success');
  feedbackBanner.innerText = "⭐ " + msg;
  feedbackBanner.className = "feedback-banner show success";
  speakText(msg);

  // Berikan waktu cukup (1,4 detik) agar ucapan pujian selesai diucapkan tuntas
  setTimeout(() => {
    const currentLevelData = gameLevelsConfig.find(l => l.level === currentLevelNumber);
    currentStepIndex = 0;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentLevelData.questions.length) {
      renderCurrentQuestion();
    } else {
      finishCurrentLevel();
    }
  }, 1400);
}

function triggerEncourage(hint) {
  playTone('tryAgain');
  feedbackBanner.innerText = "💡 " + hint;
  feedbackBanner.className = "feedback-banner show encourage";
  speakText(hint);

  setTimeout(() => {
    clearFeedback();
  }, 1200);
}

function clearFeedback() {
  feedbackBanner.className = "feedback-banner";
  feedbackBanner.innerText = "";
}

function finishCurrentLevel() {
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  modalTitle.innerText = `Luar Biasa! Tingkat ${currentLevelNumber} Selesai!`;
  modalDesc.innerText = "Kamu sudah belajar memahami kalimat instruksi yang panjang dengan sangat hebat.";

  if (currentLevelNumber >= 15) {
    btnNextLevel.innerText = "🎉 Selesai Semua 15 Tingkat!";
  } else {
    btnNextLevel.innerText = `Lanjut Tingkat ${currentLevelNumber + 1} ➔`;
  }

  successModal.classList.add("active");
  playTone('success');
  speakText("Luar biasa sekali! Kamu berhasil menyelesaikan semua instruksi di tingkat ini.");
}

// Render Menu Level Awal
window.addEventListener("DOMContentLoaded", () => {
  renderLevelMenu();
});
