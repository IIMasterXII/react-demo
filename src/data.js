//Image importer 
//---------------------------------------------------------------------------------
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
export const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

//Ability/Skills Data
//---------------------------------------------------------------------------------
export const ABILITIES = {
  ACTIVE: {
    attack_basic: {
      image: images['attack_basic.png'],
      name: 'Attack',
      description:'lorem ipsum'
    }
  },
  PASSIVE: {

  }
}

//Map Data
//---------------------------------------------------------------------------------



//Item Data
//---------------------------------------------------------------------------------
const TYPE = {
  EQUIPMENT: {HELMET:'helmet', CHEST:'chest', LEGS:'legs', GLOVES:'gloves', MAIN_HAND:'main_hand', OFF_HAND:'off_hand', RELIC:'relic'},
  CONSUMABLE: 'consumable',
  MISC: 'misc'
}

export const ITEMS = {
  item_basic: {
    image: images['item_basic.png'],
    name: 'Basic Item',
    description:'This is a test item.',
    type: TYPE.CONSUMABLE,
    stats: {
      value:                50,
    }
  },
  helmet_wooden: {
    image: images['helmet_wooden.png'],
    name: 'Wooden Helmet',
    description:'A wooden helmet.',
    type: TYPE.EQUIPMENT.HELMET,
    stats: {
      armor_rating:         1,
      value:                50,
    }
  },
  chest_wooden: {
    image: images['chest_wooden.png'],
    name: 'Wooden Chestpiece',
    description:'A wooden chestpiece.',
    type: TYPE.EQUIPMENT.CHEST,
    stats: {
      armor_rating:         3,
      value:                50,
    }
  },
  gloves_wooden: {
    image: images['gloves_wooden.png'],
    name: 'Wooden Gauntlets',
    description:'A pair of wooden gauntlets.',
    type: TYPE.EQUIPMENT.GLOVES,
    stats: {
      armor_rating:         1,
      value:                50,
    }
  },
  legs_wooden: {
    image: images['legs_wooden.png'],
    name: 'Wooden Leggings',
    description:'A pair of wooden leggings.',
    type: TYPE.EQUIPMENT.LEGS,
    stats: {
      armor_rating:         2,
      value:                50,
    }
  },
  main_hand_mace: {
    image: images['main_hand_mace.png'],
    name: 'Mace',
    description:'A deadly blunt weapon.',
    type: TYPE.EQUIPMENT.MAIN_HAND,
    stats: {
      damage_rating:        10,
      value:                100,
    }
  },
  off_hand_shield: {
    image: images['off_hand_shield.png'],
    name: 'Shield',
    description:'Protection against your enemies.',
    type: TYPE.EQUIPMENT.OFF_HAND,
    stats: {
      armor_rating:         5,
      value:                100,
    }
  },
  relic_orb: {
    image: images['relic_orb.png'],
    name: 'Orb',
    description:'Magic flows through this strange orb.',
    type: TYPE.EQUIPMENT.RELIC,
    stats: {
      value:                100,
    }
  },
  relic_cross: {
    image: images['relic_cross.png'],
    name: 'Cross',
    description:'Help from the Gods.',
    type: TYPE.EQUIPMENT.RELIC,
    stats: {
      value:                100,
    }
  },
}
  
//Characters Data
//---------------------------------------------------------------------------------

