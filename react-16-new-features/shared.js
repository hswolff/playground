function generateData(size = 10) {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      username: faker.random.word(),
      date: faker.date.past(),
      message: faker.lorem.sentence(),
    });
  }
  return data;
}
