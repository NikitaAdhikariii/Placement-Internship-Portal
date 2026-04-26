class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.root;

    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    const results = [];

    function dfs(curr, path) {
      if (results.length >= 10) return;

      if (curr.isEnd) {
        results.push(path);
      }

      for (let key in curr.children) {
        dfs(curr.children[key], path + key);
      }
    }

    dfs(node, prefix);

    return results;
  }
}

module.exports = Trie;