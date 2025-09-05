// Enhanced answer matching utility for flexible character name recognition
export class AnswerMatcher {
  constructor() {
    // Character aliases and common names
    this.characterAliases = {
      'Monkey D. Luffy': ['luffy', 'monkey d luffy', 'straw hat luffy', 'mugiwara'],
      'Roronoa Zoro': ['zoro', 'roronoa zoro', 'pirate hunter zoro', 'three sword'],
      'Nami': ['nami', 'cat burglar nami', 'navigator'],
      'Usopp': ['usopp', 'sniper usopp', 'god usopp', 'sogeking'],
      'Sanji': ['sanji', 'black leg sanji', 'vinsmoke sanji', 'cook'],
      'Tony Tony Chopper': ['chopper', 'tony tony chopper', 'cotton candy lover', 'reindeer'],
      'Nico Robin': ['robin', 'nico robin', 'demon child robin'],
      'Franky': ['franky', 'cyborg franky', 'cutty flam'],
      'Brook': ['brook', 'soul king brook', 'skeleton'],
      'Jinbe': ['jinbe', 'jinbei', 'knight of the sea jinbe', 'first son of the sea'],
      
      // Villains and other characters
      'Marshall D. Teach': ['blackbeard', 'marshall d teach', 'teach', 'kurohige'],
      'Edward Newgate': ['whitebeard', 'edward newgate', 'newgate', 'shirohige'],
      'Charlotte Linlin': ['big mom', 'charlotte linlin', 'linlin'],
      'Kaido': ['kaido', 'king of the beasts kaido'],
      'Shanks': ['shanks', 'red hair shanks', 'red haired shanks'],
      'Dracule Mihawk': ['mihawk', 'dracule mihawk', 'hawk eyes mihawk'],
      'Crocodile': ['crocodile', 'sir crocodile', 'mr 0'],
      'Donquixote Doflamingo': ['doflamingo', 'donquixote doflamingo', 'doffy', 'joker'],
      'Trafalgar D. Water Law': ['law', 'trafalgar law', 'trafalgar d water law', 'surgeon of death'],
      'Eustass Kid': ['kid', 'eustass kid', 'captain kid'],
      'Portgas D. Ace': ['ace', 'portgas d ace', 'fire fist ace'],
      'Boa Hancock': ['hancock', 'boa hancock', 'snake princess'],
      'Buggy': ['buggy', 'buggy the clown', 'captain buggy'],
      
      // Crew names
      'Straw Hat Pirates': ['straw hat pirates', 'straw hats', 'mugiwara pirates'],
      'Whitebeard Pirates': ['whitebeard pirates', 'white beard crew'],
      'Red Hair Pirates': ['red hair pirates', 'red haired pirates', 'shanks crew'],
      'Beast Pirates': ['beast pirates', 'animal kingdom pirates', 'kaido crew'],
      'Big Mom Pirates': ['big mom pirates', 'charlotte family'],
      'Blackbeard Pirates': ['blackbeard pirates', 'teach crew'],
      'Heart Pirates': ['heart pirates', 'law crew'],
      'Kid Pirates': ['kid pirates', 'eustass crew'],
      
      // Devil Fruits
      'Gomu Gomu no Mi': ['gomu gomu', 'gum gum fruit', 'rubber fruit', 'hito hito model nika'],
      'Mera Mera no Mi': ['mera mera', 'flame flame fruit', 'fire fruit'],
      'Yami Yami no Mi': ['yami yami', 'dark dark fruit', 'darkness fruit'],
      'Gura Gura no Mi': ['gura gura', 'quake quake fruit', 'tremor fruit'],
      'Ope Ope no Mi': ['ope ope', 'op op fruit', 'operation fruit'],
      
      // Forms and transformations
      'Gear 2': ['gear 2', 'gear second', 'second gear'],
      'Gear 3': ['gear 3', 'gear third', 'third gear'],
      'Gear 4': ['gear 4', 'gear fourth', 'fourth gear'],
      'Gear 5': ['gear 5', 'gear fifth', 'fifth gear', 'nika form'],
      'Boundman': ['boundman', 'bounce man'],
      'Tankman': ['tankman', 'tank man'],
      'Snakeman': ['snakeman', 'snake man'],
      'Asura': ['asura', 'ashura', 'nine sword style'],
      'Diable Jambe': ['diable jambe', 'devil leg'],
      'Monster Point': ['monster point', 'monster form'],
      'Raid Suit': ['raid suit', 'germa suit', 'stealth black']
    };
    
    // Common misspellings
    this.commonMisspellings = {
      'lufy': 'luffy',
      'zoro': 'zoro',
      'usop': 'usopp',
      'sanji': 'sanji',
      'chooper': 'chopper',
      'robbin': 'robin',
      'frankey': 'franky',
      'brook': 'brook',
      'ace': 'ace',
      'blackbeared': 'blackbeard',
      'whitebeared': 'whitebeard',
      'bigmom': 'big mom',
      'kaydo': 'kaido',
      'mihok': 'mihawk',
      'crocodyl': 'crocodile',
      'doflamingo': 'doflamingo',
      'hancok': 'hancock'
    };
  }

