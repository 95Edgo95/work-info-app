module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  "transform": {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^components(.*)$": "<rootDir>/src/components/$1",
    "^containers(.*)$": "<rootDir>/src/containers/$1",
    "^services(.*)$": "<rootDir>/src/services/$1",
    "^helpers(.*)$": "<rootDir>/src/helpers/$1",
    "^modules(.*)$": "<rootDir>/src/modules/$1",
    "^configs(.*)$": "<rootDir>/src/configs/$1",
    "^store(.*)$": "<rootDir>/src/store/$1",
    "^assets(.*)$": "<rootDir>/assets/$1",
    "^HOCs(.*)$": "<rootDir>/src/HOCs/$1",
  },
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "setupFiles": [
    "./tests/setupTests.js"
  ]
};
