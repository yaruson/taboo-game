/* global io */

;(function () {
  require('./styles.scss')

  const socket = io()
  const el = {}

  function createTag (label) {
    const tag = document
      .createElement('span')

    tag.classList.add('tag', 'is-warning')
    tag.appendChild(document.createTextNode(label))

    return tag
  }

  function updateCard (card) {
    el.word = el.word || document.getElementById('word')
    el.taboo = el.taboo || document.getElementById('taboo')

    el.word.innerText = card.w

    let tag
    do {
      tag = el.taboo.firstElementChild
      if (tag) { tag.remove() }
    } while (tag)

    card.t
      .sort(() => 0.5 - Math.random())
      .forEach(taboo => el.taboo.appendChild(createTag(taboo)))
  }

  function requestNextCard () {
    socket.emit('get_next_card')
  }

  socket.on('update_card', updateCard)

  document.getElementById('next')
    .addEventListener('click', requestNextCard)

  requestNextCard()
})()