  // Normalize text for comparison
  normalizeText(text) {
    if (!text) return '';
    
    let normalized = text.toLowerCase().trim();
    
    // Fix common misspellings
    Object.entries(this.commonMisspellings).forEach(([wrong, correct]) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      normalized = normalized.replace(regex, correct);
    });
    
    // Remove common punctuation and extra spaces
    normalized = normalized
      .replace(/[.,!?;:'"()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return normalized;
  }

  // Check if answer matches any known aliases
  matchesCharacter(userAnswer, correctAnswer) {
    const normalizedUser = this.normalizeText(userAnswer);
    const normalizedCorrect = this.normalizeText(correctAnswer);
    
    // Direct match
    if (normalizedUser === normalizedCorrect) {
      return { match: true, confidence: 100 };
    }
    
    // Check aliases
    const aliases = this.characterAliases[correctAnswer] || [];
    for (const alias of aliases) {
      const normalizedAlias = this.normalizeText(alias);
      
      // Exact alias match
      if (normalizedUser === normalizedAlias) {
        return { match: true, confidence: 95 };
      }
      
      // Partial match (user answer contains the alias)
      if (normalizedUser.includes(normalizedAlias) || normalizedAlias.includes(normalizedUser)) {
        if (normalizedUser.length >= 3 && normalizedAlias.length >= 3) {
          return { match: true, confidence: 85 };
        }
      }
    }
    
    // Fuzzy matching for close spellings
    const similarity = this.calculateSimilarity(normalizedUser, normalizedCorrect);
    if (similarity > 0.7) {
      return { match: true, confidence: Math.floor(similarity * 100) };
    }
    
    // Check if user answer contains key parts of the correct answer
    const correctParts = normalizedCorrect.split(' ').filter(part => part.length > 2);
    const userParts = normalizedUser.split(' ');
    
    let matchingParts = 0;
    correctParts.forEach(part => {
      if (userParts.some(userPart => userPart.includes(part) || part.includes(userPart))) {
        matchingParts++;
      }
    });
    
    if (matchingParts > 0 && matchingParts / correctParts.length >= 0.6) {
      return { match: true, confidence: 70 };
    }
    
    return { match: false, confidence: 0 };
  }

  // Calculate text similarity using Levenshtein distance
  calculateSimilarity(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    const maxLen = Math.max(str1.length, str2.length);
    return maxLen === 0 ? 1 : (maxLen - matrix[str2.length][str1.length]) / maxLen;
  }

  // Check multiple possible answers (for fusion mode, etc.)
  checkMultipleAnswers(userAnswer, correctAnswers) {
    const results = [];
    let totalMatches = 0;
    
    correctAnswers.forEach(correct => {
      const result = this.matchesCharacter(userAnswer, correct);
      results.push({ answer: correct, ...result });
      if (result.match) totalMatches++;
    });
    
    return {
      matches: results.filter(r => r.match),
      totalMatches,
      allResults: results
    };
  }
}

// Export singleton instance
export const answerMatcher = new AnswerMatcher();
