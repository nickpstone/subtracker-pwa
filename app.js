/**
 * SubTracker — Progressive Web App
 * Basketball & Sports Rotation Management System
 */

(function () {
  'use strict';

  // ==========================================
  // Sport Presets Definition
  // ==========================================
  const SPORT_PRESETS = {
    'Basketball': {
      teamName: 'Bullets',
      playersOnField: 5,
      periodMinutes: 10,
      totalPeriods: 4,
      periodName: 'Quarter',
      sampleTeam: [
        { name: 'Mitch Norton', jersey: '8', isStarter: true },
        { name: 'Nate Hinton', jersey: '4', isStarter: true },
        { name: 'Sam McDaniel', jersey: '26', isStarter: true },
        { name: 'Jaylin Williams', jersey: '2', isStarter: true },
        { name: 'Tyrell Harrison', jersey: '24', isStarter: true },
        { name: 'Arnas Velicka', jersey: '1', isStarter: false },
        { name: 'Taine Murray', jersey: '0', isStarter: false },
        { name: 'Max Mackinnon', jersey: '3', isStarter: false },
        { name: 'Joshua Duach', jersey: '5', isStarter: false },
        { name: 'Archie Woodhill', jersey: '6', isStarter: false },
        { name: 'Billy McRae', jersey: '10', isStarter: false },
        { name: 'Lat Mayen', jersey: '11', isStarter: false },
        { name: 'Rio Bruton', jersey: '13', isStarter: false },
        { name: 'Harry Rouhliadeff', jersey: '14', isStarter: false },
        { name: 'Jacob Holt', jersey: '15', isStarter: false }
      ]
    },
    'Soccer (11-a-side)': {
      playersOnField: 11,
      periodMinutes: 45,
      totalPeriods: 2,
      periodName: 'Half',
      sampleTeam: [
        { name: 'Alisson', jersey: '1', isStarter: true },
        { name: 'Alexander-Arnold', jersey: '66', isStarter: true },
        { name: 'Van Dijk', jersey: '4', isStarter: true },
        { name: 'Konate', jersey: '5', isStarter: true },
        { name: 'Robertson', jersey: '26', isStarter: true },
        { name: 'Mac Allister', jersey: '10', isStarter: true },
        { name: 'Szoboszlai', jersey: '8', isStarter: true },
        { name: 'Jones', jersey: '17', isStarter: true },
        { name: 'Salah', jersey: '11', isStarter: true },
        { name: 'Nunez', jersey: '9', isStarter: true },
        { name: 'Diaz', jersey: '7', isStarter: true },
        { name: 'Gakpo', jersey: '18', isStarter: false },
        { name: 'Elliott', jersey: '19', isStarter: false },
        { name: 'Endo', jersey: '3', isStarter: false }
      ]
    },
    'Soccer 7s / Mini': {
      playersOnField: 7,
      periodMinutes: 25,
      totalPeriods: 2,
      periodName: 'Half',
      sampleTeam: [
        { name: 'Alex Morgan', jersey: '13', isStarter: true },
        { name: 'Megan Rapinoe', jersey: '15', isStarter: true },
        { name: 'Rose Lavelle', jersey: '16', isStarter: true },
        { name: 'Julie Ertz', jersey: '8', isStarter: true },
        { name: 'Becky Sauerbrunn', jersey: '4', isStarter: true },
        { name: 'Crystal Dunn', jersey: '19', isStarter: true },
        { name: 'Alyssa Naeher', jersey: '1', isStarter: true },
        { name: 'Sophia Smith', jersey: '11', isStarter: false },
        { name: 'Trinity Rodman', jersey: '2', isStarter: false },
        { name: 'Lindsey Horan', jersey: '10', isStarter: false }
      ]
    },
    'Netball': {
      playersOnField: 7,
      periodMinutes: 15,
      totalPeriods: 4,
      periodName: 'Quarter',
      sampleTeam: [
        { name: 'Goal Shooter (GS)', jersey: '1', isStarter: true },
        { name: 'Goal Attack (GA)', jersey: '2', isStarter: true },
        { name: 'Wing Attack (WA)', jersey: '3', isStarter: true },
        { name: 'Centre (C)', jersey: '4', isStarter: true },
        { name: 'Wing Defence (WD)', jersey: '5', isStarter: true },
        { name: 'Goal Defence (GD)', jersey: '6', isStarter: true },
        { name: 'Goal Keeper (GK)', jersey: '7', isStarter: true },
        { name: 'Reserve 1', jersey: '8', isStarter: false },
        { name: 'Reserve 2', jersey: '9', isStarter: false }
      ]
    },
    'Futsal': {
      playersOnField: 5,
      periodMinutes: 20,
      totalPeriods: 2,
      periodName: 'Half',
      sampleTeam: [
        { name: 'GK', jersey: '1', isStarter: true },
        { name: 'Fixo', jersey: '3', isStarter: true },
        { name: 'Ala Left', jersey: '7', isStarter: true },
        { name: 'Ala Right', jersey: '11', isStarter: true },
        { name: 'Pivo', jersey: '9', isStarter: true },
        { name: 'Sub 1', jersey: '10', isStarter: false },
        { name: 'Sub 2', jersey: '14', isStarter: false }
      ]
    },
    'Custom': {
      playersOnField: 5,
      periodMinutes: 20,
      totalPeriods: 2,
      periodName: 'Period',
      sampleTeam: [
        { name: 'Player 1', jersey: '1', isStarter: true },
        { name: 'Player 2', jersey: '2', isStarter: true },
        { name: 'Player 3', jersey: '3', isStarter: true },
        { name: 'Player 4', jersey: '4', isStarter: true },
        { name: 'Player 5', jersey: '5', isStarter: true },
        { name: 'Sub 1', jersey: '6', isStarter: false },
        { name: 'Sub 2', jersey: '7', isStarter: false }
      ]
    }
  };

  // ==========================================
  // Application State
  // ==========================================
  const state = {
    matchState: 'notStarted', // 'notStarted' | 'running' | 'paused' | 'ended'
    matchSettings: {
      sport: 'Basketball',
      maxActivePlayers: 5,
      periodDurationMinutes: 10,
      totalPeriods: 4,
      maxPersonalFouls: 5,
      teamName: 'Bullets'
    },
    currentPeriod: 1,
    periodElapsedSeconds: 0,
    totalMatchElapsedSeconds: 0,
    players: [],
    events: [],
    
    // UI state
    undoSubstitution: null,
    selectedPlayerId: null,
    activeFilter: 'all', // 'all' | 'onCourt' | 'bench'
    selectedSwapOutId: null,
    selectedSwapInId: null,
    soundEnabled: true,
    wakeLockActive: false,
    
    // Runtime references
    timerInterval: null,
    lastTickTimestamp: null,
    wakeLockSentinel: null,
    audioCtx: null,
    periodExpiredAlerted: false
  };

  // ==========================================
  // Helper Utilities
  // ==========================================
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function formatDuration(seconds) {
    const s = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function getPeriodName() {
    const preset = SPORT_PRESETS[state.matchSettings.sport] || SPORT_PRESETS['Custom'];
    return preset.periodName;
  }

  // Audio / Sound synthesizer using Web Audio API
  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      if (!state.audioCtx) {
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }

      const now = state.audioCtx.currentTime;

      if (type === 'whistle' || type === 'buzzer') {
        // Dual-tone referee whistle / court horn
        const osc1 = state.audioCtx.createOscillator();
        const osc2 = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(880, now);
        osc2.frequency.setValueAtTime(1174.66, now); // D6

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(state.audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.9);
        osc2.stop(now + 0.9);
      } else if (type === 'sub') {
        // High click / chime for sub actions
        const osc = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  function triggerHaptic(pattern = [30, 40, 30]) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore haptic errors on unsupported devices
      }
    }
  }

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.replaceChildren(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Screen Wake Lock API
  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        state.wakeLockSentinel = await navigator.wakeLock.request('screen');
        state.wakeLockActive = true;
        updateWakeLockUI();
        state.wakeLockSentinel.addEventListener('release', () => {
          state.wakeLockActive = false;
          updateWakeLockUI();
        });
      } catch (err) {
        console.warn('Wake lock error:', err);
      }
    }
  }

  function releaseWakeLock() {
    if (state.wakeLockSentinel) {
      state.wakeLockSentinel.release().catch(() => {});
      state.wakeLockSentinel = null;
      state.wakeLockActive = false;
      updateWakeLockUI();
    }
  }

  function updateWakeLockUI() {
    const btn = document.getElementById('btn-wakelock');
    if (!btn) return;
    if (state.wakeLockActive) {
      btn.classList.add('active');
      btn.title = 'Screen will stay awake during game (Tap to release)';
    } else {
      btn.classList.remove('active');
      btn.title = 'Keep screen awake during game (Tap to activate)';
    }
  }

  // ==========================================
  // Player Calculations
  // ==========================================
  function playerCurrentStint(player, now = Date.now()) {
    if (player.status === 'playing') {
      if (player.currentShiftStart) {
        return Math.max(0, (now - player.currentShiftStart) / 1000);
      }
      return 0;
    } else {
      if (player.currentBenchStart) {
        return Math.max(0, (now - player.currentBenchStart) / 1000);
      }
      return 0;
    }
  }

  function playerTotalPlayTime(player, now = Date.now()) {
    let total = player.accumulatedPlayTime || 0;
    if (player.status === 'playing' && player.currentShiftStart) {
      total += Math.max(0, (now - player.currentShiftStart) / 1000);
    }
    return total;
  }

  function playerTotalBenchTime(player, now = Date.now()) {
    let total = player.accumulatedBenchTime || 0;
    if (player.status !== 'playing' && player.currentBenchStart) {
      total += Math.max(0, (now - player.currentBenchStart) / 1000);
    }
    return total;
  }

  function playerDisplayName(player) {
    if (player.jerseyNumber && String(player.jerseyNumber).trim() !== '') {
      return `#${player.jerseyNumber} ${player.name}`;
    }
    return player.name;
  }

  function getActivePlayers() {
    return state.players.filter(p => p.status === 'playing');
  }

  function getBenchPlayers() {
    return state.players.filter(p => p.status !== 'playing');
  }

  // ==========================================
  // Storage & State Persistence
  // ==========================================
  const STORAGE_KEY = 'subtracker_saved_state_v1';

  function saveState() {
    try {
      const serializableState = {
        matchState: state.matchState,
        matchSettings: state.matchSettings,
        currentPeriod: state.currentPeriod,
        periodElapsedSeconds: state.periodElapsedSeconds,
        totalMatchElapsedSeconds: state.totalMatchElapsedSeconds,
        players: state.players,
        events: state.events,
        soundEnabled: state.soundEnabled,
        lastSavedTimestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableState));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.players)) return false;

      state.matchState = data.matchState || 'notStarted';
      state.matchSettings = Object.assign({}, state.matchSettings, data.matchSettings);
      state.currentPeriod = data.currentPeriod || 1;
      state.periodElapsedSeconds = data.periodElapsedSeconds || 0;
      state.totalMatchElapsedSeconds = data.totalMatchElapsedSeconds || 0;
      state.players = data.players || [];
      state.events = data.events || [];
      state.soundEnabled = data.soundEnabled !== false;

      // If app was running when closed, pause it gracefully on resume
      if (state.matchState === 'running') {
        commitActiveDurations(data.lastSavedTimestamp || Date.now());
        state.matchState = 'paused';
      }

      return true;
    } catch (e) {
      console.warn('Storage load failed:', e);
      return false;
    }
  }

  function clearSavedState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  // ==========================================
  // Roster Management Actions
  // ==========================================
  function addPlayer(name, jerseyNumber = null, isStarter = false) {
    const trimmed = (name || '').trim();
    if (!trimmed) return;

    const jersey = jerseyNumber ? String(jerseyNumber).trim().replace(/^#/, '') : null;

    const player = {
      id: generateUUID(),
      name: trimmed,
      jerseyNumber: jersey,
      status: 'bench',
      isStarter: Boolean(isStarter),
      timesOnField: 0,
      accumulatedPlayTime: 0,
      accumulatedBenchTime: 0,
      personalFouls: 0,
      currentShiftStart: null,
      currentBenchStart: null,
      shifts: []
    };

    state.players.push(player);
    saveState();
    render();
  }

  function removePlayer(id) {
    state.players = state.players.filter(p => p.id !== id);
    saveState();
    render();
  }

  function toggleStarter(id) {
    const player = state.players.find(p => p.id === id);
    if (!player) return;
    player.isStarter = !player.isStarter;
    saveState();
    render();
  }

  function autoAssignStarters() {
    const limit = state.matchSettings.maxActivePlayers;
    state.players.forEach((p, idx) => {
      p.isStarter = (idx < limit);
    });
  }

  function parseAndAddBulk(text) {
    const lines = text.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      const commaParts = line.split(/[,;]/).map(s => s.trim()).filter(Boolean);

      if (commaParts.length === 2) {
        const p0 = commaParts[0];
        const p1 = commaParts[1];
        const p0Digits = /^\#?\d{1,3}$/.test(p0);
        const p1Digits = /^\#?\d{1,3}$/.test(p1);

        if (p0Digits && !p1Digits) {
          addPlayer(p1, p0.replace('#', ''));
          continue;
        } else if (p1Digits && !p0Digits) {
          addPlayer(p0, p1.replace('#', ''));
          continue;
        }
      }

      if (commaParts.length > 1) {
        commaParts.forEach(part => parseSinglePlayerToken(part));
      } else {
        parseSinglePlayerToken(line);
      }
    }
    saveState();
    render();
  }

  function parseSinglePlayerToken(token) {
    token = token.trim();
    if (!token) return;

    let jersey = null;
    let name = token;

    // Pattern 1: Leading number: "#23 Michael" or "23 - Michael"
    const leadingMatch = token.match(/^(?:#)?(\d{1,3})\s*[-–—:]?\s*(.+)$/);
    if (leadingMatch) {
      jersey = leadingMatch[1];
      name = leadingMatch[2].trim();
    } else {
      // Pattern 2: Trailing number: "Michael #23" or "Michael 23"
      const trailingMatch = token.match(/^(.+?)\s*(?:[-–—:]\s*|\s+#?)(\d{1,3})$/);
      if (trailingMatch) {
        name = trailingMatch[1].trim();
        jersey = trailingMatch[2];
      }
    }

    if (name) {
      addPlayer(name, jersey);
    }
  }

  function loadSampleTeam() {
    const preset = SPORT_PRESETS[state.matchSettings.sport] || SPORT_PRESETS['Basketball'];
    state.players = [];
    if (preset.teamName) {
      state.matchSettings.teamName = preset.teamName;
      const inputTeam = document.getElementById('input-team-name');
      if (inputTeam) inputTeam.value = preset.teamName;
    }
    preset.sampleTeam.forEach(p => {
      addPlayer(p.name, p.jersey, p.isStarter);
    });
    saveState();
    render();
    showToast(`Loaded ${preset.sampleTeam.length} players for ${preset.teamName || state.matchSettings.sport}!`);
  }

  // ==========================================
  // Match Lifecycle Engine
  // ==========================================
  function startMatch() {
    if (state.players.length === 0) return;

    const now = Date.now();
    state.lastTickTimestamp = now;

    // If no starters selected, auto assign up to max
    const starterCount = state.players.filter(p => p.isStarter).length;
    if (starterCount === 0) {
      autoAssignStarters();
    }

    state.players.forEach(player => {
      if (player.isStarter) {
        player.status = 'playing';
        player.timesOnField = 1;
        player.currentShiftStart = now;
        player.currentBenchStart = null;
        logEvent('subIn', player);
      } else {
        player.status = 'bench';
        player.timesOnField = 0;
        player.currentShiftStart = null;
        player.currentBenchStart = now;
      }
    });

    state.matchState = 'running';
    state.periodExpiredAlerted = false;
    startClockTimer();
    requestWakeLock();
    playSound('whistle');
    triggerHaptic([50, 50, 50]);
    saveState();
    render();
  }

  function pauseMatch() {
    state.undoSubstitution = null;
    if (state.matchState !== 'running') return;
    const now = Date.now();
    stopClockTimer();
    commitActiveDurations(now);
    state.matchState = 'paused';
    playSound('sub');
    saveState();
    render();
  }

  function resumeMatch() {
    state.undoSubstitution = null;
    if (state.matchState !== 'paused') return;
    const now = Date.now();
    state.lastTickTimestamp = now;

    state.players.forEach(player => {
      if (player.status === 'playing') {
        player.currentShiftStart = now;
        player.currentBenchStart = null;
      } else {
        player.currentShiftStart = null;
        player.currentBenchStart = now;
      }
    });

    state.matchState = 'running';
    startClockTimer();
    requestWakeLock();
    playSound('whistle');
    saveState();
    render();
  }

  function nextPeriod() {
    state.undoSubstitution = null;
    if (state.matchState === 'running') {
      pauseMatch();
    }

    if (state.currentPeriod < state.matchSettings.totalPeriods) {
      state.currentPeriod += 1;
      state.periodElapsedSeconds = 0;
      state.periodExpiredAlerted = false;
      saveState();
      render();
      showToast(`Advanced to ${getPeriodName()} ${state.currentPeriod}`);
    } else {
      endMatch();
    }
  }

  function endMatch() {
    state.undoSubstitution = null;
    if (state.matchState === 'running') {
      commitActiveDurations(Date.now());
      stopClockTimer();
    }
    state.matchState = 'ended';
    releaseWakeLock();
    playSound('buzzer');
    triggerHaptic([100, 50, 100, 50, 200]);
    saveState();
    render();
  }

  function resetMatch() {
    state.undoSubstitution = null;
    stopClockTimer();
    releaseWakeLock();
    state.matchState = 'notStarted';
    state.currentPeriod = 1;
    state.periodElapsedSeconds = 0;
    state.totalMatchElapsedSeconds = 0;
    state.events = [];
    state.periodExpiredAlerted = false;

    state.players.forEach(player => {
      player.status = 'bench';
      player.timesOnField = 0;
      player.accumulatedPlayTime = 0;
      player.accumulatedBenchTime = 0;
      player.personalFouls = 0;
      player.currentShiftStart = null;
      player.currentBenchStart = null;
      player.shifts = [];
    });

    clearSavedState();
    saveState();
    render();
    showToast('Match reset to setup');
  }

  function startClockTimer() {
    stopClockTimer();
    state.timerInterval = setInterval(handleTimerTick, 1000);
  }

  function stopClockTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    state.lastTickTimestamp = null;
  }

  function handleTimerTick() {
    if (state.matchState !== 'running') return;
    const now = Date.now();
    const delta = state.lastTickTimestamp ? (now - state.lastTickTimestamp) / 1000 : 1;
    state.lastTickTimestamp = now;

    state.periodElapsedSeconds += delta;
    state.totalMatchElapsedSeconds += delta;

    // Check period expiration
    const targetPeriodSecs = state.matchSettings.periodDurationMinutes * 60;
    if (targetPeriodSecs > 0 && state.periodElapsedSeconds >= targetPeriodSecs && !state.periodExpiredAlerted) {
      state.periodExpiredAlerted = true;
      playSound('buzzer');
      triggerHaptic([200, 100, 200, 100, 400]);
      showToast(`${getPeriodName()} ${state.currentPeriod} time expired!`);
    }

    updateLiveTimersDOM();
  }

  function commitActiveDurations(now) {
    state.players.forEach(player => {
      if (player.status === 'playing') {
        if (player.currentShiftStart) {
          const duration = Math.max(0, (now - player.currentShiftStart) / 1000);
          player.accumulatedPlayTime = (player.accumulatedPlayTime || 0) + duration;
          player.shifts.push({
            id: generateUUID(),
            startTime: player.currentShiftStart,
            endTime: now
          });
        }
        player.currentShiftStart = null;
      } else {
        if (player.currentBenchStart) {
          const duration = Math.max(0, (now - player.currentBenchStart) / 1000);
          player.accumulatedBenchTime = (player.accumulatedBenchTime || 0) + duration;
        }
        player.currentBenchStart = null;
      }
    });
  }

  // ==========================================
  // Direct Substitution Actions
  // ==========================================
  function rememberSubstitution(players) {
    state.undoSubstitution = {
      players: JSON.parse(JSON.stringify(players)),
      eventIds: state.events.map(event => event.id)
    };
  }

  function undoSubstitution() {
    const previous = state.undoSubstitution;
    if (!previous || !['running', 'paused'].includes(state.matchState)) return;
    previous.players.forEach(saved => {
      const player = state.players.find(p => p.id === saved.id);
      // Foul edits made after the substitution must survive undo.
      const fouls = player.personalFouls;
      Object.assign(player, saved, { personalFouls: fouls });
    });
    state.events = state.events.filter(event => previous.eventIds.includes(event.id) ||
      !['swap', 'subIn', 'subOut'].includes(event.type));
    state.undoSubstitution = null;
    saveState();
    render();
    showToast('Substitution undone. Player times restored.');
  }

  function renderPlayerPanel() {
    const player = state.players.find(p => p.id === state.selectedPlayerId);
    if (!player) return;
    document.getElementById('player-panel-title').textContent = playerDisplayName(player);
    document.getElementById('player-panel-summary').textContent =
      `${player.status === 'playing' ? 'On court' : 'On bench'} · ${player.timesOnField} shifts · Played ${formatDuration(playerTotalPlayTime(player))} · Rested ${formatDuration(playerTotalBenchTime(player))}`;
    document.getElementById('player-panel-fouls').textContent = `${player.personalFouls || 0} / ${state.matchSettings.maxPersonalFouls}`;
    document.getElementById('btn-panel-foul-remove').disabled = !player.personalFouls;
    document.getElementById('btn-panel-sub').textContent = player.status === 'playing' ? 'Sub out without replacement' : 'Sub in without replacement';
  }

  function startPlayer(id) {
    const player = state.players.find(p => p.id === id);
    if (!player || player.status === 'playing') return;
    rememberSubstitution([player]);

    const now = Date.now();
    if (state.matchState === 'running') {
      if (player.currentBenchStart) {
        player.accumulatedBenchTime += Math.max(0, (now - player.currentBenchStart) / 1000);
      }
      player.currentShiftStart = now;
      player.currentBenchStart = null;
    }

    player.status = 'playing';
    player.timesOnField = (player.timesOnField || 0) + 1;

    logEvent('subIn', player);
    playSound('sub');
    triggerHaptic([40]);

    if (getActivePlayers().length > state.matchSettings.maxActivePlayers) {
      showToast(`⚠️ Warning: ${getActivePlayers().length} players on court! Max is ${state.matchSettings.maxActivePlayers}.`);
      triggerHaptic([100, 80, 100]);
    }

    saveState();
    render();
  }

  function stopPlayer(id) {
    const player = state.players.find(p => p.id === id);
    if (!player || player.status !== 'playing') return;
    rememberSubstitution([player]);

    const now = Date.now();
    if (state.matchState === 'running') {
      if (player.currentShiftStart) {
        const duration = Math.max(0, (now - player.currentShiftStart) / 1000);
        player.accumulatedPlayTime += duration;
        player.shifts.push({
          id: generateUUID(),
          startTime: player.currentShiftStart,
          endTime: now
        });
      }
      player.currentShiftStart = null;
      player.currentBenchStart = now;
    }

    player.status = 'bench';
    logEvent('subOut', player);
    playSound('sub');
    triggerHaptic([40]);

    saveState();
    render();
  }

  function swapPlayers(playerOutId, playerInId) {
    const playerOut = state.players.find(p => p.id === playerOutId);
    const playerIn = state.players.find(p => p.id === playerInId);

    if (!playerOut || !playerIn) return;
    if (playerOut.status !== 'playing' || playerIn.status === 'playing') return;
    rememberSubstitution([playerOut, playerIn]);

    const now = Date.now();

    // OUT Player
    if (state.matchState === 'running') {
      if (playerOut.currentShiftStart) {
        const duration = Math.max(0, (now - playerOut.currentShiftStart) / 1000);
        playerOut.accumulatedPlayTime += duration;
        playerOut.shifts.push({
          id: generateUUID(),
          startTime: playerOut.currentShiftStart,
          endTime: now
        });
      }
      playerOut.currentShiftStart = null;
      playerOut.currentBenchStart = now;
    }
    playerOut.status = 'bench';

    // IN Player
    if (state.matchState === 'running') {
      if (playerIn.currentBenchStart) {
        playerIn.accumulatedBenchTime += Math.max(0, (now - playerIn.currentBenchStart) / 1000);
      }
      playerIn.currentShiftStart = now;
      playerIn.currentBenchStart = null;
    }
    playerIn.status = 'playing';
    playerIn.timesOnField = (playerIn.timesOnField || 0) + 1;

    // Log Swap Event
    const event = {
      id: generateUUID(),
      timestamp: now,
      matchElapsedSeconds: state.totalMatchElapsedSeconds,
      type: 'swap',
      playerName: playerIn.name,
      jerseyNumber: playerIn.jerseyNumber,
      targetPlayerName: playerOut.name,
      targetJerseyNumber: playerOut.jerseyNumber,
      period: state.currentPeriod
    };
    state.events.unshift(event);

    playSound('sub');
    triggerHaptic([40, 30, 40]);
    showToast(`Swapped: ${playerInDisplayName(playerIn)} IN ⇄ ${playerInDisplayName(playerOut)} OUT`);

    saveState();
    render();
  }

  function playerInDisplayName(player) {
    return player.jerseyNumber ? `#${player.jerseyNumber} ${player.name}` : player.name;
  }

  function addPersonalFoul(id) {
    const player = state.players.find(p => p.id === id);
    if (!player) return;

    player.personalFouls = (player.personalFouls || 0) + 1;
    const maxFouls = state.matchSettings.maxPersonalFouls || 5;

    if (player.personalFouls >= maxFouls) {
      playSound('buzzer');
      triggerHaptic([150, 80, 150, 80, 300]);
      showToast(`🚨 ${playerDisplayName(player)} reached ${player.personalFouls} personal fouls and FOULED OUT!`);

      // Log Foul Out Event
      const event = {
        id: generateUUID(),
        timestamp: Date.now(),
        matchElapsedSeconds: state.totalMatchElapsedSeconds,
        type: 'foulOut',
        playerName: player.name,
        jerseyNumber: player.jerseyNumber,
        targetPlayerName: null,
        targetJerseyNumber: null,
        period: state.currentPeriod,
        foulCount: player.personalFouls
      };
      state.events.unshift(event);
    } else {
      playSound('sub');
      triggerHaptic([50]);
      const warningText = (player.personalFouls === maxFouls - 1) ? ' ⚠️ Foul Trouble!' : '';
      showToast(`${playerDisplayName(player)}: Personal Foul #${player.personalFouls} (${player.personalFouls}/${maxFouls})${warningText}`);

      // Log Foul Event
      const event = {
        id: generateUUID(),
        timestamp: Date.now(),
        matchElapsedSeconds: state.totalMatchElapsedSeconds,
        type: 'foul',
        playerName: player.name,
        jerseyNumber: player.jerseyNumber,
        targetPlayerName: null,
        targetJerseyNumber: null,
        period: state.currentPeriod,
        foulCount: player.personalFouls
      };
      state.events.unshift(event);
    }

    saveState();
    render();
  }

  function removePersonalFoul(id) {
    const player = state.players.find(p => p.id === id);
    if (!player) return;

    if ((player.personalFouls || 0) > 0) {
      player.personalFouls--;
      const maxFouls = state.matchSettings.maxPersonalFouls || 5;
      triggerHaptic([30]);
      showToast(`Removed foul from ${playerDisplayName(player)} (${player.personalFouls}/${maxFouls})`);
      saveState();
      render();
    }
  }

  function logEvent(type, player) {
    const event = {
      id: generateUUID(),
      timestamp: Date.now(),
      matchElapsedSeconds: state.totalMatchElapsedSeconds,
      type: type, // 'subIn' | 'subOut'
      playerName: player.name,
      jerseyNumber: player.jerseyNumber,
      targetPlayerName: null,
      targetJerseyNumber: null,
      period: state.currentPeriod
    };
    state.events.unshift(event);
  }

  // ==========================================
  // Smart Rotation Suggestions
  // ==========================================
  function getRotationRecommendation() {
    const now = Date.now();
    const active = getActivePlayers().sort((a, b) => playerCurrentStint(b, now) - playerCurrentStint(a, now));
    const benched = getBenchPlayers().sort((a, b) => playerCurrentStint(b, now) - playerCurrentStint(a, now));

    if (active.length > 0 && benched.length > 0) {
      const longestActive = active[0];
      const longestBenched = benched[0];
      const shiftDuration = playerCurrentStint(longestActive, now);

      if (shiftDuration >= 60) {
        return {
          outPlayer: longestActive,
          inPlayer: longestBenched,
          shiftDuration: shiftDuration,
          restDuration: playerCurrentStint(longestBenched, now)
        };
      }
    }
    return null;
  }

  // ==========================================
  // Report Generation & Export
  // ==========================================
  function generateCSVReport() {
    let csv = "Jersey,Player Name,Status,Times On,Personal Fouls,Total Played (MM:SS),Total Played (Seconds),Total Bench (MM:SS),Play Percentage (%)\n";
    const totalGame = Math.max(1, state.totalMatchElapsedSeconds);
    const now = Date.now();

    for (const player of state.players) {
      const jersey = player.jerseyNumber || '';
      const playTime = playerTotalPlayTime(player, now);
      const benchTime = playerTotalBenchTime(player, now);
      const percent = Math.min(100, (playTime / totalGame) * 100);
      const fouls = player.personalFouls || 0;

      const row = `"${jersey}","${player.name.replace(/"/g, '""')}","${player.status === 'playing' ? 'On Court' : 'On Bench'}",${player.timesOnField},${fouls},"${formatDuration(playTime)}",${Math.floor(playTime)},"${formatDuration(benchTime)}",${percent.toFixed(1)}\n`;
      csv += row;
    }
    return csv;
  }

  function downloadCSV() {
    const csv = generateCSVReport();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (state.matchSettings.teamName || 'SubTracker').replace(/\s+/g, '_');
    link.setAttribute('href', url);
    link.setAttribute('download', `SubTracker_${safeName}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded CSV report!');
  }

  function generateSummaryText() {
    let text = `📊 SubTracker Match Summary\n`;
    text += `Team: ${state.matchSettings.teamName}\n`;
    text += `Total Match Time: ${formatDuration(state.totalMatchElapsedSeconds)}\n`;
    text += `Periods Completed: ${state.currentPeriod}/${state.matchSettings.totalPeriods} (${getPeriodName()}s)\n`;
    text += `Total Substitutions: ${state.events.length}\n`;
    text += `------------------------------------\n`;
    text += `Player Breakdown:\n`;

    const totalGame = Math.max(1, state.totalMatchElapsedSeconds);
    const now = Date.now();
    const sorted = [...state.players].sort((a, b) => playerTotalPlayTime(b, now) - playerTotalPlayTime(a, now));

    sorted.forEach(p => {
      const playTime = playerTotalPlayTime(p, now);
      const pct = Math.min(100, (playTime / totalGame) * 100).toFixed(0);
      const jersey = p.jerseyNumber ? `#${p.jerseyNumber} ` : '';
      const fouls = p.personalFouls || 0;
      const foulTxt = fouls > 0 ? ` | ${fouls} Fouls` : '';
      text += `• ${jersey}${p.name}: Played ${formatDuration(playTime)} (${pct}%)${foulTxt} | Shifts: ${p.timesOnField}\n`;
    });

    return text;
  }

  async function shareSummary() {
    const text = generateSummaryText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${state.matchSettings.teamName} Match Summary`,
          text: text
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      showToast('Summary copied to clipboard!');
    } catch (e) {
      // Prompt modal fallback
      window.prompt('Copy summary text:', text);
    }
  }

  // ==========================================
  // DOM Rendering & UI Management
  // ==========================================
  function render() {
    const isLive = ['running', 'paused'].includes(state.matchState);
    document.body.classList.toggle('coach-live', isLive);
    document.getElementById('match-dock').style.display = isLive ? 'block' : 'none';
    document.getElementById('undo-bar').hidden = !state.undoSubstitution;
    document.getElementById('undo-description').textContent = state.undoSubstitution ? 'Last substitution · undo before changing the clock' : '';
    renderPlayerPanel();
    const viewSetup = document.getElementById('view-setup');
    const viewMatch = document.getElementById('view-match');
    const viewReport = document.getElementById('view-report');

    const btnOpenLog = document.getElementById('btn-open-log');
    const btnMatchMenu = document.getElementById('btn-match-menu');
    const headerTeamTitle = document.getElementById('header-team-title');

    // Header team title
    headerTeamTitle.textContent = state.matchSettings.teamName || 'SubTracker';

    // State view switcher
    if (state.matchState === 'notStarted') {
      viewSetup.style.display = 'flex';
      viewMatch.style.display = 'none';
      viewReport.style.display = 'none';
      btnOpenLog.style.display = 'none';
      btnMatchMenu.style.display = 'none';
      renderSetupView();
    } else if (state.matchState === 'running' || state.matchState === 'paused') {
      viewSetup.style.display = 'none';
      viewMatch.style.display = 'flex';
      viewReport.style.display = 'none';
      btnOpenLog.style.display = 'inline-flex';
      btnMatchMenu.style.display = 'inline-flex';
      renderMatchView();
    } else if (state.matchState === 'ended') {
      viewSetup.style.display = 'none';
      viewMatch.style.display = 'none';
      viewReport.style.display = 'flex';
      btnOpenLog.style.display = 'inline-flex';
      btnMatchMenu.style.display = 'none';
      renderReportView();
    }
  }

  // Render Setup View
  function renderSetupView() {
    document.getElementById('select-sport').value = state.matchSettings.sport;
    document.getElementById('val-max-players').textContent = state.matchSettings.maxActivePlayers;
    document.getElementById('val-period-duration').textContent = state.matchSettings.periodDurationMinutes;
    document.getElementById('val-total-periods').textContent = state.matchSettings.totalPeriods;
    const maxFoulsEl = document.getElementById('val-max-fouls');
    if (maxFoulsEl) maxFoulsEl.textContent = state.matchSettings.maxPersonalFouls || 5;
    document.getElementById('label-total-periods').textContent = `Total ${getPeriodName()}s`;
    document.getElementById('input-team-name').value = state.matchSettings.teamName;

    // Roster count & starters
    const startersCount = state.players.filter(p => p.isStarter).length;
    document.getElementById('roster-count').textContent = state.players.length;
    document.getElementById('starters-count-label').textContent = `Starters: ${startersCount}/${state.matchSettings.maxActivePlayers}`;

    // Roster list container
    const rosterList = document.getElementById('roster-list');
    if (state.players.length === 0) {
      rosterList.innerHTML = `
        <div class="empty-state">
          No players in roster. Add players above or tap <strong>Load Sample Team</strong>.
        </div>
      `;
    } else {
      let html = '';
      state.players.forEach(player => {
        html += `
          <div class="roster-player-item" data-id="${player.id}">
            <div class="roster-player-left">
              <span class="jersey-badge">${player.jerseyNumber ? '#' + player.jerseyNumber : '—'}</span>
              <span class="player-name">${escapeHTML(player.name)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn-starter-toggle ${player.isStarter ? 'is-starter' : ''}" data-action="toggle-starter" data-id="${player.id}">
                <span>${player.isStarter ? '★ Starter' : '☆ Bench'}</span>
              </button>
              <button class="btn-delete-player" data-action="delete-player" data-id="${player.id}" aria-label="Delete player">✕</button>
            </div>
          </div>
        `;
      });
      rosterList.innerHTML = html;
    }

    // Kickoff button state
    const btnKickoff = document.getElementById('btn-kickoff-match');
    btnKickoff.disabled = (state.players.length === 0);
  }

  // Render Match View
  function renderMatchView() {
    document.getElementById('match-status').textContent = state.matchState === 'running' ? '● Live · elapsed' : 'Paused · elapsed';
    // Badges & Counters
    const periodName = getPeriodName();
    document.getElementById('badge-period').textContent = `${periodName} ${state.currentPeriod} of ${state.matchSettings.totalPeriods}`;

    const activeCount = getActivePlayers().length;
    const maxActive = state.matchSettings.maxActivePlayers;
    const isExceeding = activeCount > maxActive;

    const countBadge = document.getElementById('badge-court-count');
    countBadge.textContent = `${activeCount}/${maxActive} on court`;
    if (isExceeding) {
      countBadge.classList.add('limit-warning');
    } else {
      countBadge.classList.remove('limit-warning');
    }

    // Over-limit banner
    const bannerWarning = document.getElementById('banner-limit-warning');
    if (isExceeding) {
      bannerWarning.style.display = 'flex';
      document.getElementById('warning-court-count').textContent = activeCount;
      document.getElementById('warning-max-count').textContent = maxActive;
    } else {
      bannerWarning.style.display = 'none';
    }

    // Master Clock Buttons
    const btnClockToggle = document.getElementById('btn-clock-toggle');
    const clockIcon = document.getElementById('clock-toggle-icon');
    const clockText = document.getElementById('clock-toggle-text');

    if (state.matchState === 'running') {
      btnClockToggle.classList.remove('paused');
      clockIcon.textContent = '⏸';
      clockText.textContent = 'Pause Clock';
    } else {
      btnClockToggle.classList.add('paused');
      clockIcon.textContent = '▶';
      clockText.textContent = 'Resume Clock';
    }

    const btnNextPeriod = document.getElementById('btn-next-period-label');
    if (state.currentPeriod < state.matchSettings.totalPeriods) {
      btnNextPeriod.textContent = `Next ${periodName} ⏩`;
    } else {
      btnNextPeriod.textContent = `End Match 🏁`;
    }

    // Rotation Suggestion Card
    const rotationCard = document.getElementById('card-rotation-assist');
    const tip = getRotationRecommendation();
    if (tip && state.matchState === 'running') {
      rotationCard.style.display = 'flex';
      document.getElementById('rotation-assist-text').textContent =
        `Sub ${playerDisplayName(tip.outPlayer)} (on ${formatDuration(tip.shiftDuration)}) with ${playerDisplayName(tip.inPlayer)} (rested ${formatDuration(tip.restDuration)})`;
      document.getElementById('btn-assist-swap').onclick = () => {
        setupQuickSwapModal(tip.outPlayer.id);
        state.selectedSwapInId = tip.inPlayer.id;
        renderSwapModalLists();
      };
    } else {
      rotationCard.style.display = 'none';
    }

    // Filter Sections
    const sectionCourt = document.getElementById('section-on-court');
    const sectionBench = document.getElementById('section-on-bench');

    if (state.activeFilter === 'onCourt') {
      sectionCourt.style.display = 'block';
      sectionBench.style.display = 'none';
    } else if (state.activeFilter === 'bench') {
      sectionCourt.style.display = 'none';
      sectionBench.style.display = 'block';
    } else {
      sectionCourt.style.display = 'block';
      sectionBench.style.display = 'block';
    }

    renderPlayerLists();
    updateLiveTimersDOM();
  }

  // Render On Court & On Bench Player Card Lists
  function renderPlayerLists() {
    const listCourt = document.getElementById('list-on-court');
    const listBench = document.getElementById('list-on-bench');

    const activePlayers = getActivePlayers();
    const benchPlayers = getBenchPlayers();

    document.getElementById('court-list-count').textContent = activePlayers.length;
    document.getElementById('bench-list-count').textContent = benchPlayers.length;

    // On Court List
    if (activePlayers.length === 0) {
      listCourt.innerHTML = `<div class="empty-state">No players currently on court. Open a bench player’s details to sub in, or use Swap.</div>`;
    } else {
      let html = '';
      activePlayers.forEach(p => {
        html += renderPlayerCard(p, true);
      });
      listCourt.innerHTML = html;
    }

    // On Bench List
    if (benchPlayers.length === 0) {
      listBench.innerHTML = `<div class="empty-state">Entire squad is currently on court.</div>`;
    } else {
      let html = '';
      benchPlayers.forEach(p => {
        html += renderPlayerCard(p, false);
      });
      listBench.innerHTML = html;
    }
  }

  function renderPlayerCard(player, isCourt) {
    const now = Date.now();
    const stint = formatDuration(playerCurrentStint(player, now));
    const playTotal = formatDuration(playerTotalPlayTime(player, now));
    const benchTotal = formatDuration(playerTotalBenchTime(player, now));

    const fouls = player.personalFouls || 0;
    const maxFouls = state.matchSettings.maxPersonalFouls || 5;
    const isFouledOut = fouls >= maxFouls;
    const isFoulWarning = fouls === maxFouls - 1;

    let foulClass = '';
    if (isFouledOut) {
      foulClass = 'fouled-out';
    } else if (isFoulWarning) {
      foulClass = 'warning';
    }

    return `
      <div class="player-card ${isCourt ? 'playing' : 'bench'} ${isFouledOut ? 'fouled-out' : ''}" data-player-id="${player.id}">
        <div class="jersey-badge ${isCourt ? 'playing' : ''}">
          ${player.jerseyNumber ? '#' + player.jerseyNumber : '—'}
        </div>
        <div class="player-info">
          <div class="player-top-line">
            <button class="player-name player-details" data-action="player-details" data-id="${player.id}" aria-label="${escapeHTML(player.name)} details and fouls">${escapeHTML(player.name)}</button>
            <span class="foul-badge ${foulClass}">${isFouledOut ? 'Fouled out' : `${fouls} PF`}</span>
          </div>
          <div class="player-timers">
            <div class="stint-timer ${isCourt ? 'shift' : 'rest'}">
              <span>${isCourt ? 'Shift' : 'Rest'}</span>
              <span class="tabular-nums stint-value" data-player-stint="${player.id}">${stint}</span>
            </div>
            <div class="total-time">
              Played <span class="tabular-nums play-value" data-player-play="${player.id}">${playTotal}</span>
            </div>

          </div>
        </div>
        <div class="player-actions">
          <button class="btn-swap-mini" data-action="swap-player" data-id="${player.id}" aria-label="Swap ${escapeHTML(player.name)}">⇄</button>
        </div>
      </div>
    `;
  }

  // Fast DOM Updater for continuous 1-second ticks
  function updateLiveTimersDOM() {
    const displayPeriod = document.getElementById('display-period-time');
    const displayTotal = document.getElementById('display-total-time');

    if (displayPeriod) {
      displayPeriod.textContent = formatDuration(state.periodElapsedSeconds);
      const targetSecs = state.matchSettings.periodDurationMinutes * 60;
      if (targetSecs > 0 && state.periodElapsedSeconds >= targetSecs) {
        displayPeriod.classList.add('expired');
      } else {
        displayPeriod.classList.remove('expired');
      }
    }

    if (displayTotal) {
      displayTotal.textContent = formatDuration(state.totalMatchElapsedSeconds);
    }

    // Update stint and total durations on player rows
    const now = Date.now();
    state.players.forEach(p => {
      const stintEl = document.querySelector(`[data-player-stint="${p.id}"]`);
      if (stintEl) stintEl.textContent = formatDuration(playerCurrentStint(p, now));

      const playEl = document.querySelector(`[data-player-play="${p.id}"]`);
      if (playEl) playEl.textContent = formatDuration(playerTotalPlayTime(p, now));

      const benchEl = document.querySelector(`[data-player-bench="${p.id}"]`);
      if (benchEl) benchEl.textContent = formatDuration(playerTotalBenchTime(p, now));
    });
  }

  // Render Report View
  function renderReportView() {
    const now = Date.now();
    const totalGame = Math.max(1, state.totalMatchElapsedSeconds);

    document.getElementById('report-total-time').textContent = formatDuration(state.totalMatchElapsedSeconds);
    document.getElementById('report-total-subs').textContent = state.events.length;

    // Calculate Average Playing Time
    let totalSquadPlay = 0;
    state.players.forEach(p => totalSquadPlay += playerTotalPlayTime(p, now));
    const avgPlay = state.players.length > 0 ? (totalSquadPlay / state.players.length) : 0;
    document.getElementById('report-avg-playtime').textContent = formatDuration(avgPlay);

    // Player breakdown sorted by minutes
    const sorted = [...state.players].sort((a, b) => playerTotalPlayTime(b, now) - playerTotalPlayTime(a, now));
    const container = document.getElementById('report-player-list');

    let html = '';
    sorted.forEach(p => {
      const play = playerTotalPlayTime(p, now);
      const bench = playerTotalBenchTime(p, now);
      const pct = Math.min(100, (play / totalGame) * 100);

      const fouls = p.personalFouls || 0;
      const maxFouls = state.matchSettings.maxPersonalFouls || 5;
      const isFouledOut = fouls >= maxFouls;
      const foulBadge = fouls > 0 ? `<span class="shifts-badge" style="background:${isFouledOut?'rgba(239,68,68,0.2)':'rgba(245,158,11,0.15)'}; color:${isFouledOut?'#ef4444':'#f59e0b'}; margin-left:6px;">${fouls} Fouls${isFouledOut?' (Fouled Out)':''}</span>` : '';

      html += `
        <div class="summary-player-row">
          <div class="summary-player-top">
            <span class="summary-player-name">${playerDisplayName(p)} ${foulBadge}</span>
            <span class="summary-playtime">${formatDuration(play)}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${pct.toFixed(1)}%;"></div>
          </div>
          <div class="summary-meta-line">
            <span>Played ${pct.toFixed(0)}% (${p.timesOnField || 0} shifts)</span>
            <span>Benched: ${formatDuration(bench)}</span>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // ==========================================
  // Modal Managers
  // ==========================================
  let modalReturnFocus = null;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modalReturnFocus = document.activeElement;
    modal.inert = false;
    modal.classList.add('active');
    modal.querySelector('button, input, textarea')?.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.inert = true;
    if (modalReturnFocus?.isConnected) modalReturnFocus.focus();
  }

  function setupQuickSwapModal(presetPlayerId = null) {
    state.selectedSwapOutId = null;
    state.selectedSwapInId = null;

    if (presetPlayerId) {
      const player = state.players.find(p => p.id === presetPlayerId);
      if (player) {
        if (player.status === 'playing') {
          state.selectedSwapOutId = player.id;
        } else {
          state.selectedSwapInId = player.id;
        }
      }
    }

    renderSwapModalLists();
    openModal('modal-swap');
  }

  function renderSwapModalLists() {
    const now = Date.now();
    const outList = document.getElementById('swap-out-list');
    const inList = document.getElementById('swap-in-list');

    const outPlayer = state.players.find(p => p.id === state.selectedSwapOutId);
    const inPlayer = state.players.find(p => p.id === state.selectedSwapInId);

    document.getElementById('swap-out-name').textContent = outPlayer ? playerDisplayName(outPlayer) : 'Select player';
    document.getElementById('swap-in-name').textContent = inPlayer ? playerDisplayName(inPlayer) : 'Select player';

    const maxFouls = state.matchSettings.maxPersonalFouls || 5;

    // Out List (Active Players)
    let outHtml = '';
    getActivePlayers().forEach(p => {
      const isSel = p.id === state.selectedSwapOutId;
      const fouls = p.personalFouls || 0;
      const foulStr = fouls >= maxFouls ? '🚨 Fouled Out' : (fouls > 0 ? `${fouls} PF` : '');
      outHtml += `
        <button type="button" aria-pressed="${isSel}" class="swap-candidate-item ${isSel ? 'selected-out' : ''}" data-swap-out-id="${p.id}">
          <div class="candidate-name">${escapeHTML(playerDisplayName(p))} ${foulStr ? `<span style="font-size:0.75rem; color:${fouls>=maxFouls?'#ef4444':'#f59e0b'}; font-weight:700;">(${foulStr})</span>` : ''}</div>
          <div class="candidate-time">Shift: ${formatDuration(playerCurrentStint(p, now))}</div>
        </button>
      `;
    });
    outList.innerHTML = outHtml || `<div class="empty-state">No active players</div>`;

    // In List (Bench Players)
    let inHtml = '';
    getBenchPlayers().forEach(p => {
      const isSel = p.id === state.selectedSwapInId;
      const fouls = p.personalFouls || 0;
      const foulStr = fouls >= maxFouls ? '🚨 Fouled Out' : (fouls > 0 ? `${fouls} PF` : '');
      inHtml += `
        <button type="button" aria-pressed="${isSel}" class="swap-candidate-item ${isSel ? 'selected-in' : ''}" data-swap-in-id="${p.id}">
          <div class="candidate-name">${escapeHTML(playerDisplayName(p))} ${foulStr ? `<span style="font-size:0.75rem; color:${fouls>=maxFouls?'#ef4444':'#f59e0b'}; font-weight:700;">(${foulStr})</span>` : ''}</div>
          <div class="candidate-time">Rested: ${formatDuration(playerCurrentStint(p, now))}</div>
        </button>
      `;
    });
    inList.innerHTML = inHtml || `<div class="empty-state">No bench players</div>`;

    // Confirm button state
    document.getElementById('btn-confirm-swap').disabled = (!state.selectedSwapOutId || !state.selectedSwapInId);
  }

  function setupLogModal() {
    const container = document.getElementById('log-events-container');
    if (state.events.length === 0) {
      container.innerHTML = `<div class="empty-state">No substitutions made yet.</div>`;
    } else {
      let html = '';
      state.events.forEach(evt => {
        let desc = '';
        const playerLabel = evt.jerseyNumber ? `#${evt.jerseyNumber} ${evt.playerName}` : evt.playerName;
        if (evt.type === 'subIn') {
          desc = `${playerLabel} entered the game`;
        } else if (evt.type === 'subOut') {
          desc = `${playerLabel} went to the bench`;
        } else if (evt.type === 'swap') {
          const targetLabel = evt.targetJerseyNumber ? `#${evt.targetJerseyNumber} ${evt.targetPlayerName}` : evt.targetPlayerName;
          desc = `${playerLabel} replaced ${targetLabel}`;
        } else if (evt.type === 'foul') {
          desc = `${playerLabel} committed personal foul (${evt.foulCount}/${state.matchSettings.maxPersonalFouls || 5})`;
        } else if (evt.type === 'foulOut') {
          desc = `🚨 ${playerLabel} committed personal foul #${evt.foulCount} — FOULED OUT`;
        }

        let badgeClass = 'in';
        let badgeText = 'Sub In';
        if (evt.type === 'subOut') {
          badgeClass = 'out';
          badgeText = 'Sub Out';
        } else if (evt.type === 'swap') {
          badgeClass = 'swap';
          badgeText = 'Swap';
        } else if (evt.type === 'foul') {
          badgeClass = 'foul';
          badgeText = `Foul (${evt.foulCount})`;
        } else if (evt.type === 'foulOut') {
          badgeClass = 'foul-out';
          badgeText = 'Fouled Out';
        }

        html += `
          <div class="log-item">
            <span class="log-time-pill">${formatDuration(evt.matchElapsedSeconds)}</span>
            <div class="log-desc">
              <div class="log-text">${escapeHTML(desc)}</div>
              <div class="log-period">${getPeriodName()} ${evt.period}</div>
            </div>
            <span class="log-badge ${badgeClass}">${badgeText}</span>
          </div>
        `;
      });
      container.innerHTML = html;
    }
    openModal('modal-log');
  }

  function setupConfirmModal(title, message, onConfirm) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;

    const actionBtn = document.getElementById('btn-confirm-action');
    actionBtn.onclick = () => {
      closeModal('modal-confirm');
      onConfirm();
    };

    openModal('modal-confirm');
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================
  // Event Listeners & Interactions Setup
  // ==========================================
  function setupEventListeners() {
    document.querySelectorAll('.modal-overlay').forEach(modal => { modal.inert = true; });
    document.addEventListener('keydown', event => {
      const modal = document.querySelector('.modal-overlay.active');
      if (!modal) return;
      if (event.key === 'Escape') closeModal(modal.id);
      if (event.key === 'Tab') {
        const controls = [...modal.querySelectorAll('button:not(:disabled), input, textarea, select')].filter(el => el.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
    document.getElementById('btn-undo-sub').addEventListener('click', undoSubstitution);
    document.getElementById('btn-panel-foul-add').addEventListener('click', () => addPersonalFoul(state.selectedPlayerId));
    document.getElementById('btn-panel-foul-remove').addEventListener('click', () => removePersonalFoul(state.selectedPlayerId));
    document.getElementById('btn-panel-sub').addEventListener('click', () => {
      const player = state.players.find(p => p.id === state.selectedPlayerId);
      if (!player) return;
      if (player.status === 'playing') stopPlayer(player.id); else startPlayer(player.id);
      closeModal('modal-player');
    });
    // 1. Sport preset change
    document.getElementById('select-sport').addEventListener('change', (e) => {
      const val = e.target.value;
      state.matchSettings.sport = val;
      const preset = SPORT_PRESETS[val] || SPORT_PRESETS['Custom'];
      state.matchSettings.maxActivePlayers = preset.playersOnField;
      state.matchSettings.periodDurationMinutes = preset.periodMinutes;
      state.matchSettings.totalPeriods = preset.totalPeriods;
      saveState();
      render();
    });

    // 2. Steppers
    document.getElementById('btn-max-players-dec').addEventListener('click', () => {
      if (state.matchSettings.maxActivePlayers > 1) {
        state.matchSettings.maxActivePlayers--;
        saveState();
        render();
      }
    });
    document.getElementById('btn-max-players-inc').addEventListener('click', () => {
      if (state.matchSettings.maxActivePlayers < 30) {
        state.matchSettings.maxActivePlayers++;
        saveState();
        render();
      }
    });

    document.getElementById('btn-period-duration-dec').addEventListener('click', () => {
      if (state.matchSettings.periodDurationMinutes > 1) {
        state.matchSettings.periodDurationMinutes--;
        saveState();
        render();
      }
    });
    document.getElementById('btn-period-duration-inc').addEventListener('click', () => {
      if (state.matchSettings.periodDurationMinutes < 60) {
        state.matchSettings.periodDurationMinutes++;
        saveState();
        render();
      }
    });

    document.getElementById('btn-total-periods-dec').addEventListener('click', () => {
      if (state.matchSettings.totalPeriods > 1) {
        state.matchSettings.totalPeriods--;
        saveState();
        render();
      }
    });
    document.getElementById('btn-total-periods-inc').addEventListener('click', () => {
      if (state.matchSettings.totalPeriods < 10) {
        state.matchSettings.totalPeriods++;
        saveState();
        render();
      }
    });

    const btnMaxFoulsDec = document.getElementById('btn-max-fouls-dec');
    if (btnMaxFoulsDec) {
      btnMaxFoulsDec.addEventListener('click', () => {
        if ((state.matchSettings.maxPersonalFouls || 5) > 1) {
          state.matchSettings.maxPersonalFouls = (state.matchSettings.maxPersonalFouls || 5) - 1;
          saveState();
          render();
        }
      });
    }

    const btnMaxFoulsInc = document.getElementById('btn-max-fouls-inc');
    if (btnMaxFoulsInc) {
      btnMaxFoulsInc.addEventListener('click', () => {
        if ((state.matchSettings.maxPersonalFouls || 5) < 10) {
          state.matchSettings.maxPersonalFouls = (state.matchSettings.maxPersonalFouls || 5) + 1;
          saveState();
          render();
        }
      });
    }

    // 3. Team name input
    document.getElementById('input-team-name').addEventListener('input', (e) => {
      state.matchSettings.teamName = e.target.value.trim() || 'My Team';
      saveState();
    });

    // 4. Add player form
    const nameInput = document.getElementById('input-player-name');
    const jerseyInput = document.getElementById('input-jersey');
    const btnAddPlayer = document.getElementById('btn-add-player');

    nameInput.addEventListener('input', () => {
      btnAddPlayer.disabled = !nameInput.value.trim();
    });

    function handleAddPlayer() {
      const name = nameInput.value.trim();
      const jersey = jerseyInput.value.trim();
      if (!name) return;
      addPlayer(name, jersey);
      nameInput.value = '';
      jerseyInput.value = '';
      btnAddPlayer.disabled = true;
      nameInput.focus();
    }

    btnAddPlayer.addEventListener('click', handleAddPlayer);
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAddPlayer();
    });
    jerseyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') nameInput.focus();
    });

    // 5. Bulk Import Modal
    document.getElementById('btn-open-bulk').addEventListener('click', () => {
      openModal('modal-bulk');
    });

    document.getElementById('btn-submit-bulk-import').addEventListener('click', () => {
      const textarea = document.getElementById('bulk-import-textarea');
      if (textarea.value.trim()) {
        parseAndAddBulk(textarea.value);
        textarea.value = '';
        closeModal('modal-bulk');
        showToast('Imported roster players!');
      }
    });

    // 6. Sample team button
    document.getElementById('btn-load-sample').addEventListener('click', loadSampleTeam);

    // 7. Roster delegator (Starters / Delete)
    document.getElementById('roster-list').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'toggle-starter') {
        toggleStarter(id);
      } else if (action === 'delete-player') {
        removePlayer(id);
      }
    });

    // 8. Kick off match
    document.getElementById('btn-kickoff-match').addEventListener('click', startMatch);

    // 9. Master clock pause/resume toggle
    document.getElementById('btn-clock-toggle').addEventListener('click', () => {
      if (state.matchState === 'running') {
        pauseMatch();
      } else if (state.matchState === 'paused') {
        resumeMatch();
      }
    });

    // 10. Next period / End match
    document.getElementById('btn-next-period').addEventListener('click', () => {
      if (state.currentPeriod < state.matchSettings.totalPeriods) {
        setupConfirmModal(
          `Advance to ${getPeriodName()} ${state.currentPeriod + 1}?`,
          `This will conclude ${getPeriodName()} ${state.currentPeriod} and reset the period clock.`,
          nextPeriod
        );
      } else {
        setupConfirmModal(
          'End Match?',
          'This will finalize the game and display the post-match summary report.',
          endMatch
        );
      }
    });

    // 11. Segmented filter tabs
    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.dataset.filter;
        render();
      });
    });

    // 12. Player row action delegation (START / STOP / SWAP / FOULS)
    function handlePlayerAction(e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === 'player-details') {
        state.selectedPlayerId = id;
        renderPlayerPanel();
        openModal('modal-player');
      } else if (action === 'start-player') {
        startPlayer(id);
      } else if (action === 'stop-player') {
        stopPlayer(id);
      } else if (action === 'swap-player') {
        setupQuickSwapModal(id);
      } else if (action === 'add-foul') {
        addPersonalFoul(id);
      } else if (action === 'remove-foul') {
        removePersonalFoul(id);
      }
    }

    document.getElementById('list-on-court').addEventListener('click', handlePlayerAction);
    document.getElementById('list-on-bench').addEventListener('click', handlePlayerAction);

    // 13. Quick swap modal open
    document.getElementById('btn-open-quick-swap').addEventListener('click', () => {
      setupQuickSwapModal();
    });

    // 14. Quick swap candidate selection
    document.getElementById('swap-out-list').addEventListener('click', (e) => {
      const item = e.target.closest('[data-swap-out-id]');
      if (!item) return;
      state.selectedSwapOutId = item.dataset.swapOutId;
      renderSwapModalLists();
    });

    document.getElementById('swap-in-list').addEventListener('click', (e) => {
      const item = e.target.closest('[data-swap-in-id]');
      if (!item) return;
      state.selectedSwapInId = item.dataset.swapInId;
      renderSwapModalLists();
    });

    document.getElementById('btn-confirm-swap').addEventListener('click', () => {
      if (state.selectedSwapOutId && state.selectedSwapInId) {
        swapPlayers(state.selectedSwapOutId, state.selectedSwapInId);
        closeModal('modal-swap');
      }
    });

    // 15. Header Actions
    document.getElementById('btn-open-log').addEventListener('click', setupLogModal);
    document.getElementById('btn-match-menu').addEventListener('click', () => {
      setupConfirmModal(
        'Conclude Match & View Report?',
        'This will end the match clock and open the post-game summary.',
        endMatch
      );
    });

    // 16. Wake Lock & Sound Toggles
    document.getElementById('btn-wakelock').addEventListener('click', () => {
      if (state.wakeLockActive) {
        releaseWakeLock();
        showToast('Screen wake lock deactivated');
      } else {
        requestWakeLock();
        showToast('Screen will stay awake during match');
      }
    });

    document.getElementById('btn-sound').addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      const btn = document.getElementById('btn-sound');
      if (state.soundEnabled) {
        btn.classList.remove('active');
        btn.querySelector('.icon').textContent = '🔔';
        showToast('Sound enabled');
      } else {
        btn.classList.add('active');
        btn.querySelector('.icon').textContent = '🔕';
        showToast('Sound muted');
      }
      saveState();
    });

    // 17. Report View Actions (Export, Share, Reset)
    document.getElementById('btn-export-csv').addEventListener('click', downloadCSV);
    document.getElementById('btn-share-summary').addEventListener('click', shareSummary);
    document.getElementById('btn-start-new-match').addEventListener('click', () => {
      setupConfirmModal(
        'Start New Match?',
        'This will clear game clocks and stats to prepare for a fresh game.',
        resetMatch
      );
    });

    // 18. Generic Modal Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.dataset.closeModal);
      });
    });

    document.getElementById('btn-confirm-cancel').addEventListener('click', () => {
      closeModal('modal-confirm');
    });

    // Close modals on clicking overlay backdrop
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal(overlay.id);
        }
      });
    });
  }

  // ==========================================
  // PWA Service Worker Registration
  // ==========================================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(registration => {
            console.log('SubTracker Service Worker registered:', registration.scope);
          })
          .catch(err => {
            console.warn('Service Worker registration error:', err);
          });
      });
    }
  }

  // ==========================================
  // Initialization
  // ==========================================
  function init() {
    loadSavedState();
    setupEventListeners();
    registerServiceWorker();
    render();

    // If starting with an empty team on fresh launch, load default basketball team
    if (state.players.length === 0) {
      loadSampleTeam();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
