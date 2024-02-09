class Character {
    constructor(name, health, attackPower, defense, damage) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.defense = defense;
      this.damage = damage;
      this.items = [];
    }
  
    addItem(item) {
      this.items.push(item);
    }
    
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
    
  }
  
  export default Character;