// Daily streak management system
export class StreakManager {
  constructor(userId) {
    this.userId = userId;
    this.storageKey = `dailyStreak_${userId}`;
  }

  // Get current streak data
  getStreakData() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return {
        currentStreak: 0,
        lastPlayDate: null,
        maxStreak: 0,
        totalDaysPlayed: 0,
        streakHistory: []
      };
    }
    return JSON.parse(stored);
  }

  // Save streak data
  saveStreakData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Check if user played today
  hasPlayedToday() {
    const data = this.getStreakData();
    if (!data.lastPlayDate) return false;
    
    const today = new Date().toDateString();
    const lastPlay = new Date(data.lastPlayDate).toDateString();
    
    return today === lastPlay;
  }

  // Update streak when user plays
  updateStreak() {
    const data = this.getStreakData();
    const today = new Date();
    const todayStr = today.toDateString();
    
    // If already played today, don't update
    if (this.hasPlayedToday()) {
      return data.currentStreak;
    }

    let newStreak = data.currentStreak;
    
    if (!data.lastPlayDate) {
      // First time playing
      newStreak = 1;
    } else {
      const lastPlay = new Date(data.lastPlayDate);
      const daysDiff = Math.floor((today - lastPlay) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        newStreak = data.currentStreak + 1;
      } else if (daysDiff > 1) {
        // Streak broken
        newStreak = 1;
      }
      // daysDiff === 0 means same day (already handled above)
    }

    const updatedData = {
      ...data,
      currentStreak: newStreak,
      lastPlayDate: today.toISOString(),
      maxStreak: Math.max(data.maxStreak, newStreak),
      totalDaysPlayed: data.totalDaysPlayed + 1,
      streakHistory: [...data.streakHistory, {
        date: todayStr,
        streak: newStreak,
        gameMode: null // Will be updated by game
      }].slice(-30) // Keep last 30 days
    };

    this.saveStreakData(updatedData);
    return newStreak;
  }

  // Get streak bonus multiplier
  getStreakBonus() {
    const streak = this.getCurrentStreak();
    if (streak >= 30) return 2.0; // 100% bonus
    if (streak >= 14) return 1.5; // 50% bonus  
    if (streak >= 7) return 1.25; // 25% bonus
    if (streak >= 3) return 1.1; // 10% bonus
    return 1.0; // No bonus
  }

  // Get current streak
  getCurrentStreak() {
    // Check if streak is still valid (not broken)
    const data = this.getStreakData();
    if (!data.lastPlayDate) return 0;
    
    const today = new Date();
    const lastPlay = new Date(data.lastPlayDate);
    const daysDiff = Math.floor((today - lastPlay) / (1000 * 60 * 60 * 24));
    
    // If more than 1 day passed, streak is broken
    if (daysDiff > 1) {
      // Reset streak
      const resetData = {
        ...data,
        currentStreak: 0
      };
      this.saveStreakData(resetData);
      return 0;
    }
    
    return data.currentStreak;
  }

  // Get streak status message
  getStreakMessage() {
    const streak = this.getCurrentStreak();
    const bonus = Math.round((this.getStreakBonus() - 1) * 100);
    
    if (streak === 0) return 'Start your bounty hunting streak!';
    if (streak === 1) return '🔥 Day 1 streak! Keep going!';
    if (streak < 7) return `🔥 ${streak} day streak! +${bonus}% bonus berries`;
    if (streak < 14) return `🔥🔥 ${streak} day streak! You're on fire! +${bonus}% bonus`;
    if (streak < 30) return `🔥🔥🔥 ${streak} day streak! Legendary pirate! +${bonus}% bonus`;
    return `👑 ${streak} day streak! PIRATE EMPEROR! +${bonus}% bonus`;
  }

  // Update today's game mode in streak history
  updateTodayGameMode(gameMode) {
    const data = this.getStreakData();
    const today = new Date().toDateString();
    
    const updatedHistory = data.streakHistory.map(entry => {
      if (entry.date === today) {
        return { ...entry, gameMode };
      }
      return entry;
    });
    
    this.saveStreakData({
      ...data,
      streakHistory: updatedHistory
    });
  }

  // Get streak calendar for display
  getStreakCalendar(days = 30) {
    const data = this.getStreakData();
    const calendar = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const historyEntry = data.streakHistory.find(entry => entry.date === dateStr);
      
      calendar.push({
        date: dateStr,
        hasPlayed: !!historyEntry,
        streak: historyEntry?.streak || 0,
        gameMode: historyEntry?.gameMode || null,
        isToday: dateStr === today.toDateString()
      });
    }
    
    return calendar;
  }
}

// Export factory function
export const createStreakManager = (userId) => new StreakManager(userId);
