function generateData(size = 10, { includeError = false } = {}) {
  const errorIndexes = includeError ? getMultipleRandomInts(5, 0, size) : {};

  const response = [];
  for (let i = 0; i < size; i++) {
    const data = {
      user: {
        username: faker.random.word(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      date: faker.date.past(),
      message: faker.lorem.sentence(),
    };

    const includeError = errorIndexes[i] !== undefined;
    if (includeError) {
      delete data.user;
    }

    response.push(data);
  }

  return response;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMultipleRandomInts(quantity, min, max) {
  const result = {};
  for (let i = 0; i < quantity; i++) {
    const int = getRandomInt(min, max);
    result[int] = int;
  }
  return result;
}
