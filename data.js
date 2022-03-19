module.exports = () => {
  const data = { superheroes: [] };
  for (let i = 1; i <= 100; i++) {
    data.superheroes.push({
      id: i,
      name: `superHero ${i}`,
      alterEgo: `No${i}`,
    });
  }
  return data;
};
