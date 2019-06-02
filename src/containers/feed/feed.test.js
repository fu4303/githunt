// import React from 'react';
// import ReactDOM from 'react-dom';
import * as feed from './index.js';

test('pathJoin', () => {
  expect(feed.pathJoin('/', '/a')).toBe('/a');
  expect(feed.pathJoin('a', 'b')).toBe('a/b');
  expect(feed.pathJoin('/a', 'b')).toBe('/a/b');
  expect(feed.pathJoin('a', 'b', 'c')).toBe('a/b/c');
  expect(feed.pathJoin('/a', 'b/', 'c/')).toBe('/a/b/c/');
})