export const CHARACTERS = [
  { 
    image: images['warrior.jpg'], 
    sprite: images['warrior_sprite.svg'], 
    name: 'Warrior', 
    attributes: [{name:'STR', value:10},{name:'INT', value:1},{name:'DEX', value:4}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 80},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Fearsome brutes who inspire fear and dread in the hearts of their enemies. Like a storm, swift and powerful. Finding little use for heavy armor, they rely on smashing their foes into the ground.'
  },
  {
    image: images['mage.jpg'],
    sprite: images['mage_sprite.svg'],  
    name: 'Mage' , 
    attributes: [{name:'STR', value:2},{name:'INT', value:10},{name:'DEX', value:3}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Prefering to use their extensive knowledge of all things magical, they wield a might more powerful than the sharpest blade.'
  },
  {
    image: images['rogue.jpg'], 
    sprite: images['rogue_sprite.svg'], 
    name: 'Rogue' , 
    attributes: [{name:'STR', value:4},{name:'INT', value:4},{name:'DEX', value:8}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'They use speed in combat rather than brute force. Persuasive in conversation, their tongues are as sharp as blades.'
  },
  {
    image: images['bounty-hunter.jpg'], 
    sprite: images['bounty-hunter_sprite.svg'], 
    name: 'Bounty Hunter' , 
    attributes: [{name:'STR', value:4},{name:'INT', value:5},{name:'DEX', value:7}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Preferring the rolling countryside to the city life, they are gifted with the ability to evade, guard, and protect themselves with great proficiency.'
  },
  {
    image: images['crusader.jpg'], 
    sprite: images['crusader_sprite.svg'], 
    name: 'Crusader' , 
    attributes: [{name:'STR', value:8},{name:'INT', value:3},{name:'DEX', value:5}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'A combatant who wields the power of brute strength and medicinal knowledge. Cheating death after every fight, they rely on their keen knowledge of restoration to fight yet again.'
  },
  {
    image: images['necromancer.jpg'],
    sprite: images['necromancer_sprite.svg'],  
    name: 'Necromancer' , 
    attributes: [{name:'STR', value:5},{name:'INT', value:8},{name:'DEX', value:3}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Besting the most well-equipped fighters, they rely on the spells of the mystic arts. Unique to these mages is the bodily stamina to be armed with the thickest armor.'
  },
  {
    image: images['druid.jpg'], 
    sprite: images['druid_sprite.svg'], 
    name: 'Druid' , 
    attributes: [{name:'STR', value:5},{name:'INT', value:6},{name:'DEX', value:5}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Fighters of the elements. The ancient art of restoration is their ally, and the deadly art of destruction is their weapon.'
  },
  {
    image: images['monk.jpg'], 
    sprite: images['monk_sprite.svg'], 
    name: 'Monk' , 
    attributes: [{name:'STR', value:7},{name:'INT', value:2},{name:'DEX', value:7}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Quick and cunning with the empty hand, they are strong in spirit. They prefer to solve conflict by arrow or by fist.'
  },
  {
    image: images['assassin.jpg'], 
    sprite: images['assassin_sprite.svg'], 
    name: 'Assassin' , 
    attributes: [{name:'STR', value:1},{name:'INT', value:4},{name:'DEX', value:10}],
    abilities: [ABILITIES.ACTIVE.attack_basic],
    inventory: {slot:[ITEMS.item_basic], size: 20},
    equipment:      {helmet: 'item_basic', chest: 'item_basic', legs: 'item_basic', gloves: 'item_basic', main_hand: 'item_basic', off_hand: 'item_basic', relic1: 'item_basic', relic2: 'item_basic'},
    description: 'Nimble and quiet, they move in darkness to strike at the unsuspecting. Locks hold no doors shut for them.'
  },
];

export var PLAYER_CHARACTER = {
  image: images['warrior.jpg'], 
  sprite: images['warrior_sprite.svg'], 
  name:'Player',
  attributes: [{name:'STR', value:0},{name:'INT', value:0},{name:'DEX', value:0}],
  abilities:   null,
  level:          1,
  currentHealth:  0,
  maxHealth:      0,
  currentMana:    0,
  maxMana:        0,
  inventory:      {slot:[ITEMS.item_basic], size: 80},
  equipment:      {helmet: ITEMS.helmet_wooden, chest: ITEMS.chest_wooden, legs: ITEMS.legs_wooden, gloves: ITEMS.gloves_wooden, main_hand: ITEMS.main_hand_mace, off_hand: ITEMS.off_hand_shield, relic1: ITEMS.relic_orb, relic2: ITEMS.relic_cross},
}

//Map Data
//---------------------------------------------------------------------------------
